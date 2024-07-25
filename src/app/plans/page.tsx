import { PlansCard } from "@/components/custom/plans/PlansCard";
import { PlansCardItem } from "@/components/custom/plans/PlansCardItem";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PlansPage() {
  // const supabase = createClient();
  // const { data, error } = await supabase.auth.getUser();

  // if (error || !data?.user) {
  //   redirect("/login");
  // }

  // const { data: user } = await supabase
  //   .from("users")
  //   .select("*")
  //   .eq("auth_user_id", data.user.id)
  //   .single();

  return (
    <main className="bg-stone-200 pb-8">
      <div className="max-w-[1220px] mx-auto p-5 min-h-[calc(100vh-32px)] pt-12">
        <div className="flex flex-col items-center gap-8">
          {true && (
            <Link
              href="/"
              className="flex items-center gap-2 font-bold hover:text-amber-500"
            >
              <ArrowLeft />
              Voltar
            </Link>
          )}

          <Image
            src="/logo-precoteto-black.png"
            alt="Logo Arcto"
            width={200}
            height={50}
          />
          <div className="text-center">
            <h1>
              {false
                ? "Escolha seu plano para finalizar o cadastro!"
                : "Alterar Plano"}
            </h1>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          <PlansCard name="Pro Mensal" price="9,00" plan="monthly">
            <PlansCardItem title="Ranking método Bazin de todos os ativos" />
            <PlansCardItem title="Ranking método Graham de todos os ativos" />
            <PlansCardItem title="Ranking método Lynch de todos os ativos" />
            <PlansCardItem
              title="Acompanhamento de Carteira"
              description="~ Métricas e gráficos de divisão da carteira por setor, total acumulado, representação em porcentagem de cada ativo, entre outras"
            />
            <PlansCardItem title="Exportação de tabelas em excel" />
            <PlansCardItem title="Suporte via email" />
          </PlansCard>

          <PlansCard name="Pro Vitalício" price="69,00" popular plan="vitality">
            <PlansCardItem title="Ranking método Bazin de todos os ativos" />
            <PlansCardItem title="Ranking método Graham de todos os ativos" />
            <PlansCardItem title="Ranking método Lynch de todos os ativos" />
            <PlansCardItem
              title="Acompanhamento de Carteira"
              description="~ Métricas e gráficos de divisão da carteira por setor, total acumulado, representação em porcentagem de cada ativo, entre outras"
            />
            <PlansCardItem title="Exportação de tabelas em excel" />
            <PlansCardItem title="Suporte via email" />
          </PlansCard>
        </div>
      </div>
    </main>
  );
}
