import { AllStocks } from "@/types/types";
import { BgWhite } from "../BgWhite";
import { columns } from "./tableAllStocks/columns";
import { TableAllStocks } from "./tableAllStocks/data";

export const TabAllStocks = () => {
  const allStocks: AllStocks[] = [
    {
      stock: "MTRE3",
      close: 3.98,
      change: -323.9164490861618773,
      logo: "https://brapi.dev/favicon.svg",
      sector: "Finance",
      type: "stock",
    },
    {
      stock: "MTRE2",
      close: 3.98,
      change: 3.9164490861618773,
      logo: "https://brapi.dev/favicon.svg",
      sector: "Finance",
      type: "stock",
    },
    {
      stock: "MTRE1",
      close: 3.98,
      change: 3.9164490861618773,
      logo: "https://brapi.dev/favicon.svg",
      sector: "Finance",
      type: "stock",
    },
    {
      stock: "MTRE5",
      close: 3.98,
      change: 3.9164490861618773,
      logo: "https://brapi.dev/favicon.svg",
      sector: "Finance",
      type: "stock",
    },
    {
      stock: "MTRE213",
      close: 3.98,
      change: 3.9164490861618773,
      logo: "https://brapi.dev/favicon.svg",
      sector: "Finance",
      type: "stock",
    },
  ];

  return (
    <BgWhite fullHeight>
      <TableAllStocks columns={columns} data={allStocks} />
    </BgWhite>
  );
};
