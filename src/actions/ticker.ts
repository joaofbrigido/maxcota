"use server";

import { Ticker } from "@/types/types";
import apiError from "@/utils/apiError";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type CreateProps = {
  tickerId?: number;
  ticker: string;
  dividendYield: number;
  dpa: number;
  stocksQuantity: number;
};

export async function create({
  ticker,
  dividendYield,
  dpa = 0,
  stocksQuantity = 0,
}: CreateProps) {
  try {
    if (!ticker || !dividendYield) {
      return {
        ok: false,
        error: "Necessário preencher todos os campos",
        data: null,
      };
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("tickers")
      .insert([
        {
          ticker: ticker,
          expected_dividend_yield: dividendYield,
          dpa_year: dpa,
          stocks_quantity: stocksQuantity,
        },
      ])
      .select();

    if (error) {
      return {
        ok: false,
        error: error.message,
        data: null,
      };
    }

    revalidatePath("/");
    return {
      ok: true,
      error: null,
      data: data,
    };
  } catch (error) {
    apiError(error);
  }
}

export async function update({
  tickerId,
  ticker,
  dividendYield,
  dpa,
  stocksQuantity,
}: CreateProps) {
  try {
    if (!ticker || !dividendYield) {
      return {
        ok: false,
        error: "Necessário preencher todos os campos",
        data: null,
      };
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        ok: false,
        error: "Usuário não encontrado, tente novamente mais tarde.",
        data: null,
      };
    }

    const { data, error } = await supabase
      .from("tickers")
      .update([
        {
          ticker: ticker,
          expected_dividend_yield: dividendYield,
          dpa_year: dpa,
          stocks_quantity: stocksQuantity,
        },
      ])
      .eq("user_id", user.id)
      .eq("id", tickerId)
      .select();

    if (error) {
      return {
        ok: false,
        error: error.message,
        data: null,
      };
    }

    revalidatePath("/");
    return {
      ok: true,
      error: null,
      data: data,
    };
  } catch (error) {
    apiError(error);
  }
}

export async function deleteItem(tickerId: number) {
  try {
    if (!tickerId) {
      return {
        ok: false,
        error: "ID do ativo não encontrado, tente novamente mais tarde.",
        data: null,
      };
    }

    const supabase = createClient();

    const { error } = await supabase
      .from("tickers")
      .delete()
      .eq("id", tickerId);

    if (error) {
      return {
        ok: false,
        error: error.message,
        data: null,
      };
    }

    revalidatePath("/");
    return {
      ok: true,
      error: null,
      data: null,
    };
  } catch (error) {
    apiError(error);
  }
}

export async function getAll() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        ok: false,
        error: "Usuário não encontrado, tente novamente mais tarde.",
        data: null,
      };
    }

    const { data, error } = await supabase
      .from("tickers")
      .select("*")
      .eq("user_id", user?.id);

    if (error) {
      return {
        ok: false,
        error: error.message,
        data: null,
      };
    }

    return {
      ok: true,
      error: null,
      data: data as Ticker[],
    };
  } catch (error) {
    apiError(error);
  }
}
