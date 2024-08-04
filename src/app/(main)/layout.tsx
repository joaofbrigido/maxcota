import { Header } from "@/components/custom/Header";
import { MenuLateral } from "@/components/custom/MenuLateral";
import { createClient } from "@/utils/supabase/server";

export default async function layoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: dataUser } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", dataUser.user?.id)
    .single();

  return (
    <div className="grid grid-cols-[250px_1fr] max-md:grid-cols-1">
      <MenuLateral profile={profile} />
      <div>
        <Header profile={profile} />
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
