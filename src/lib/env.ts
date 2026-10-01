/** Server and public configuration. Secrets only ever come from environment variables. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured = () => !!(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Absolute site URL for Stripe redirects and email links. */
export function siteUrl(): string {
  const u = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000");
  return u.replace(/\/$/, "");
}

/** Emails that always get the admin panel, comma separated. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

/** Where contact messages and purchase alerts go. */
export const ownerEmail = () => process.env.OWNER_EMAIL || adminEmails()[0] || "";
