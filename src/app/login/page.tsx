import { SignInForm } from "@/components/custom/login/SignInForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Preço.Teto",
  description: "Logue no site Precoteto",
};

export default function LoginPage() {
  return (
    <section className="animeLeft">
      <h1>Tenha o controle de seus ativos financeiros</h1>
      <SignInForm />

      <p className="mt-8">
        Não tem uma conta?{" "}
        <Link
          href={"/login/create"}
          className="text-amber-500 font-bold hover:text-amber-400"
        >
          Cadastre-se
        </Link>
      </p>
    </section>
  );
}
