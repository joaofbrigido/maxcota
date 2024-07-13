"use client";

import { CustomInput } from "../CustomInput";
import { useState } from "react";
// import { signUp } from "@/actions/login";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { CustomButton } from "../CustomButton";

export const CreateForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successCreate, setsuccessCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    // const response = await signUp(fullName, email, password, confirmPassword);

    // if (response?.error) {
    //   toast.error("Erro ao criar conta", {
    //     description: response.error,
    //   });
    // }

    // if (response.ok) {
    //   setsuccessCreate(true);
    //   window.location.href = "/plans";
    // }

    setLoading(false);
  }

  return (
    <>
      {successCreate ? (
        <div className="mt-8 text-center space-y-4 animeUp">
          <CircleCheck size={48} className="text-green-500 m-auto" />
          <h3 className="text-3xl font-bold">
            Conta criada com sucesso. Rederecionando para página de planos...
          </h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Crie uma conta em poucos passos</h1>

          <div className="flex flex-col gap-5 my-8">
            <CustomInput
              label="E-mail"
              name="email"
              type="email"
              placeholder="nome@email.com"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              required
            />
            <CustomInput
              label="Senha"
              name="password"
              type="password"
              placeholder="senha"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
            <CustomInput
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              placeholder="confirmar senha"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              required
            />
          </div>

          <CustomButton className="w-full" isLoading={loading}>
            Criar
          </CustomButton>
        </form>
      )}
    </>
  );
};
