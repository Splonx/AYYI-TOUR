import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { mutateFleet } from "@/lib/admin/admin-mutations";

function redirectTo(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url), { status: 303 });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAdmin = await verifyAdminSessionToken(token);

  if (!isAdmin) {
    return redirectTo(request, "/admin/login?next=/admin/fleet");
  }

  try {
    const formData = await request.formData();
    const status = await mutateFleet(formData);

    return redirectTo(request, `/admin/fleet?success=${status}`);
  } catch (error) {
    console.error("[admin fleet mutation]", error);

    return redirectTo(request, "/admin/fleet?error=save");
  }
}
