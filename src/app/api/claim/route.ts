import { NextResponse, type NextRequest } from "next/server";
import { CLAIM_COOKIE, claimCookieOptions, readClaim } from "@/lib/claim";

/** The "Create my account" link in the welcome email lands here. */
export async function GET(req: NextRequest) {
  const t = req.nextUrl.searchParams.get("t") ?? "";
  if (!readClaim(t)) return NextResponse.redirect(new URL("/signin", req.url));
  const res = NextResponse.redirect(new URL("/signin?tab=up&paid=1", req.url));
  res.cookies.set(CLAIM_COOKIE, t, claimCookieOptions);
  return res;
}
