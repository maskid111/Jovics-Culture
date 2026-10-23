export const dynamicParams = false;
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  BookingPage,
  CheckoutPage,
  ConfirmationPage,
  CulturePlusPage,
} from "@/components/journeys";
import {
  AboutPage,
  AccountPage,
  ContactPage,
  FaqPage,
} from "@/components/support";
import { CartPage } from "@/components/shop";
const pages: Record<string, string> = {
  book: "Book a service",
  "culture-plus": "Culture Plus™",
  about: "Our story",
  contact: "Contact",
  faqs: "Help & FAQs",
  account: "Your demo profile",
  cart: "Your shopping bag",
  checkout: "Demo checkout",
  "booking-confirmation": "Demo booking",
  "order-confirmation": "Demo order",
};
export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return { title: pages[page] || "Page not found" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!pages[page]) notFound();
  const content =
    page === "book" ? (
      <BookingPage />
    ) : page === "culture-plus" ? (
      <CulturePlusPage />
    ) : page === "about" ? (
      <AboutPage />
    ) : page === "contact" ? (
      <ContactPage />
    ) : page === "faqs" ? (
      <FaqPage />
    ) : page === "account" ? (
      <AccountPage />
    ) : page === "cart" ? (
      <CartPage />
    ) : page === "checkout" ? (
      <CheckoutPage />
    ) : (
      <ConfirmationPage
        kind={page === "booking-confirmation" ? "booking" : "order"}
      />
    );
  return (
    <Suspense
      fallback={
        <p className="container-x py-20 text-stone">
          Preparing your little corner of Culture…
        </p>
      }
    >
      {content}
    </Suspense>
  );
}
