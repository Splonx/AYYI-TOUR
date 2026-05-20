import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdminConfigStatus, getSupabaseSecretKey } from "@/lib/supabase/config";
import type { Database } from "@/types/supabase";

export function createSupabaseAdminClient() {
  const status = getSupabaseAdminConfigStatus();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = getSupabaseSecretKey();

  if (!status.ready || !supabaseUrl || !secretKey) {
    throw new Error(status.message);
  }

  return createClient<Database>(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
