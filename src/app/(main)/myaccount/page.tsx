import { BgWhite } from "@/components/custom/BgWhite";
import { MyaccountForm } from "@/components/custom/myaccount/MyaccountForm";
import { Profile } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

export default async function MyAccountPage() {
  const supabase = createClient();
  const { data: dataUser } = await supabase.auth.getUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", dataUser.user?.id)
    .returns<Profile[]>()
    .single();

  if (error) {
    return (
      <div>
        Ocorreu um erro ao buscar usuário, tente novamente mais tarde.{" "}
        {error.message}
      </div>
    );
  }

  return (
    <main>
      <BgWhite>
        <h2>Dados Cadastrais</h2>
        <MyaccountForm profile={profile} />
      </BgWhite>
    </main>
  );
}
