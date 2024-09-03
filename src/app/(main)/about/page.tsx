import { BgWhite } from "@/components/custom/BgWhite";

export default async function AboutPage() {
  return (
    <main className="max-w-[1200px]">
      <BgWhite>
        <h2>O que é o Método Bazin?</h2>
        <p className="mt-3">
          O cálculo de preço teto, utilizado na home, se baseia no Método Bazin,
          criado pelo jornalista e investidor Décio Bazin, é uma estratégia de
          investimentos focada em selecionar ações de empresas que são boas
          pagadoras de dividendos. O objetivo principal é construir uma carteira
          de ações que proporcione rendimentos regulares, ideal para quem deseja
          viver de dividendos no longo prazo.
        </p>

        <h2 className="mt-8">Os Três Pilares do Método Bazin</h2>
        <p className="mt-3">
          <strong>1. Endividamento:</strong> Priorize empresas com endividamento
          moderado, evitando aquelas excessivamente endividadas.
        </p>
        <p className="mt-2">
          <strong>2. Cash Yield:</strong> Foque em ações com um Dividend Yield
          mínimo de 6% ao ano, garantindo um retorno atraente em dividendos.
        </p>
        <p className="mt-2">
          <strong>3. Liquidez:</strong> Escolha empresas com bom volume de
          negociações na Bolsa, assegurando facilidade na compra e venda das
          ações.
        </p>

        <h2 className="mt-8">Fórmula do Preço Teto</h2>
        <p className="mt-3">
          A fórmula do Preço Teto do Método Bazin é usada para determinar o
          preço máximo que você deve pagar por uma ação, com base nos dividendos
          que ela paga. A fórmula é simples:
        </p>
        <p className="mt-4 bg-stone-200 p-4 rounded-lg">
          <code className="font-mono text-xl">
            Preço Teto = (Dividendo por Ação Anual) / dividend yield desejado
          </code>
        </p>
        <p className="mt-4">
          O ideal para Bazin seria um mínimo 6% de dividend yield esperado,
          assim garante que você não irá pagar caro demais por uma ação.
        </p>
        <p className="mt-4">
          O Método Bazin é ideal para investidores que buscam segurança e
          rendimentos regulares por meio de dividendos, mas é fundamental
          alinhar essa estratégia ao seu perfil de investidor.
        </p>
      </BgWhite>
    </main>
  );
}
