import { getInfoMyTickers } from "@/actions/brapi";
import { getAll } from "@/actions/ticker";
import { BgWhite } from "@/components/custom/BgWhite";
import { DialogTicker } from "@/components/custom/DialogTicker";
import { ChartCard } from "@/components/custom/wallet/ChartCard";
import { NumberCard } from "@/components/custom/wallet/NumberCard";
import { columns } from "@/components/custom/wallet/tableWallet/columns";
import { TableWallet } from "@/components/custom/wallet/tableWallet/data";
import { TickerWallet } from "@/types/types";
import {
  currencyToNumber,
  numberToCurrency,
  numberToString,
} from "@/utils/numberConverter";
import {
  DollarSign,
  FileMinus2,
  ShieldPlus,
  WalletMinimal,
} from "lucide-react";

type walletTicker = {
  ticker: string;
  totalReais: number;
  // totalPercentage: number;
  type: string;
  sector: string;
};

export default async function WalletPage() {
  const responseMyTickers = await getAll();
  const myTickers = responseMyTickers?.data || [];
  const responseMyTickersWithValues = await getInfoMyTickers(myTickers);
  const myTickersWithValues = responseMyTickersWithValues?.data || [];

  function getWalletTickers(): walletTicker[] {
    const walletTickers = myTickersWithValues.map((ticker) => {
      const matchingItem = myTickers.find(
        (item) => item.ticker === ticker.stock
      );
      return {
        ticker: ticker.stock,
        totalReais: ticker.close * matchingItem!.stocks_quantity,
        type: ticker.type,
        sector: ticker.sector,
      };
    });

    return walletTickers.sort((a, b) => b.totalReais - a.totalReais);
  }

  function getTotalInReais() {
    const walletTickers = getWalletTickers();
    const total = walletTickers.reduce((total, ticker) => {
      return (total += ticker.totalReais);
    }, 0);
    return numberToCurrency(total);
  }

  function getDivisionByStocks() {
    const walletTickers = getWalletTickers();

    return walletTickers.map((ticker) => {
      return {
        ticker: ticker.ticker,
        total: ticker.totalReais,
      };
    });
  }

  function getTotalStocksSafetyMargin() {
    return myTickers
      .reduce((total, ticker) => {
        const matchingItem = myTickersWithValues.find(
          (data) => data.stock === ticker.ticker
        );
        const ceilingPrice =
          ticker.dpa_year / (ticker.expected_dividend_yield / 100);
        const currentPrice = matchingItem?.close ?? 0;
        const safetyMargin =
          ((ceilingPrice - currentPrice!) / ceilingPrice) * 100;

        let safetyMarginQuantity = 0;
        if (safetyMargin > 0) safetyMarginQuantity++;

        return total + safetyMarginQuantity;
      }, 0)
      .toString();
  }

  function getTickersTable(): TickerWallet[] {
    const walletTickers = getWalletTickers();
    return walletTickers.map((ticker) => {
      const totalPercentage =
        (ticker.totalReais / currencyToNumber(getTotalInReais())) * 100;
      return {
        ticker: ticker.ticker,
        totalReais: numberToCurrency(ticker.totalReais),
        totalPercentage: `${numberToString(+totalPercentage.toFixed(2))}%`,
      };
    });
  }

  function getDivisionBySector() {
    // [setor: string; percentage: number;]
    const walletTickers = getWalletTickers();
  }

  return (
    <>
      {getTickersTable().length <= 0 ? (
        <BgWhite fullHeight>
          <div className="flex flex-col items-center justify-center gap-5 h-full">
            <FileMinus2 size={64} className="text-stone-500" />
            <p className="max-w-[570px] text-center text-stone-500 text-xl">
              Nenhum ativo cadastrado incluido na carteira, adicione pelo menos
              um ativo para controlar a carteira
            </p>
            <DialogTicker />
          </div>
        </BgWhite>
      ) : (
        <main className="grid grid-cols-[0.45fr_1fr] gap-5 max-[1200px]:grid-cols-1">
          <div className="space-y-5">
            <NumberCard
              title="Total em Reais"
              value={getTotalInReais()}
              icon={<DollarSign size={20} className="text-amber-400" />}
            />
            <ChartCard
              title="Divisão por Ativo"
              whichChart="ativo"
              ativosData={getDivisionByStocks()}
            />
          </div>
          <BgWhite>
            <TableWallet
              columns={columns}
              data={getTickersTable()}
              total={getTotalInReais()}
            />
          </BgWhite>

          <div className="space-y-5">
            <NumberCard
              title="Total de Ativos"
              value={myTickers.length.toString()}
              icon={<WalletMinimal size={20} className="text-amber-400" />}
            />
            <NumberCard
              title="Ativos com Margin Seg"
              value={getTotalStocksSafetyMargin()}
              icon={<ShieldPlus size={20} className="text-amber-400" />}
            />
          </div>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <ChartCard
              title="Divisão por Setor"
              whichChart="setor"
              sectorData={[]}
            />
            <ChartCard
              title="Ação x FIIs"
              whichChart="acaoFiis"
              percentageAcao={63}
              percentageFiis={37}
            />
          </div>

          <DialogTicker onlyIcon className="fixed right-4 bottom-4" />
        </main>
      )}
    </>
  );
}
