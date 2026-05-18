export const ADMIN_COOKIE_NAME = "ayyi_admin_session";
export const ADMIN_LOGIN = process.env.ADMIN_LOGIN ?? "Sami";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "S@m1@2026";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;
const encoder = new TextEncoder();

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "ayyi-tour-local-admin-secret-change-me";
}

function base64UrlEncode(value: string) {
  return btoa(value).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");

  return atob(padded);
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
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
  const signature = await sign(payload);

  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string) {
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
