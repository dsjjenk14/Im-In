import { AppProvider } from "@/components/AppProvider";
import { Shell } from "@/components/Shell";
import { loadAds } from "@/lib/ads";

export const revalidate = 60;

/** The free beta preview. Example data, this browser only, Act 1 open. */
export default async function PreviewLayout({ children }: { children: React.ReactNode }) {
  const ads = await loadAds();
  return (
    <AppProvider mode="demo" ads={ads}>
      <Shell>{children}</Shell>
    </AppProvider>
  );
}
