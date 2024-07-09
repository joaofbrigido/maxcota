import { CreateForm } from "@/components/custom/login/CreateForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateLoginPage() {
  return (
    <section className="animeLeft">
      <Link
        href={"/login"}
        className="flex items-center gap-2 font-bold mb-16 hover:text-amber-500"
      >
        <ArrowLeft />
        Login
      </Link>

      <CreateForm />
    </section>
  );
}
