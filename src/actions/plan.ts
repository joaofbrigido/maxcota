"use server";

import apiError from "@/utils/apiError";
import { createClient } from "@/utils/supabase/server";

export async function update(plan: "standard" | "pro", userId: string) {
  try {
    const supabase = createClient();
    const planId = plan === "standard" ? 1 : 2;

    const { error } = await supabase
      .from("profiles")
      .update({ plan_id: planId })
      .eq("id", userId)
      .select();

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
      data: null,
    };
  } catch (error) {
    apiError(error);
  }
}
