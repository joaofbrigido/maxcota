import { getAllStocks } from "@/actions/brapi";
import { getAll } from "@/actions/ticker";
import { DialogTicker } from "@/components/custom/DialogTicker";
import { TabAllStocks } from "@/components/custom/home/TabAllStocks";
import { TabCeilingPrice } from "@/components/custom/home/TabCeilingPrice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function HomePage() {
  const responseCeilingPrice = await getAll();
  const responseAllStocks = await getAllStocks();
  const tickersCeilingPrice = responseCeilingPrice?.data || [];
  const allStocks = responseAllStocks?.data || [];

  return (
    <div className="relative">
      <DialogTicker
        className="mb-2 absolute right-0 max-[512px]:static"
        myTickers={tickersCeilingPrice}
      />
      <Tabs defaultValue="ceilingPrice">
        <TabsList className="max-[512px]:w-full">
          <TabsTrigger value="ceilingPrice">Preço Teto</TabsTrigger>
          <TabsTrigger value="allStocks">Todos os Ativos</TabsTrigger>
        </TabsList>
        <TabsContent value="ceilingPrice" className="animeUp">
          <TabCeilingPrice tickers={tickersCeilingPrice} />
        </TabsContent>
        <TabsContent value="allStocks" className="animeUp">
          <TabAllStocks allStocks={allStocks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
