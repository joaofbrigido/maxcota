import { BrapiAvailableTickers } from "@/types/types";
import apiError from "@/utils/apiError";

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
