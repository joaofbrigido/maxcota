import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 p-12">
      <h1>404 Página não encontrada</h1>
      <Link href="/" className="text-amber-500 font-medium hover:underline">
        Ir para Home
      </Link>
    </div>
  );
}
