import { CustomInput } from "@/components/custom/CustomInput";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LostLoginPage() {
  return (
    <section className="animeLeft">
      <Link
        href={"/login"}
        className="flex items-center gap-2 font-bold mb-16 hover:text-amber-500"
      >
        <ArrowLeft />
        Login
      </Link>
      <h1>Esqueceu a senha?</h1>
      <p className="text-zinc-600 mt-2">
        Digite seu email cadastrado que enviaremos um email com as intruções
        para alterar a senha
      </p>
      <div className="flex flex-col gap-5 my-8">
        {/* <CustomInput
          label="E-mail"
          name="email"
          type="email"
          placeholder="nome@email.com"
        /> */}
      </div>

      <Button className="w-full">Enviar Reste de Senha</Button>
    </section>
  );
}
