export const ADMIN_COOKIE_NAME = "ayyi_admin_session";
export const ADMIN_LOGIN =
  process.env.ADMIN_LOGIN ?? (process.env.NODE_ENV === "production" ? "" : "Sami");
export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV === "production" ? "" : "S@m1@2026");

const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;
const encoder = new TextEncoder();

function getSecret({ strict = false } = {}) {
  if (strict && process.env.NODE_ENV === "production" && !process.env.ADMIN_SESSION_SECRET) {
    throw new Error("Missing ADMIN_SESSION_SECRET in production");
  }

  return process.env.ADMIN_SESSION_SECRET ?? "ayyi-tour-local-admin-secret-change-me";
}

export function hasAdminAuthConfig() {
  return Boolean(ADMIN_LOGIN && ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

function base64UrlEncode(value: string) {
  return btoa(value).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");

  return atob(padded);
}

async function sign(value: string, options?: { strict?: boolean }) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret(options)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}

export async function createAdminSessionToken() {
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: ADMIN_LOGIN,
      role: "admin",
      exp: Date.now() + SESSION_DURATION_MS,
    }),
  );
  const signature = await sign(payload, { strict: true });

  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string) {
  if (process.env.NODE_ENV === "production" && !process.env.ADMIN_SESSION_SECRET) {
    return false;
  }

  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = await sign(payload);

  if (signature !== expectedSignature) {
    return false;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as {
      sub?: string;
      role?: string;
      exp?: number;
    };

    return (
      session.sub === ADMIN_LOGIN &&
      session.role === "admin" &&
      typeof session.exp === "number" &&
      session.exp > Date.now()
    );
  } catch {
    return false;
  }
}
