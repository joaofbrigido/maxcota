"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomInput } from "../CustomInput";
import { CustomButton } from "../CustomButton";
import { toast } from "sonner";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    // const response = await signIn(email, password);

    // if (response?.error) {
    //   toast.error("Erro logar, tente novamente mais tarde", {
    //     description: response.error,
    //   });
    // }

    // if (response?.ok) {
    //   window.location.href = "/";
    // }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5 my-8">
        <CustomInput
          label="E-mail"
          name="email"
          placeholder="nome@email.com"
          isLogin
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <CustomInput
          label="Senha"
          name="password"
          type="password"
          placeholder="senha"
          isLogin
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
