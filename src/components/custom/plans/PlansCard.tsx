"use client";

import { CustomButton } from "../CustomButton";
import { useState } from "react";
import { toast } from "sonner";
import { Profile } from "@/types/types";
import { createCheckoutSession } from "@/actions/stripe-checkout";

type PlansCardProps = {
  name: string;
  price: string;
  popular?: boolean;
  children?: React.ReactNode;
  plan: "standard" | "pro";
  profile?: Profile;
};

export const PlansCard = ({
  name,
  price,
  popular,
  children,
  plan,
  profile,
}: PlansCardProps) => {
  const [loading, setLoading] = useState(false);

  async function handleChangePlan() {
    setLoading(true);
    const response = await createCheckoutSession(plan);
    if (!response.ok) {
      toast.error(response.error);
      setLoading(false);
      return;
    }

    const url = await response.data;
    if (url) window.location.href = url;
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
              R$79,00
            </span>
          )}
          <h3 className="text-3xl font-bold">R${price}</h3>
        </div>
        <ul className="flex flex-col gap-3 mt-5">{children}</ul>
      </div>
      <CustomButton
        variant={popular ? "default" : "outline"}
        className="w-full"
        isLoading={loading}
        onclick={handleChangePlan}
        disabled={!popular && profile?.plan_id === 1}
      >
        Selecionar
      </CustomButton>
      <span className="text-stone-950/70 text-sm text-center -mt-3">
        Pague uma vez. Use para sempre!
      </span>
    </div>
  );
};
