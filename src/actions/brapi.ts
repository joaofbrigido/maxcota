import { BrapiAvailableTickers, BrapiTickers, Ticker } from "@/types/types";
import apiError from "@/utils/apiError";

export type BrapiResponseTickers = {
  error?: string;
  message?: string;
  stocks: BrapiTickers[];
};

export async function getAllAvailable() {
  try {
    const response = await fetch(
      `https://brapi.dev/api/available?token=${process.env.NEXT_PUBLIC_BRAPI_TOKEN}`,
      { next: { revalidate: 60 * 60 * 24 } } // 1x ao dia
    );
    const data = (await response.json()) as BrapiAvailableTickers;
    return data;
  } catch (error) {
    apiError(error);
  }
}

export async function getInfoMyTickers(myTickers: Ticker[]) {
  try {
    const response = await fetch(
      `https://brapi.dev/api/quote/list?token=${process.env.NEXT_PUBLIC_BRAPI_TOKEN}`,
      { next: { revalidate: 60 * 30 } } // a cada 30 minutos
    );
    const data = (await response.json()) as BrapiResponseTickers;

    if (data?.error) {
      return {
        ok: false,
        error: data.message,
        data: null,
      };
    }

    const infoMyTickers = data?.stocks.filter((stock) =>
      myTickers.find((ticker) => ticker.ticker === stock.stock)
    );
    return {
      ok: true,
      error: null,
      data: infoMyTickers,
    };
  } catch (error) {
    apiError(error);
  }
}
