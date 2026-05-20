export function hasSupabaseAdminConfig() {
  return getSupabaseAdminConfigStatus().ready;
}

export function getSupabasePublicKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
}

export function getSupabaseSecretKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
}

export function getSupabaseAdminConfigStatus() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey = getSupabasePublicKey();
  const secretKey = getSupabaseSecretKey();
  const missing = [
    !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : "",
    !publicKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" : "",
    !secretKey ? "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY" : "",
  ].filter(Boolean);

  if (!supabaseUrl && !secretKey) {
    return {
      ready: false,
      mode: "local" as const,
      missing,
      message: "Supabase is not configured; using local catalog data.",
    };
  }

  if (missing.length > 0) {
    return {
      ready: false,
      mode: "partial" as const,
      missing,
      message: `Incomplete Supabase config: ${missing.join(", ")}`,
    };
  }

  if (!supabaseUrl) {
    return {
      ready: false,
      mode: "partial" as const,
      missing,
      message: "Missing NEXT_PUBLIC_SUPABASE_URL.",
    };
  }

  try {
    new URL(supabaseUrl);
  } catch {
    return {
      ready: false,
      mode: "invalid" as const,
      missing: [],
      message: "NEXT_PUBLIC_SUPABASE_URL is not a valid URL.",
    };
  }

  return {
    ready: true,
    mode: "supabase" as const,
    missing: [],
    message: "Supabase admin config is ready.",
  };
}
