import { Suspense } from "react";
import { MartPage } from "@/components/shop";
export const metadata = { title: "Jovic’s Mart" };
export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="container-x py-20 text-stone">
          Preparing your everyday essentials…
        </p>
      }
    >
      <MartPage />
    </Suspense>
  );
}
