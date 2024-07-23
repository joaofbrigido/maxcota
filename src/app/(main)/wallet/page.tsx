import { BgWhite } from "@/components/custom/BgWhite";
import { ChartCard } from "@/components/custom/wallet/ChartCard";
import { NumberCard } from "@/components/custom/wallet/NumberCard";
import { columns } from "@/components/custom/wallet/tableWallet/columns";
import { TableWallet } from "@/components/custom/wallet/tableWallet/data";
import { TickerWallet } from "@/types/types";
import { DollarSign, ShieldPlus, WalletMinimal } from "lucide-react";

export default function WalletPage() {
  const walletTickers: TickerWallet[] = [
    {
      ticker: "bbas3",
      totalReais: 275,
      totalPercentage: 0.5,
    },
    {
      ticker: "bbes3",
      totalReais: 200,
      totalPercentage: 0.4,
    },
    {
      ticker: "trpl4",
      totalReais: 187,
      totalPercentage: 0.3,
    },
    {
      ticker: "sapr4",
      totalReais: 173,
      totalPercentage: 0.2,
    },
    {
      ticker: "itsa4",
      totalReais: 70,
      totalPercentage: 0.1,
    },
    {
      ticker: "mxrf11",
      totalReais: 123,
      totalPercentage: 0.1,
    },
    {
      ticker: "xpml11",
      totalReais: 321,
      totalPercentage: 0.2,
    },
  ];

  return (
    <main className="grid grid-cols-[0.45fr_1fr] gap-5 max-[1200px]:grid-cols-1">
      <div className="space-y-5">
        <NumberCard
          title="Total em Reais"
          value="R$ 67.945,32"
          icon={<DollarSign size={20} className="text-amber-400" />}
        />
        <ChartCard
          title="Divisão por Ativo"
          whichChart="ativo"
          ativosData={[
            { ticker: "bbas3", total: 275 },
            { ticker: "bbes3", total: 200 },
            { ticker: "trpl4", total: 187 },
            { ticker: "sapr4", total: 173 },
            { ticker: "itsa4", total: 70 },
            { ticker: "mxrf11", total: 123 },
            { ticker: "xpml11", total: 321 },
          ]}
        />
      </div>
      <BgWhite>
        <TableWallet columns={columns} data={walletTickers} />
      </BgWhite>

      <div className="space-y-5">
        <NumberCard
          title="Total de Ativos"
          value="10"
          icon={<WalletMinimal size={20} className="text-amber-400" />}
        />
        <NumberCard
          title="Ativos com Margin Seg"
          value="7"
          icon={<ShieldPlus size={20} className="text-amber-400" />}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <ChartCard title="Divisão por Setor" whichChart="setor" />
        <ChartCard
          title="Ação x FIIs"
          whichChart="acaoFiis"
          percentageAcao={63}
          percentageFiis={37}
        />
      </div>
    </main>
  );
}
