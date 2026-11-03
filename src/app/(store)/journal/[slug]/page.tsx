import { notFound } from "next/navigation";
import { articles } from "@/lib/catalog";
import { ArticlePage } from "@/components/store/EditorialPages";
export function generateStaticParams() {
  return articles.map((p) => ({ slug: p.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = articles.find((p) => p.slug === slug);
  if (!item) notFound();
  return <ArticlePage article={item} />;
}
