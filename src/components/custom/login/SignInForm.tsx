"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomInput } from "../CustomInput";
import { CustomButton } from "../CustomButton";
import { toast } from "sonner";
import { useForm } from "@/hooks/useForm";
import { signIn } from "@/actions/login";

export const SignInForm = () => {
  const email = useForm("email");
  const password = useForm();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (!email.validate() || !password.validate()) {
      toast.warning("Preencha todos os campos corretamente");
      setLoading(false);
      return;
    }

    const response = await signIn(email.value, password.value);

    if (response?.error) {
      toast.error("Erro logar, tente novamente mais tarde", {
        description: response.error,
      });
    }

    if (response?.ok) {
      window.location.href = "/";
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5 my-8">
        <CustomInput
          label="E-mail"
          name="email"
          placeholder="nome@email.com"
          {...email}
        />
        <CustomInput
          label="Senha"
          name="password"
          type="password"
          placeholder="senha"
          {...password}
        />
        <Link
          href={"/login/lost"}
          className="text-sm after:content-[''] after:w-[124px] after:block after:h-[1px] after:bg-stone-500 after:mt-1 hover:text-amber-500 hover:after:bg-amber-500"
        >
          Esqueceu a senha?
        </Link>
      </div>

      <CustomButton className="w-full" isLoading={loading}>
        Entrar
      </CustomButton>
    </form>
  );
};
