import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Preço Teto",
  description: "Tenha controle de seus ativos financeiros | Precoteto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={dmSans.className}>
        <Toaster richColors />
        <NextTopLoader
          color="#f59e0b"
          height={3}
          shadow="0 0 10px #f59e0b,0 0 5px #f59e0b"
        />
        {children}
      </body>
    </html>
  );
}
