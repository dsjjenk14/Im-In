import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * A signed, httpOnly cookie that proves the visitor paid (or redeemed a code)
 * before they have an account. Account creation requires it.
 */
export const CLAIM_COOKIE = "hrbp_claim";
export type Claim = { kind: "stripe"; sid: string } | { kind: "code"; code: string };

function secret(): string {
  const s = process.env.CLAIM_SECRET ?? "";
  if (s.length < 16) throw new Error("CLAIM_SECRET is not set (16+ characters).");
  return s;
}

export function signClaim(c: Claim): string {
  const body = Buffer.from(JSON.stringify({ ...c, t: Date.now() })).toString("base64url");
  const mac = createHmac("sha256", secret()).update(body).digest("base64url");
  return body + "." + mac;
}

/** Valid for 30 days, long enough for someone who pays and comes back later from the email link. */
export function readClaim(v: string | undefined): Claim | null {
  if (!v) return null;
  const [body, mac] = v.split(".");
  if (!body || !mac) return null;
  const want = createHmac("sha256", secret()).update(body).digest();
  const got = Buffer.from(mac, "base64url");
  if (got.length !== want.length || !timingSafeEqual(got, want)) return null;
  try {
    const o = JSON.parse(Buffer.from(body, "base64url").toString());
    if (Date.now() - o.t > 30 * 864e5) return null;
    if (o.kind === "stripe" && typeof o.sid === "string") return { kind: "stripe", sid: o.sid };
    if (o.kind === "code" && typeof o.code === "string") return { kind: "code", code: o.code };
  } catch { /* fall through */ }
  return null;
}

export const claimCookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 30 * 86400 };
