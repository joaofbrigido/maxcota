"use client";

import Link from "next/link";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { useForm } from "@/hooks/useForm";
import { Profile } from "@/types/types";
import { FormEvent, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { updateAuth } from "@/actions/user";

export const MyaccountForm = ({ profile }: { profile: Profile }) => {
  const email = useForm("email");
  const fullName = useForm();
  const password = useForm("password");
  const confirmPassword = useForm("password");
  const plan = useForm("notRequired");
  const [loadingSetValues, setLoadingSetValues] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  function getPlanName() {
    switch (profile.plan_id) {
      case 1:
        return "Standard";
      case 2:
        return "Pro";
      default:
        return "";
    }
  }

  function setValuesOnInputs() {
    setLoadingSetValues(true);
    fullName.setValue(profile.full_name);
    email.setValue(profile.email);
    plan.setValue(getPlanName());
    setLoadingSetValues(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoadingSubmit(true);

    if (password.value !== confirmPassword.value) {
      toast.error("As senhas devem ser iguais");
      setLoadingSubmit(false);
      return;
    }

    if (!fullName.validate() || !email.validate()) {
      toast.error("Preencha todos os campos corretamente");
      setLoadingSubmit(false);
      return;
    }

    const response = await updateAuth({
      email: email.value,
      fullName: fullName.value,
      password: password.value,
    });

    if (!response?.ok) {
      toast.error("Erro ao atualizar usuário: " + response?.error);
    } else {
      toast.success("Informações atualizadas com sucesso");
    }

    setLoadingSubmit(false);
  }

  useEffect(() => {
    setValuesOnInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loadingSetValues ? (
        <div>
          <Loader className="animate-spin mr-3" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-5 mt-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <CustomInput
              label="Nome Completo"
              name="fullName"
              placeholder="Nome"
              required
              {...fullName}
            />
            <CustomInput
              label="E-mail"
              name="email"
              placeholder="e-mail"
              disabled
              required
              {...email}
            />
            <CustomInput
              label="Plano"
              name="plan"
              placeholder="plano"
              disabled
              {...plan}
            />
            <CustomInput
              label="Nova Senha"
              name="password"
              placeholder="Insira nova senha"
              type="password"
              {...password}
            />
            <CustomInput
              label="Confirmar Nova Senha"
              name="confirmPassword"
              placeholder="Confirmação nova senha"
              type="password"
              {...confirmPassword}
            />
          </div>

          <div className="flex gap-3 mt-8">
            {profile.plan_id !== 2 && (
              <Link
                href="/plans"
                className="primary-color-x text-amber-50 hover:brightness-105 transition hover:shadow-lg hover:shadow-amber-500/30 px-4 py-2 rounded-md font-bold text-sm leading-6"
              >
                Alterar para Pro
              </Link>
            )}
            <CustomButton variant="success" isLoading={loadingSubmit}>
              Salvar
            </CustomButton>
          </div>
        </form>
      )}
    </>
  );
};
