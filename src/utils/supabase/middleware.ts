import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // redirect Caso o user não esteja logado
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    // redirect Caso user não tenha aceitado os termos
    if (
      (error || !profile) &&
      !request.nextUrl.pathname.startsWith("/accept-terms")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/accept-terms";
      return NextResponse.redirect(url);
    }

    // redirect Caso user não tenha selecionado um plano
    if (
      (profile?.plan_id === null || profile?.plan_id === 3) &&
      !request.nextUrl.pathname.startsWith("/plans")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/plans";
      return NextResponse.redirect(url);
    }

    // redirect Caso user já tenha aceitado os termos
    if (
      request.nextUrl.pathname.startsWith("/accept-terms") &&
      profile?.plan_id !== 3
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // redirect Caso user esteja no plano vitalício
    if (
      request.nextUrl.pathname.startsWith("/plans") &&
      profile?.plan_id === 2
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
