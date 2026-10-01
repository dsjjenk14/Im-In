import { notFound } from "next/navigation";
import { VIEW_IDS, viewMeta, type ViewId } from "@/lib/journey";
import { MEMBER_VIEWS } from "@/components/views/memberViews";

export async function generateMetadata({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  if (!VIEW_IDS.includes(view as ViewId)) return {};
  return { title: viewMeta(view as ViewId).title + " · The HR Blueprint" };
}

export default async function ViewPage({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  if (!VIEW_IDS.includes(view as ViewId) || view === "dashboard") notFound();
  const V = MEMBER_VIEWS[view as ViewId];
  return <V />;
}
