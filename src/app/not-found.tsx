import { Arrow, ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow text-accent">404 · A little detour</p>
        <h1 className="title mt-6">
          Let’s find your
          <br />
          <em>way home.</em>
        </h1>
        <span className="divider mx-auto mt-6 block" />
        <p className="copy mt-6">
          This corner of Culture doesn’t exist. There’s plenty more to discover.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            Back home
            <Arrow />
          </ButtonLink>
          <ButtonLink href="/services" variant="outline">
            Explore services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
