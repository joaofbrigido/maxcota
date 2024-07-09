"use client";

import { useState } from "react";
import { CustomInput } from "./CustomInput";
import { CustomSelect } from "./CustomSelect";
import { CustomSwitch } from "./CustomSwitch";

export const TickerForm = () => {
  const [dpaAuto, setDpaAuto] = useState(false);
  const [includeWallet, setIncludeWallet] = useState(false);

  return (
    <form className="grid grid-cols-2 gap-5 py-2 max-sm:grid-cols-1">
      <CustomSelect
        label="Ativo"
        name="ticker"
        placeholder="Selecione um ativo..."
      />
      <CustomInput
        label="Dividend yield esperado (%)"
        placeholder="DY esperado (%)"
        name="dividendYield"
        defaultValue="6"
        type="number"
      />
      <div>
        <CustomSwitch
          label="DPA/ano automático"
          name="dpaAuto"
          description="Automático é a média DPA dos último 5 anos"
          checked={dpaAuto}
          onCheckedChange={() => setDpaAuto(!dpaAuto)}
        />
        <CustomInput
          label=""
          placeholder="Insira DPA"
          name="dpaManual"
          type="number"
          disabled={dpaAuto}
          className={dpaAuto ? "bg-stone-300" : ""}
        />
      </div>
      <div>
        <CustomSwitch
          label="Incluir na carteira"
          name="includeInWallet"
          description="Ativos da carteira são usados para métricas"
          checked={includeWallet}
          onCheckedChange={() => setIncludeWallet(!includeWallet)}
        />
        <CustomInput
          label=""
          placeholder="Quantidade de cotas"
          name="quantityOfStock"
          type="number"
          disabled={!includeWallet}
          className={!includeWallet ? "bg-stone-300" : ""}
        />
      </div>
    </form>
  );
};
