"use server";

import apiError from "@/utils/apiError";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signIn(email: string, password: string) {
  try {
    const supabase = createClient();

    if (!email.trim() || !password.trim()) {
      return {
        ok: false,
        error: "Necessário preencher usuário e senha",
        data: null,
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      ok: false,
      error: error.message,
      data: null,
    };
  } else {
    redirect("/login");
  }
}

export async function signUp({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const supabase = createClient();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      return {
        ok: false,
        error: "Todos os campos precisam ser preenchidos",
        data: null,
      };
    }

    if (password !== confirmPassword) {
      return {
        ok: false,
        error: "Senha e confirmação de senha precisam ser iguais",
        data: null,
      };
    }

    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

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
      data: user,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}

export async function forgotPassword(email: string) {}

export async function acceptTerms({
  fullName,
  acceptTerms,
}: {
  fullName: string;
  acceptTerms: boolean;
}) {
  try {
    if (!fullName.trim() || !acceptTerms) {
      return {
        ok: false,
        error: "Necessário preencher nome e aceitar os termos",
        data: null,
      };
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .insert([{ full_name: fullName, email: user?.email, plan_id: 3 }])
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
      data: data,
    };
  } catch (error) {
    apiError(error);
  }
}

export async function chooseFirstPlan(plan: "monthly" | "vitality") {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("profiles")
      .update({ plan_id: plan === "monthly" ? 1 : 2 })
      .eq("id", user?.id)
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
      data: data,
    };
  } catch (error) {
    apiError(error);
  }
}
