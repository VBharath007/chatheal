import { notFound } from "next/navigation";
import { programmes } from "@/lib/catalog";
import { ProgrammeDetail } from "@/components/store/ProgrammesPage";
export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = programmes.find((p) => p.slug === slug);
  if (!item) notFound();
  return <ProgrammeDetail programme={item} />;
}
