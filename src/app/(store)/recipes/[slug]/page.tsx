import { notFound } from "next/navigation";
import { recipes } from "@/lib/catalog";
import { RecipeDetail } from "@/components/store/EditorialPages";
export function generateStaticParams() {
  return recipes.map((p) => ({ slug: p.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = recipes.find((p) => p.slug === slug);
  if (!item) notFound();
  return <RecipeDetail recipe={item} />;
}
