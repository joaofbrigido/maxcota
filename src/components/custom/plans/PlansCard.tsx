"use client";

import { CustomButton } from "../CustomButton";
import { useState } from "react";
import { toast } from "sonner";

type PlansCardProps = {
  name: string;
  price: string;
  popular?: boolean;
  children?: React.ReactNode;
  plan: "monthly" | "vitality";
};

export const PlansCard = ({
  name,
  price,
  popular,
  children,
  plan,
}: PlansCardProps) => {
  const [loading, setLoading] = useState(false);

  async function handleChangePlan() {
    setLoading(true);
    // const response = await chooseFirstPlan(plan);

    // if (response?.error) {
    //   toast.error("Erro ao selecionar um plano, tente novamente mais tarde.", {
    //     description: response.error,
    //   });
    // }

    setLoading(false);
  }

  return (
    <div
      className={`p-5 bg-stone-100 rounded-lg border flex flex-col justify-between gap-5 ${
        popular ? "border-amber-500" : "border-stone-300"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl">{name}</h2>
          {popular && (
            <span className="text-amber-50 primary-color-x px-2 py-1 rounded-lg font-medium">
              Popular
            </span>
          )}
        </div>
        <div className="flex items-end gap-1">
          {popular && (
            <span className="text-stone-400 line-through font-medium mr-1 block">
              R$89,00
            </span>
          )}
          <h3 className="text-3xl font-bold">
            R${price}
            {!popular && <span className=" text-base">/mês</span>}
          </h3>
        </div>
        <ul className="flex flex-col gap-3 mt-5">{children}</ul>
      </div>
      <CustomButton
        variant={popular ? "default" : "outline"}
        className="w-full"
        isLoading={loading}
        onclick={handleChangePlan}
        disabled={false /* Desativar para plano free */}
      >
        Selecionar
      </CustomButton>
      <span className="text-stone-950/70 text-sm text-center -mt-3">
        {popular ? "Pague uma vez. Use para sempre!" : "Cobrado mensalmente"}
      </span>
    </div>
  );
};
