import type { Metadata } from "next";
import { ServicesPage } from "@/components/home";
export const metadata: Metadata = { title: "Our services" };
export default function Page() {
  return <ServicesPage />;
}
