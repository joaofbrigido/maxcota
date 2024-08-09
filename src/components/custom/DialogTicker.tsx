"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { TickerForm } from "./TickerForm";
import { Button } from "../ui/button";
import { Ticker } from "@/types/types";

type DialogTickerProps = {
  className?: string;
  onlyIcon?: boolean;
  openDialog?: boolean;
  needDialogTrigger?: boolean;
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  ticker?: Ticker;
};

export const DialogTicker = ({
  className,
  onlyIcon = false,
  openDialog,
  setOpenDialog,
  needDialogTrigger = true,
  ticker,
}: DialogTickerProps) => {
  return (
    <div className={className}>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {needDialogTrigger && (
          <DialogTrigger asChild>
            <Button>
              <Plus size={20} className="mr-1" />
              {!onlyIcon && "Adicionar Ativo"}
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="min-w-[780px] max-lg:min-w-[90%] max-lg:max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Cadastrar Ativo</DialogTitle>
          </DialogHeader>
          <TickerForm tickerEdit={ticker} setOpenDialog={setOpenDialog!} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
