import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdminConfigStatus } from "@/lib/supabase/config";
import type { Database } from "@/types/supabase";

export function createSupabaseAdminClient() {
  const status = getSupabaseAdminConfigStatus();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!status.ready || !supabaseUrl || !serviceRoleKey) {
    throw new Error(status.message);
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
