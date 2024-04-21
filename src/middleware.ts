import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import constants from "./constants/constants";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/admin-panel/log-in") {
    const apiKey = request.cookies.get(constants.ADMIN_API_KEY);

    if (apiKey?.value !== process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY) {
      return NextResponse.redirect(new URL("/admin-panel/log-in", request.nextUrl));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin-panel/:pages*",
};
