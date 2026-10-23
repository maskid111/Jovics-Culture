export const dynamicParams = false;
import { notFound, redirect } from "next/navigation";
import { HistoryPage } from "@/components/support";
export function generateStaticParams() {
  return [
    { section: "bookings" },
    { section: "orders" },
    { section: "profile" },
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return {
    title:
      section === "bookings"
        ? "Demo booking history"
        : section === "orders"
          ? "Demo order history"
          : "Demo profile",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section === "profile") redirect("/account");
  if (section !== "bookings" && section !== "orders") notFound();
  return <HistoryPage kind={section} />;
}
