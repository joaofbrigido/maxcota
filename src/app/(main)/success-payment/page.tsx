import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function SuccessPaymentPage() {
  return (
    <main className="text-center max-w-[650px] m-auto">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-8">Pagamento Concluído com Sucesso!</h1>
      <p className="mt-2 text-zinc-500">
        Agradecemos a confiança! Clique no link abaixo para ir para Home e
        controlar seus investimentos!
      </p>
      <Link
        className="block mt-4 text-amber-500 underline font-medium text-xl"
        href="/"
      >
        Ir Para Home
      </Link>
    </main>
  );
}
