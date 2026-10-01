import { notFound } from "next/navigation";
import { VIEW_IDS, type ViewId } from "@/lib/journey";
import { Assess, Decoder, IsRight, Story, Welcome } from "@/components/views/act1";
import { BetaLock, Contact } from "@/components/views/other";

// Only Act 1 and contact are importable here, so paid lessons never reach the preview bundle.
const OPEN: Partial<Record<ViewId, () => React.ReactNode>> = {
  welcome: Welcome, story: Story, isright: IsRight, decoder: Decoder, assess: Assess, contact: Contact,
};

export default async function PreviewView({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  if (!VIEW_IDS.includes(view as ViewId) || view === "dashboard") notFound();
  const V = OPEN[view as ViewId] ?? BetaLock;
  return <V />;
}
