"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BgWhite } from "../BgWhite";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

type ChartCardProps = {
  title: string;
  whichChart: "ativo" | "setor" | "acaoFiis";
  ativosData?: { ticker: string; total: number }[] | [];
  sectorData?: { sector: string; percentage: number }[] | [];
  percentageAcao?: number;
  percentageFiis?: number;
};

export const ChartCard = ({
  title,
  whichChart,
  ativosData,
  percentageAcao,
  percentageFiis,
  sectorData,
}: ChartCardProps) => {
  const setorConfig = {
    percentage: {
      label: "%",
      color: "#fbbf24",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig;

  const acaoFiisData = [
    { investimento: "acao", percentage: percentageAcao, fill: "#fcd34d" },
    { investimento: "fiis", percentage: percentageFiis, fill: "#fbbf24" },
  ];

  const acaoFiisCongif = {
    percentage: {
      label: "%",
    },
    acao: {
      label: "Ação",
      color: "#000000",
    },
    fiis: {
      label: "Fiis",
      color: "#000000",
    },
  } satisfies ChartConfig;

  function getAtivosData() {
    const total = ativosData!.reduce((acc, item) => acc + item.total, 0);
    const data = ativosData!.map((item) => {
      const percentage = (item.total / total) * 100;
      const fill = getRandomColor();

      return {
        ticker: item.ticker,
        total: Number(percentage.toFixed(2)),
        fill: fill,
      };
    });

    return data;
  }

  function getAtivosConfig() {
    const ativosConfig = ativosData!.reduce(
      (acc, item) => {
        acc[item.ticker] = {
          label: item.ticker.toUpperCase(),
          color: `#000000`,
        };
        return acc;
      },
      { total: { label: "% Total" } } as {
        [key: string]: {
          label: string;
          color?: string;
        };
      }
    );

    return ativosConfig satisfies ChartConfig;
  }

  function getRandomColor(): string {
    const colors: string[] = [
      "#FDBA74",
      "#FB923C",
      "#F97316",
      "#FCD34D",
      "#FBBF24",
      "#F59E0B",
      "#FDE047",
      "#FACC15",
      "#EAB308",
      "#EA580C",
      "#D97706",
      "#CA8A04",
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <BgWhite>
      <h2>{title}</h2>
      {whichChart === "ativo" && (
        <ChartContainer
          config={getAtivosConfig()}
          className="mx-auto aspect-square max-h-[283px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="total" hideLabel />}
            />
            <Pie data={getAtivosData()} dataKey="total" innerRadius={50}>
              <LabelList
                dataKey="ticker"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => getAtivosConfig()[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}

      {whichChart === "setor" && (
        <ChartContainer
          config={setorConfig}
          className="mt-5 max-h-[190px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={sectorData}
            layout="vertical"
            margin={{
              right: 40,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="sector"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="percentage" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="percentage"
              layout="vertical"
              fill="var(--color-percentage)"
              radius={4}
            >
              <LabelList
                dataKey="sector"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="percentage"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}

      {whichChart === "acaoFiis" && (
        <ChartContainer
          config={acaoFiisCongif}
          className="mx-auto aspect-square max-h-[210px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="percentage" hideLabel />}
            />
            <Pie data={acaoFiisData} dataKey="percentage" innerRadius={40}>
              <LabelList
                dataKey="investimento"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof acaoFiisCongif) =>
                  acaoFiisCongif[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
    </BgWhite>
  );
};
