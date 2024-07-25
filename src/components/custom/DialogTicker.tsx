import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CustomButton } from "./CustomButton";
import { Plus } from "lucide-react";
import { TickerForm } from "./TickerForm";

export const DialogTicker = ({
  className,
  onlyIcon = false,
}: {
  className?: string;
  onlyIcon?: boolean;
}) => {
  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <CustomButton className="max-[512px]:w-full">
            <Plus size={20} className="mr-1" />
            {!onlyIcon && "Adicionar Ativo"}
          </CustomButton>
        </DialogTrigger>
        <DialogContent className="min-w-[780px] max-lg:min-w-[90%] max-lg:max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Cadastrar Ativo</DialogTitle>
          </DialogHeader>
          <TickerForm />
          <DialogFooter className="max-sm:grid max-sm:gap-3">
            <CustomButton variant="secondary">Cancelar</CustomButton>
            <CustomButton variant="success">Salvar</CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
