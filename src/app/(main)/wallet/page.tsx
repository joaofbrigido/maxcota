import { BgWhite } from "@/components/custom/BgWhite";
import { ChartCard } from "@/components/custom/wallet/ChartCard";
import { NumberCard } from "@/components/custom/wallet/NumberCard";
import { DollarSign, ShieldPlus, WalletMinimal } from "lucide-react";

export default function WalletPage() {
  return (
    <main className="grid grid-cols-[0.45fr_1fr] gap-5 max-[1200px]:grid-cols-1">
      <div className="space-y-5">
        <NumberCard
          title="Total em Reais"
          value="R$ 67.945,32"
          icon={<DollarSign size={20} className="text-amber-400" />}
        />
        <ChartCard title="Divisão por Ativo" whichChart="ativo" />
      </div>
      <BgWhite>table aqui</BgWhite>

      <div className="space-y-5">
        <NumberCard
          title="Total de Ativos"
          value="10"
          icon={<WalletMinimal size={20} className="text-amber-400" />}
        />
        <NumberCard
          title="Ativos com Margin Seg"
          value="7"
          icon={<ShieldPlus size={20} className="text-amber-400" />}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <ChartCard title="Divisão por Setor" whichChart="setor" />
        <ChartCard title="Ação x FIIs" whichChart="acaoFiis" />
      </div>
    </main>
  );
}
