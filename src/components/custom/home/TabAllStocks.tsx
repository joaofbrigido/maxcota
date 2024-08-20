import { AllStocksTable } from "@/types/types";
import { BgWhite } from "../BgWhite";
import { columns } from "./tableAllStocks/columns";
import { TableAllStocks } from "./tableAllStocks/data";

export const TabAllStocks = ({
  allStocks,
}: {
  allStocks: AllStocksTable[];
}) => {
  return (
    <BgWhite fullHeight>
      <TableAllStocks columns={columns} data={allStocks} />
    </BgWhite>
  );
};
