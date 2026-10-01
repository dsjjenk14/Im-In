import { AppProvider } from "@/components/AppProvider";
import { Shell } from "@/components/Shell";
import { requireMember } from "@/lib/member";
import { loadAds } from "@/lib/ads";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [member, ads] = await Promise.all([requireMember(), loadAds()]);
  return (
    <AppProvider mode="member" member={member} ads={ads}>
      <Shell>{children}</Shell>
    </AppProvider>
  );
}
