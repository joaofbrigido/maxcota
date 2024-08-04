"use client";

import { useForm } from "@/hooks/useForm";
import { CustomInput } from "../CustomInput";
import { CustomButton } from "../CustomButton";
import { useState } from "react";
import { toast } from "sonner";
import { acceptTerms } from "@/actions/login";

export const AcceptTermsForm = () => {
  const fullName = useForm();
  const [ckAcceptTerms, setCkAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (!fullName.validate() || !ckAcceptTerms) {
      toast.warning("Preencha todos os campos corretamente");
      setLoading(false);
      return;
    }

    const response = await acceptTerms({
      acceptTerms: ckAcceptTerms,
      fullName: fullName.value,
    });

    if (response?.error) {
      toast.error("Erro ao criar conta", {
        description: response.error,
      });
    }

    if (response?.ok) {
      window.location.href = "/plans";
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        label="Nome Completo"
        name="fullName"
        placeholder="Seu nome"
        required
        {...fullName}
      />

      <div className="mt-5 flex items-center gap-2">
        <input
          type="checkbox"
          name="acceptTerms"
          id="acceptTerms"
          className="cursor-pointer"
          onChange={(e) => setCkAcceptTerms(e.target.checked)}
          checked={ckAcceptTerms}
          required
        />
        <label htmlFor="acceptTerms" className="cursor-pointer font-medium">
          Aceitar os termos de uso
        </label>
      </div>

      <CustomButton className="w-full mt-8" isLoading={loading}>
        Continuar
      </CustomButton>
    </form>
  );
};
