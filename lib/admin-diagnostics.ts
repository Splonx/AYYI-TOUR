import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseAdminConfigStatus } from "@/lib/supabase/config";
import { hasAdminAuthConfig } from "@/lib/admin-auth";

type DiagnosticItem = {
  label: string;
  ok: boolean;
  detail: string;
};

function envItem(name: string, value: string | undefined) {
  return {
    label: name,
    ok: Boolean(value),
    detail: value ? "Configured" : "Missing",
  };
}

async function restItem(path: string, label: string): Promise<DiagnosticItem> {
  const status = getSupabaseAdminConfigStatus();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!status.ready || !supabaseUrl || !serviceRoleKey) {
    return {
      label,
      ok: false,
      detail: status.message,
    };
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
      method: "HEAD",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        label,
        ok: false,
        detail: `HTTP ${response.status} ${response.statusText}`,
      };
    }

    return {
      label,
      ok: true,
      detail: "Accessible via Supabase REST",
    };
  } catch (error) {
    return {
      label,
      ok: false,
      detail: error instanceof Error ? error.message : "Unknown Supabase REST diagnostic error",
    };
  }
}

async function supabaseConnectionItem(): Promise<DiagnosticItem> {
  return restItem("", "Supabase REST connection");
}

async function tableItem(table: "services" | "fleet", label: string): Promise<DiagnosticItem> {
  const status = getSupabaseAdminConfigStatus();

  if (!status.ready) {
    return {
      label,
      ok: false,
      detail: status.message,
    };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from(table).select("id", { count: "exact", head: true });

    if (error) {
      return {
        label,
        ok: false,
        detail: error.message,
      };
    }

    return {
      label,
      ok: true,
      detail: "Table accessible",
    };
  } catch (error) {
    return {
      label,
      ok: false,
      detail: error instanceof Error ? error.message : "Unknown table diagnostic error",
    };
  }
}

async function bucketItem(name: string): Promise<DiagnosticItem> {
  const status = getSupabaseAdminConfigStatus();

  if (!status.ready) {
    return {
      label: `Storage bucket ${name}`,
      ok: false,
      detail: status.message,
    };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.storage.getBucket(name);

    if (error) {
      return {
        label: `Storage bucket ${name}`,
        ok: false,
        detail: error.message,
      };
    }

    return {
      label: `Storage bucket ${name}`,
      ok: Boolean(data),
      detail: data ? "Bucket accessible" : "Bucket missing",
    };
  } catch (error) {
    return {
      label: `Storage bucket ${name}`,
      ok: false,
      detail: error instanceof Error ? error.message : "Unknown bucket diagnostic error",
    };
  }
}

export async function getAdminDiagnostics() {
  const supabaseStatus = getSupabaseAdminConfigStatus();
  const items: DiagnosticItem[] = [
    envItem("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    envItem("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    envItem("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY),
    envItem("ADMIN_PASSWORD", process.env.ADMIN_PASSWORD),
    {
      label: "ADMIN_SESSION_SECRET",
      ok: Boolean(process.env.ADMIN_SESSION_SECRET),
      detail: process.env.ADMIN_SESSION_SECRET ? "Configured" : "Missing",
    },
    {
      label: "Admin auth config",
      ok: hasAdminAuthConfig(),
      detail: hasAdminAuthConfig()
        ? "Login credentials and session secret configured"
        : "Missing ADMIN_LOGIN, ADMIN_PASSWORD or ADMIN_SESSION_SECRET",
    },
    await supabaseConnectionItem(),
    await tableItem("services", "Table services"),
    await tableItem("fleet", "Table public.fleet"),
    await restItem("fleet?select=id&limit=1", "Table public.fleet REST"),
    await bucketItem("vehicle-images"),
  ];

  console.info("[admin diagnostics]", {
    supabaseMode: supabaseStatus.mode,
    missing: supabaseStatus.missing,
    failed: items.filter((item) => !item.ok).map((item) => item.label),
  });

  return {
    generatedAt: new Date().toISOString(),
    supabaseStatus,
    items,
  };
}
