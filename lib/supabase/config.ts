export function hasSupabaseAdminConfig() {
  return getSupabaseAdminConfigStatus().ready;
}

export function getSupabaseAdminConfigStatus() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const missing = [
    !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : "",
    !anonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : "",
    !serviceRoleKey ? "SUPABASE_SERVICE_ROLE_KEY" : "",
  ].filter(Boolean);

  if (!supabaseUrl && !serviceRoleKey) {
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
