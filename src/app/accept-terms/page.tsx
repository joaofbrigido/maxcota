import { AcceptTermsForm } from "@/components/custom/accept-terms/AcceptTermsForm";
import Image from "next/image";
import Link from "next/link";

export default async function AcceptTermsPage() {
  return (
    <main className="bg-stone-200">
      <div className="max-w-[1220px] mx-auto p-5 min-h-[calc(100vh-32px)] pt-12">
        <div className="flex flex-col items-center gap-8 text-center">
          <Image
            src="/logo-precoteto-black.png"
            alt="Logo Arcto"
            width={200}
            height={50}
          />
          <h1>Falta pouco! Preencha o restante para finalizar</h1>
        </div>

        <div className="mt-16 max-w-[580px] m-auto p-5 bg-stone-100 rounded-lg border border-stone-300">
          <AcceptTermsForm />
          <div className="mt-8 flex items-center gap-1 font-medium text-center justify-center max-[400px]:flex-col">
            <Link href="/privacy" className="hover:text-amber-500">
              Política de Privacidade
            </Link>
            <span className="text-amber-500 max-[400px]:hidden">|</span>
            <Link href="/terms" className="hover:text-amber-500">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
