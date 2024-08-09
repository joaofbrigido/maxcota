"use client";

import { FormEvent, useEffect, useState } from "react";
import { CustomInput } from "./CustomInput";
import { CustomSelect } from "./CustomSelect";
import { CustomSwitch } from "./CustomSwitch";
import { useForm } from "@/hooks/useForm";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { CustomButton } from "./CustomButton";
import { create, update } from "@/actions/ticker";
import { toast } from "sonner";
import { Ticker } from "@/types/types";

type TickerFormProps = {
  tickerEdit?: Ticker;
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TickerForm = ({ tickerEdit, setOpenDialog }: TickerFormProps) => {
  const [dpaAuto, setDpaAuto] = useState(false);
  const [includeWallet, setIncludeWallet] = useState(false);
  const [ticker, setTicker] = useState("");
  const dividendYield = useForm();
  const dpa = useForm("notRequired");
  const stocksQuantity = useForm("notRequired");
  const [loading, setLoading] = useState(false);

  function clearInputs() {
    setTicker("");
    dividendYield.setValue("");
    dpa.setValue("");
    stocksQuantity.setValue("");
    setDpaAuto(false);
    setIncludeWallet(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (
      Number(dpa.value) < 0 ||
      Number(stocksQuantity.value) < 0 ||
      Number(dividendYield.value) < 0
    ) {
      toast.warning(
        "Quantidade de ações ou DPA ou dividend yield não podem ser negativos"
      );
      setLoading(false);
      return;
    }

    if (tickerEdit) {
      const response = await update({
        ticker,
        dividendYield: Number(dividendYield.value),
        dpa: Number(dpa.value),
        stocksQuantity: Number(stocksQuantity.value),
      });

      if (!response?.ok) {
        toast.error(response?.error);
        setLoading(false);
        return;
      }
    } else {
      const response = await create({
        ticker,
        dividendYield: Number(dividendYield.value),
        dpa: Number(dpa.value),
        stocksQuantity: Number(stocksQuantity.value),
      });

      if (!response?.ok) {
        toast.error(response?.error);
        setLoading(false);
        return;
      }
    }

    toast.success("Ativo salvo com sucesso!");
    clearInputs();
    if (setOpenDialog) setOpenDialog(false);
    setLoading(false);
  }

  function handleChangeDpaAuto() {
    setDpaAuto(!dpaAuto);
    dpa.setValue("");
  }

  function handleChangeIncludeWallet() {
    setIncludeWallet(!includeWallet);
    stocksQuantity.setValue("");
  }

  function handleEditTicker() {
    if (tickerEdit) {
      setTicker(tickerEdit.ticker);
      dividendYield.setValue(tickerEdit.expected_dividend_yield.toString());
      setDpaAuto(tickerEdit.dpa_year === 0);
      stocksQuantity.setValue(tickerEdit.stocks_quantity.toString());
      setIncludeWallet(tickerEdit.stocks_quantity > 0);
      if (tickerEdit.dpa_year === 0) {
        dpa.setValue("");
      } else {
        dpa.setValue(tickerEdit.dpa_year.toString());
      }
    }
  }

  useEffect(() => {
    handleEditTicker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className="grid grid-cols-2 gap-5 py-2 max-sm:grid-cols-1"
      onSubmit={handleSubmit}
    >
      <CustomSelect
        label="Ativo"
        name="ticker"
        placeholder="Selecione um ativo..."
        value={ticker}
        setValue={setTicker}
      />
      <CustomInput
        label="Dividend yield esperado (%)"
        placeholder="DY esperado (%)"
        name="dividendYield"
        defaultValue="6"
        type="number"
        required
        {...dividendYield}
      />
      <div>
        <CustomSwitch
          label="DPA/ano automático"
          name="dpaAuto"
          description="Automático é a média DPA dos último 5 anos"
          checked={dpaAuto}
          onCheckedChange={handleChangeDpaAuto}
        />
        <CustomInput
          label=""
          placeholder="Insira DPA"
          name="dpaManual"
          type="number"
          disabled={dpaAuto}
          className={dpaAuto ? "bg-stone-300" : ""}
          {...dpa}
        />
      </div>
      <div>
        <CustomSwitch
          label="Incluir na carteira"
          name="includeInWallet"
          description="Ativos da carteira são usados para métricas"
          checked={includeWallet}
          onCheckedChange={handleChangeIncludeWallet}
        />
        <CustomInput
          label=""
          placeholder="Quantidade de cotas"
          name="quantityOfStock"
          type="number"
          disabled={!includeWallet}
          className={!includeWallet ? "bg-stone-300" : ""}
          {...stocksQuantity}
        />
      </div>

      <DialogFooter className="max-sm:grid max-sm:gap-3 col-span-full">
        <DialogClose className="px-4 py-2 bg-gray-200 font-bold text-sm rounded hover:bg-gray-300 transition">
          Cancelar
        </DialogClose>
        <CustomButton variant="success" isLoading={loading}>
          Salvar
        </CustomButton>
      </DialogFooter>
    </form>
  );
};
