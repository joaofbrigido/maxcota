"use client";

import { Button } from "@/components/ui/button";
import { AllStocksTable } from "@/types/types";
import { numberToCurrency } from "@/utils/numberConverter";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

function translateSector(sector: string) {
  switch (sector) {
    case "Retail Trade":
      return "Comércio Varejista";
    case "Energy Minerals":
      return "Minerais Energéticos";
    case "Health Services":
      return "Serviços de Saúde";
    case "Utilities":
      return "Utilidades";
    case "Finance":
      return "Finanças";
    case "Consumer Services":
      return "Serviços ao Consumidor";
    case "Consumer Non-Durables":
      return "Bens de Consumo Não Duráveis";
    case "Non-Energy Minerals":
      return "Minerais não Energéticos";
    case "Commercial Services":
      return "Serviços Comerciais";
    case "Distribution Services":
      return "Serviços de Distribuição";
    case "Transportation":
      return "Transporte";
    case "Technology Services":
      return "Serviços de Tecnologia";
    case "Process Industries":
      return "Indústrias de Processo";
    case "Communications":
      return "Comunicações";
    case "Producer Manufacturing":
      return "Manufatura de Produtores";
    case "Miscellaneous":
      return "Diversos";
    case "Electronic Technology":
      return "Tecnologia Eletrônica";
    case "Industrial Services":
      return "Serviços Industriais";
    case "Health Technology":
      return "Tecnologia de Saúde";
    case "Consumer Durables":
      return "Bens de Consumo Duráveis";
    case null:
      return "Outros";
    default:
      return "-";
  }
}

export const columns: ColumnDef<AllStocksTable>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const ticker = row.original;
      return (
        <div className="size-8 relative">
          {ticker.logo ? (
            <Image
              fill
              src={ticker.logo}
              alt={`${ticker.stock} logo`}
              className="rounded-full object-cover size-8"
              sizes="( max-width: 768px) 40px"
            />
          ) : (
            <Image
              fill
              src={"/logo-precoteto-black.png"}
              alt="Sem logo"
              className="rounded-full object-cover size-8"
              sizes="( max-width: 768px) 40px"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ativo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "close",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor Atual
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticker = row.original;
      return <div>{numberToCurrency(ticker.close)}</div>;
    },
  },
  {
    accessorKey: "change",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Variação diária
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticker = row.original;
      return (
        <div
          className={`${ticker.change < 0 ? "text-red-500" : "text-green-500"}`}
        >
          {ticker.change.toFixed(2)}%
        </div>
      );
    },
  },
  {
    accessorKey: "sector",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Setor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticker = row.original;
      return <div>{translateSector(ticker.sector)}</div>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticker = row.original;
      return (
        <div>
          {ticker.type === "stock"
            ? "Ação"
            : ticker.type === "fund"
            ? "FII"
            : "BDR"}
        </div>
      );
    },
  },
];
