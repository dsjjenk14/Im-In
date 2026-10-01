import { cookies } from "next/headers";
import { CLAIM_COOKIE, readClaim } from "@/lib/claim";
import { SignInView } from "@/components/auth/SignInView";

export default async function SignIn() {
  let canCreate = false;
  try { canCreate = !!readClaim((await cookies()).get(CLAIM_COOKIE)?.value); } catch { /* CLAIM_SECRET not set yet */ }
  return <SignInView canCreate={canCreate} />;
}
