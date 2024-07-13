import { BgWhite } from "@/components/custom/BgWhite";
import { MyaccountForm } from "@/components/custom/myaccount/MyaccountForm";

export default function MyAccountPage() {
  return (
    <main>
      <BgWhite>
        <h2>Dados Cadastrais</h2>
        <MyaccountForm />
      </BgWhite>
    </main>
  );
}
