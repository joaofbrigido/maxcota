"use client";

import { FileMinus2 } from "lucide-react";
import { BgWhite } from "../BgWhite";
import { DialogTicker } from "../DialogTicker";
import { columns } from "./tableCeilingPrice/columns";
import { Ticker, TickerTable } from "@/types/types";
import { TableCeilingPrice } from "./tableCeilingPrice/data";
import { useEffect, useState } from "react";

type TabCeilingPriceProps = {
  tickers: Ticker[];
};

export const TabCeilingPrice = ({ tickers }: TabCeilingPriceProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [stocksTable, setStocksTable] = useState<TickerTable[]>([]);
  const [tickerEdit, setTickerEdit] = useState<Ticker | null>(null);

  function editTicker(tickerTable: TickerTable) {
    setTickerEdit({
      id: Number(tickerTable.id),
      ticker: tickerTable.ticker,
      stocks_quantity: tickerTable.amount,
      dpa_year: tickerTable.dpa,
      expected_dividend_yield: tickerTable.expectedYield,
      user_id: "",
    });
    setOpenDialog(true);
  }

  function deleteTecker(tickerId: string) {
    console.log(tickerId);
  }

  function getStocksTable(tickers: Ticker[]) {
    const stocksTable: TickerTable[] = tickers.map((ticker) => {
      return {
        id: ticker.id.toString(),
        ticker: ticker.ticker,
        amount: ticker.stocks_quantity,
        dpa: ticker.dpa_year,
        currentYield: 7,
        expectedYield: ticker.expected_dividend_yield,
        currentPrice: 14,
        ceilingPrice: 20,
        safetyMargin: 16.7,
      };
    });
    return stocksTable;
  }

  useEffect(() => {
    setStocksTable(getStocksTable(tickers));
  }, [tickers]);

  return (
    <BgWhite fullHeight>
      {tickers.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 h-full">
          <FileMinus2 size={64} className="text-stone-500" />
          <p className="max-w-[570px] text-center text-stone-500 text-xl">
            Nenhum ativo cadastrado, adicione pelo menos um ativo para controlar
            o preço teto
          </p>
          <DialogTicker openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </div>
      ) : (
        <div>
          <TableCeilingPrice
            columns={columns}
            data={stocksTable}
            onEdit={editTicker}
            onDelete={deleteTecker}
          />
          <DialogTicker
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            needDialogTrigger={false}
            ticker={tickerEdit!}
          />
        </div>
      )}
    </BgWhite>
  );
};
