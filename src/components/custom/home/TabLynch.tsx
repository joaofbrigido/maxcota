import { Ranking } from "@/types/types";
import { BgWhite } from "../BgWhite";
import { columnsLynch } from "./tableRanking/columns";
import { TableRanking } from "./tableRanking/data";

export const TabLynch = () => {
  const tickersLynch: Ranking[] = [
    {
      id: "1",
      rank: 1,
      ticker: "ORCL",
      currentPrice: 85.0,
      fairValue: 102.0,
      dividendYield: 1.6,
      pvp: 15.0,
      safetyMargin: 16.7,
      pegratio: 1.2,
    },
    {
      id: "2",
      rank: 2,
      ticker: "IBM",
      currentPrice: 130.0,
      fairValue: 150.0,
      dividendYield: 4.0,
      pvp: 12.5,
      safetyMargin: 15.4,
      pegratio: 1.8,
    },
    {
      id: "3",
      rank: 3,
      ticker: "ADBE",
      currentPrice: 550.0,
      fairValue: 660.0,
      dividendYield: 0.0,
      pvp: 12.0,
      safetyMargin: 20.0,
      pegratio: 2.0,
    },
    {
      id: "4",
      rank: 4,
      ticker: "SAP",
      currentPrice: 145.0,
      fairValue: 175.0,
      dividendYield: 1.5,
      pvp: 13.0,
      safetyMargin: 17.2,
      pegratio: 1.6,
    },
    {
      id: "5",
      rank: 5,
      ticker: "CRM",
      currentPrice: 240.0,
      fairValue: 288.0,
      dividendYield: 0.0,
      pvp: 15.0,
      safetyMargin: 20.0,
      pegratio: 2.5,
    },
    {
      id: "6",
      rank: 6,
      ticker: "CSX",
      currentPrice: 75.0,
      fairValue: 90.0,
      dividendYield: 1.2,
      pvp: 14.0,
      safetyMargin: 20.0,
      pegratio: 1.4,
    },
    {
      id: "7",
      rank: 7,
      ticker: "UNP",
      currentPrice: 200.0,
      fairValue: 240.0,
      dividendYield: 2.1,
      pvp: 18.0,
      safetyMargin: 20.0,
      pegratio: 1.7,
    },
  ];

  return (
    <BgWhite fullHeight>
      <TableRanking columns={columnsLynch} data={tickersLynch} />
    </BgWhite>
  );
};
