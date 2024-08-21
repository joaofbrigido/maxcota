"use client";

import { FileMinus2, Loader } from "lucide-react";
import { BgWhite } from "../BgWhite";
import { DialogTicker } from "../DialogTicker";
import { columns } from "./tableCeilingPrice/columns";
import { BrapiStock, Ticker, TickerTable } from "@/types/types";
import { TableCeilingPrice } from "./tableCeilingPrice/data";
import { useCallback, useEffect, useState } from "react";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";
import { toast } from "sonner";
import { deleteItem } from "@/actions/ticker";
import {
  numberToCurrency,
  numberToString,
  percentToNumber,
  stringToNumber,
} from "@/utils/numberConverter";
import { getInfoMyTickers } from "@/actions/brapi";

type TabCeilingPriceProps = {
  tickers: Ticker[];
};

export const TabCeilingPrice = ({ tickers }: TabCeilingPriceProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [stocksTable, setStocksTable] = useState<TickerTable[]>([]);
  const [tickerEdit, setTickerEdit] = useState<Ticker | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loadingDataTable, setLoadingDataTable] = useState(false);

  function editTicker(tickerTable: TickerTable) {
    setTickerEdit({
      id: Number(tickerTable.id),
      ticker: tickerTable.ticker,
      stocks_quantity: tickerTable.amount,
      dpa_year: stringToNumber(tickerTable.dpa),
      expected_dividend_yield: percentToNumber(tickerTable.expectedYield),
      user_id: "",
    });
    setOpenDialog(true);
  }

  function handleOpenDeleteDialog(tickerId: string) {
    setOpenDeleteDialog(true);
    setDeleteId(Number(tickerId));
  }

  async function deleteTicker() {
    if (deleteId) {
      setDeleteLoading(true);
      const response = await deleteItem(deleteId);

      if (!response?.ok) {
        toast.error("Erro ao deletar ativo", {
          description: response?.error,
        });
        setDeleteLoading(false);
        return;
      }

      toast.success("Ativo deletado com sucesso");
      setDeleteLoading(false);
      setOpenDeleteDialog(false);
    } else {
      toast.warning("ID do ativo não encontrado, tente novamente mais tarde.");
    }
  }

  const getInfoByMyTickers = useCallback(async () => {
    const response = await getInfoMyTickers(tickers);

    if (!response?.ok) {
      toast.error(response?.error);
      return;
    }

    return response.data as BrapiStock[];
  }, [tickers]);

  const getDataTable = useCallback(async () => {
    setLoadingDataTable(true);
    const apiMyTickersData = await getInfoByMyTickers();

    if (!apiMyTickersData) {
      toast.error("Erro ao carregar dados dos ativos");
      setLoadingDataTable(false);
      return [];
    }

    const tableData: TickerTable[] = tickers.map((ticker) => {
      const dataTicker = apiMyTickersData.find(
        (item) => item.stock === ticker.ticker
      );
      const ceilingPrice =
        ticker.dpa_year / (ticker.expected_dividend_yield / 100);
      const currentPrice = dataTicker?.close ?? 0;
      const safetyMargin =
        ((ceilingPrice - currentPrice!) / ceilingPrice) * 100;

      return {
        id: ticker.id.toString(),
        ticker: ticker.ticker,
        amount: ticker.stocks_quantity,
        dpa: numberToString(ticker.dpa_year),
        logo: dataTicker?.logo ?? "",
        expectedYield: `${numberToString(ticker.expected_dividend_yield)}%`,
        currentPrice: numberToCurrency(currentPrice),
        ceilingPrice: numberToCurrency(ceilingPrice),
        safetyMargin: safetyMargin.toFixed(2),
        // currentYield: "7%",
      };
    });

    setStocksTable(tableData);
    setLoadingDataTable(false);
  }, [tickers, getInfoByMyTickers]);

  useEffect(() => {
    getDataTable();
  }, [getDataTable]);

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
      ) : loadingDataTable ? (
        <div>
          <Loader className="m-auto h-8 w-8 animate-spin text-amber-500" />
        </div>
      ) : (
        <div>
          <TableCeilingPrice
            columns={columns}
            data={stocksTable}
            onEdit={editTicker}
            onDelete={handleOpenDeleteDialog}
          />
          <DialogTicker
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            needDialogTrigger={false}
            ticker={tickerEdit!}
          />
          <DeleteConfirmDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            deleteLoading={deleteLoading}
            functionDelete={deleteTicker}
          />
        </div>
      )}
    </BgWhite>
  );
};
