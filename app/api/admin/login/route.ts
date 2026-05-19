import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  hasAdminAuthConfig,
  validateAdminCredentials,
} from "@/lib/admin-auth";

function redirectTo(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url), { status: 303 });
}

function safeAdminPath(value: FormDataEntryValue | null) {
  const nextPath = typeof value === "string" ? value : "";
  const isAdminPath =
    nextPath === "/admin" ||
    nextPath.startsWith("/admin/") ||
    nextPath.startsWith("/admin?");

  if (
    isAdminPath &&
    !nextPath.startsWith("/admin/login") &&
    !nextPath.startsWith("//")
  ) {
    return nextPath;
  }

  return "/admin";
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production" && !hasAdminAuthConfig()) {
    return redirectTo(request, "/admin/login?config=missing");
  }

  const formData = await request.formData();
  const login = String(formData.get("login") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!validateAdminCredentials(login, password)) {
    return redirectTo(request, "/admin/login?error=1");
  }

  const response = redirectTo(request, safeAdminPath(formData.get("next")));
  const token = await createAdminSessionToken();

  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
