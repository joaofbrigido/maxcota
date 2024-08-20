"use client";

import { AllStocksTable } from "@/types/types";
import { BgWhite } from "../BgWhite";
import { columns } from "./tableAllStocks/columns";
import { TableAllStocks } from "./tableAllStocks/data";
import { getAllStocks } from "@/actions/brapi";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export const TabAllStocks = () => {
  const [allStocks, setAllStocks] = useState([] as AllStocksTable[]);
  const [loading, setLoading] = useState(false);

  async function getAllStocksTable() {
    setLoading(true);
    const responseAllStocks = await getAllStocks();

    if (responseAllStocks?.error) {
      toast.error("Erro ao carregar os ativos, tente novamente mais tarde", {
        description: responseAllStocks.error,
      });
      setLoading(false);
      return;
    }

    const allStocksTable = responseAllStocks?.data || [];

    setAllStocks(allStocksTable);
    setLoading(false);
  }

  useEffect(() => {
    getAllStocksTable();
  }, []);

  return (
    <BgWhite fullHeight>
      {loading ? (
        <Loader className="m-auto h-8 w-8 animate-spin text-amber-500" />
      ) : (
        <TableAllStocks columns={columns} data={allStocks} />
      )}
    </BgWhite>
  );
};
