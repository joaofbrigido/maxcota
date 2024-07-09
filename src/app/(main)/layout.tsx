import { Header } from "@/components/custom/Header";
import { MenuLateral } from "@/components/custom/MenuLateral";

export default async function layoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[250px_1fr] max-md:grid-cols-1">
      <MenuLateral />
      <div>
        <Header />
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
