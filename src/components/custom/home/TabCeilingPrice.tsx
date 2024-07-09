"use client";

import { FileMinus2 } from "lucide-react";
import { BgWhite } from "../BgWhite";
import { DialogTicker } from "../DialogTicker";
import { columns } from "./tableCeilingPrice/columns";
import { Ticker } from "@/types/types";
import { TableCeilingPrice } from "./tableCeilingPrice/data";

export const TabCeilingPrice = () => {
  const stocks: Ticker[] = [
    {
      id: "1",
      ticker: "AAPL",
      amount: 100,
      dpa: 3.2,
      currentYield: 1.5,
      expectedYield: 2.0,
      currentPrice: 150.5,
      ceilingPrice: 180.0,
      safetyMargin: 15.0,
    },
    {
      id: "2",
      ticker: "MSFT",
      amount: 50,
      dpa: 4.0,
      currentYield: 1.2,
      expectedYield: 1.8,
      currentPrice: 250.0,
      ceilingPrice: 290.0,
      safetyMargin: 14.0,
    },
    {
      id: "3",
      ticker: "GOOGL",
      amount: 30,
      dpa: 2.5,
      currentYield: 1.1,
      expectedYield: 1.6,
      currentPrice: 2800.0,
      ceilingPrice: 3200.0,
      safetyMargin: 12.5,
    },
    {
      id: "4",
      ticker: "AMZN",
      amount: 20,
      dpa: 1.5,
      currentYield: 0.9,
      expectedYield: 1.4,
      currentPrice: 3500.0,
      ceilingPrice: 4000.0,
      safetyMargin: 10.0,
    },
    {
      id: "5",
      ticker: "TSLA",
      amount: 40,
      dpa: 5.0,
      currentYield: 1.3,
      expectedYield: 1.9,
      currentPrice: 700.0,
      ceilingPrice: 800.0,
      safetyMargin: 14.3,
    },
    {
      id: "6",
      ticker: "NFLX",
      amount: 25,
      dpa: 2.0,
      currentYield: 1.4,
      expectedYield: 1.7,
      currentPrice: 500.0,
      ceilingPrice: 600.0,
      safetyMargin: 16.7,
    },
    {
      id: "7",
      ticker: "FB",
      amount: 35,
      dpa: 3.5,
      currentYield: 1.6,
      expectedYield: 2.1,
      currentPrice: 350.0,
      ceilingPrice: 420.0,
      safetyMargin: 16.7,
    },
    {
      id: "8",
      ticker: "NVDA",
      amount: 60,
      dpa: 4.5,
      currentYield: 1.2,
      expectedYield: 1.5,
      currentPrice: 200.0,
      ceilingPrice: 240.0,
      safetyMargin: 20.0,
    },
    {
      id: "9",
      ticker: "INTC",
      amount: 45,
      dpa: 1.8,
      currentYield: 1.0,
      expectedYield: 1.3,
      currentPrice: 60.0,
      ceilingPrice: 72.0,
      safetyMargin: 16.7,
    },
    {
      id: "10",
      ticker: "AMD",
      amount: 55,
      dpa: 3.0,
      currentYield: 1.4,
      expectedYield: 1.8,
      currentPrice: 90.0,
      ceilingPrice: 108.0,
      safetyMargin: 16.7,
    },
    {
      id: "11",
      ticker: "BABA",
      amount: 70,
      dpa: 2.2,
      currentYield: 1.5,
      expectedYield: 1.9,
      currentPrice: 220.0,
      ceilingPrice: 264.0,
      safetyMargin: 20.0,
    },
    {
      id: "12",
      ticker: "V",
      amount: 65,
      dpa: 3.8,
      currentYield: 1.6,
      expectedYield: 2.0,
      currentPrice: 230.0,
      ceilingPrice: 276.0,
      safetyMargin: 20.0,
    },
    {
      id: "13",
      ticker: "MA",
      amount: 75,
      dpa: 4.1,
      currentYield: 1.7,
      expectedYield: 2.2,
      currentPrice: 350.0,
      ceilingPrice: 420.0,
      safetyMargin: 16.7,
    },
    {
      id: "14",
      ticker: "JPM",
      amount: 80,
      dpa: 3.3,
      currentYield: 1.5,
      expectedYield: 1.9,
      currentPrice: 160.0,
      ceilingPrice: 192.0,
      safetyMargin: 20.0,
    },
    {
      id: "15",
      ticker: "WMT",
      amount: 85,
      dpa: 2.7,
      currentYield: 1.3,
      expectedYield: 1.6,
      currentPrice: 140.0,
      ceilingPrice: 168.0,
      safetyMargin: 20.0,
    },
  ];

  function editTicker(ticker: Ticker) {
    console.log(ticker);
  }

  function deleteTecker(tickerId: string) {
    console.log(tickerId);
  }

  return (
    <BgWhite fullHeight>
      {!true ? (
        <div className="flex flex-col items-center justify-center gap-5 h-full">
          <FileMinus2 size={64} className="text-stone-500" />
          <p className="max-w-[570px] text-center text-stone-500 text-xl">
            Nenhum ativo cadastrado, adicione pelo menos um ativo para controlar
            o preço teto
          </p>
          <DialogTicker />
        </div>
      ) : (
        <div>
          <TableCeilingPrice
            columns={columns}
            data={stocks}
            onEdit={editTicker}
            onDelete={deleteTecker}
          />
        </div>
      )}
    </BgWhite>
  );
};
