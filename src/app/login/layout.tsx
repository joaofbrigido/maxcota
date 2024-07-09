import Image from "next/image";
import Link from "next/link";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-stone-200">
      <div className="max-w-[1220px] mx-auto p-5 flex items-center gap-24 min-h-[100vh] justify-center max-xl:gap-10 max-[890px]:flex-col max-[890px]:pt-10">
        <div className="relative max-[890px]:order-1">
          <span className="bg-black/50 p-3 rounded inline-block absolute top-5 left-5">
            <Image
              src="/logo-precoteto.png"
              alt="Logo Arcto"
              width={122}
              height={30}
              sizes="100px"
            />
          </span>
          <Image
            width={580}
            height={832}
            src="/image-login.jpg"
            alt="Fachada de uma casa moderna"
            className="rounded-[32px] shadow-3xl shadow-amber-500/25 min-w-[540px] max-xl:min-w-full"
            sizes="1000px"
          />
        </div>

        <div>
          {children}
          {/* <div className="absolute -bottom-[130px]">
            <Link
              href={"/login/privacy"}
              className="font-medium hover:text-amber-500"
            >
              Política de Privacidade
            </Link>
            <span className="text-amber-500 mx-2">|</span>
            <Link
              href={"/login/terms"}
              className="font-medium hover:text-amber-500"
            >
              Termos de Uso
            </Link>
          </div> */}
        </div>
      </div>
    </main>
  );
}
