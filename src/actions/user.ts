"use server";

import apiError from "@/utils/apiError";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/auth-js";
import { revalidatePath } from "next/cache";

type UpdateProps = {
  fullName: string;
  email: string;
  password?: string;
};

export async function updateAuth({ fullName, email, password }: UpdateProps) {
  try {
    if (fullName === "" || email === "") {
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
    let dataUser = null;

    if (!user) {
      return {
        ok: false,
        error: "Usuário não encontrado, tente novamente mais tarde.",
        data: null,
      };
    }

    if (password) {
      const { data, error } = await supabase.auth.updateUser({
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

      dataUser = data.user;
    } else {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
      });

      if (error) {
        return {
          ok: false,
          error: error.message,
          data: null,
        };
      }
      dataUser = data.user;
    }

    const response = await updateProfile({
      fullName,
      email,
      user: user,
    });

    if (!response?.ok) {
      return {
        ok: false,
        error: response?.error,
        data: null,
      };
    }

    revalidatePath("/");
    return {
      ok: true,
      error: null,
      data: dataUser,
    };
  } catch (error) {
    apiError(error);
  }
}

export async function updateProfile({
  fullName,
  email,
  user,
}: {
  fullName: string;
  email: string;
  user: User;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, email })
    .eq("id", user.id)
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
}
