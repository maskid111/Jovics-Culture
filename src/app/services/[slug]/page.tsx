export const dynamicParams = false;
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { ServiceDetail } from "@/components/home";
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      services.find((service) => service.slug === slug)?.name ||
      "Service not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((service) => service.slug === slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
