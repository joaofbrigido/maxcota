import { getAll } from "@/actions/ticker";
import { DialogTicker } from "@/components/custom/DialogTicker";
import { TabBazin } from "@/components/custom/home/TabBazin";
import { TabCeilingPrice } from "@/components/custom/home/TabCeilingPrice";
import { TabGraham } from "@/components/custom/home/TabGraham";
import { TabLynch } from "@/components/custom/home/TabLynch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function HomePage() {
  const responseCeilingPrice = await getAll();
  const tickersCeilingPrice = responseCeilingPrice?.data || [];

  return (
    <div className="relative">
      <DialogTicker className="mb-2 absolute right-0 max-[512px]:static" />
      <Tabs defaultValue="ceilingPrice">
        <TabsList className="max-[512px]:w-full">
          <TabsTrigger value="ceilingPrice">Preço Teto</TabsTrigger>
          <TabsTrigger value="bazin">Bazin</TabsTrigger>
          <TabsTrigger value="graham">Graham</TabsTrigger>
          <TabsTrigger value="lynch">Lynch</TabsTrigger>
        </TabsList>
        <TabsContent value="ceilingPrice" className="animeUp">
          <TabCeilingPrice tickers={tickersCeilingPrice} />
        </TabsContent>
        <TabsContent value="bazin" className="animeUp">
          <TabBazin />
        </TabsContent>
        <TabsContent value="graham" className="animeUp">
          <TabGraham />
        </TabsContent>
        <TabsContent value="lynch" className="animeUp">
          <TabLynch />
        </TabsContent>
      </Tabs>
    </div>
  );
}
