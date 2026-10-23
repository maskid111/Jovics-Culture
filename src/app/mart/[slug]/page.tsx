export const dynamicParams = false;
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetail } from "@/components/shop";
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      products.find((product) => product.slug === slug)?.name ||
      "Product not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((product) => product.slug === slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
