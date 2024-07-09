import { CustomInput } from "@/components/custom/CustomInput";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResetLoginPage() {
  return (
    <section className="animeLeft">
      <Link
        href={"/login"}
        className="flex items-center gap-2 font-bold mb-16 hover:text-amber-500"
      >
        <ArrowLeft />
        Login
      </Link>
      <h1>Alterar Senha</h1>
      <p className="text-stone-600 mt-2">
        Preencha os campos abaixo para definir uma nova senha
      </p>
      <div className="flex flex-col gap-5 my-8">
        <CustomInput
          label="Nova Senha"
          name="password"
          type="password"
          placeholder="senha"
          isLogin
        />
        <CustomInput
          label="Confirmar Nova Senha"
          name="confirmPassword"
          type="password"
          placeholder="confirmar senha"
          isLogin
        />
      </div>

      <Button className="w-full">Alterar Senha</Button>
    </section>
  );
}
