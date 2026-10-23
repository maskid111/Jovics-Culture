"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Crown,
  Flower2,
  House,
  Leaf,
  Shirt,
  ShoppingBag,
  Sparkles,
  SprayCan,
} from "lucide-react";
import { services, products } from "@/lib/data";
import {
  Arrow,
  ButtonLink,
  CheckList,
  PatternBand,
  Photo,
  Reveal,
  SectionHeading,
  ServiceCard,
} from "./ui";
import { ProductCard } from "./shop";

export function HomePage() {
  const icons = [SprayCan, Sparkles, House, Leaf, Shirt, Flower2];
  return (
    <>
      <section className="relative isolate flex h-[calc(100svh-64px-env(safe-area-inset-bottom))] min-h-[30rem] items-end overflow-hidden text-white lg:h-svh lg:min-h-[36rem]">
        <Photo
          name="living"
          alt="A calm, sunlit living room with natural textures and considered details"
          priority
          sizes="100vw"
          className="-z-20 object-[62%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/85 via-forest-deep/45 to-forest-deep/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/70 via-transparent to-forest-deep/20" />
        <div className="container-x pt-40 pb-12 sm:pb-16 lg:pb-16">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3 text-cream/85">
              <span className="h-px w-7 bg-spark" />A culture of considered care
            </p>
            <h1 className="max-w-[15ch] text-[2.55rem] leading-[1.02] font-medium tracking-[-.02em] text-balance sm:text-6xl lg:text-[4.75rem]">
              Where Hygiene
              <br />
              Meets <em className="font-normal">Heritage.</em>
            </h1>
            <p className="mt-6 max-w-[27rem] text-sm leading-relaxed text-cream/85 sm:text-base">
              A fresher home. A lighter wardrobe. A little more time for you.
              Welcome to the Jovic’s way of living.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book" variant="cream" large>
                Book a service
                <Arrow />
              </ButtonLink>
              <ButtonLink href="/mart" variant="ghost" large>
                Discover Jovic’s Mart
                <ShoppingBag size={17} />
              </ButtonLink>
            </div>
          </Reveal>
          <div className="mt-12 flex items-center justify-between border-t border-cream/20 pt-5 lg:mt-16">
            <p className="text-[9px] font-semibold tracking-[.17em] text-cream/70 uppercase sm:text-[10px]">
              Home care · Garment care · Everyday living
            </p>
            <a
              href="#care"
              aria-label="Discover our services"
              className="icon-btn border border-cream/30"
            >
              <ArrowDown size={17} />
            </a>
          </div>
        </div>
      </section>
      <section id="care" className="container-x section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-accent">The things that make a home</p>
          <h2 className="mt-4 font-display text-3xl leading-tight font-medium text-balance text-forest sm:text-[2.8rem]">
            Care for your space.
            <br />
            <em>Room for your life.</em>
          </h2>
          <span className="divider mx-auto mt-6 block" />
          <p className="copy mx-auto mt-5 max-w-lg text-sm">
            From a fresh start to the finishing touches, find thoughtful
            services for the way you live.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:mt-12">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <Link
                href={"/services/" + service.slug}
                key={service.slug}
                className="group flex flex-col items-center rounded-2xl px-2 py-5 text-center transition-colors hover:bg-white"
              >
                <span className="grid size-12 place-items-center rounded-full bg-forest text-cream transition-transform group-hover:-translate-y-1">
                  <Icon size={21} strokeWidth={1.6} />
                </span>
                <span className="mt-3 max-w-[8rem] text-[11px] leading-relaxed font-semibold text-forest">
                  {service.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="container-x section">
        <SectionHeading
          title="A little care goes a long way."
          subtitle="Start with the service your home needs today."
          href="/services"
          linkLabel="All services"
        />
        <Reveal className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </Reveal>
      </section>
      <section className="container-x section">
        <Reveal>
          <PatternBand
            eyebrow="Culture Plus™"
            title="Good living comes with a little more."
            image="bedroom"
            actions={
              <>
                <ButtonLink href="/culture-plus" variant="cream">
                  Discover your benefits
                  <Crown size={16} />
                </ButtonLink>
              </>
            }
          >
            A more personal way to care for your home. Explore priority booking,
            preferred pricing and thoughtful member benefits with Culture Plus™.
          </PatternBand>
        </Reveal>
      </section>
      <section className="container-x section">
        <SectionHeading
          title="Everyday essentials. Thoughtfully chosen."
          subtitle="A preview of home-care rituals from Jovic’s Mart. All prices are samples."
          href="/mart"
          linkLabel="Visit the Mart"
        />
        <Reveal className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products
            .filter((product) => product.featured)
            .map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
        </Reveal>
      </section>
      <section className="container-x section">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] sm:aspect-[6/5]">
            <Photo
              name="organisation"
              alt="Warm, natural textures and a carefully arranged home interior"
            />
          </div>
          <div>
            <p className="eyebrow text-accent">More than a clean space</p>
            <h2 className="mt-5 text-4xl leading-[1.1] font-medium text-balance text-forest sm:text-5xl">
              A sense of home.
              <br />
              <em>A way of life.</em>
            </h2>
            <p className="copy mt-6">
              We believe care lives in the details. In a neatly pressed shirt, a
              welcoming room, the quiet comfort of a home that feels like you.
            </p>
            <p className="copy mt-4">
              Jovic’s Culture brings hygiene and heritage together through home
              services, everyday essentials and a more thoughtful approach to
              living.
            </p>
            <div className="mt-7">
              <ButtonLink href="/about" variant="outline">
                Our story
                <Arrow />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="container-x section">
        <SectionHeading title="Your fresh start, made simple." />
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            {
              number: "01",
              title: "Find your care",
              text: "Explore services for your home, wardrobe and everyday routines.",
              icon: Sparkles,
            },
            {
              number: "02",
              title: "Make it personal",
              text: "Choose your preferred day and share the details of your space.",
              icon: CalendarDays,
            },
            {
              number: "03",
              title: "Preview your plan",
              text: "Review and save a demo booking. No real appointment is reserved.",
              icon: House,
            },
          ].map((item) => (
            <div key={item.number} className="border-t border-line pt-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-accent/65">
                  {item.number}
                </span>
                <item.icon
                  size={21}
                  strokeWidth={1.5}
                  className="text-accent"
                />
              </div>
              <h3 className="mt-5 text-2xl text-forest">{item.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-x section section-last">
        <div className="flex flex-col items-start justify-between gap-7 rounded-3xl bg-mint px-7 py-10 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="eyebrow text-accent">Make room for what matters</p>
            <h2 className="mt-3 text-3xl text-forest sm:text-4xl">
              Your home. A fresh perspective.
            </h2>
          </div>
          <ButtonLink href="/book" variant="forest" large>
            Let’s get started
            <ArrowRight size={17} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
export function ServicesPage() {
  return (
    <>
      <header className="container-x pt-10 lg:pt-16">
        <p className="eyebrow text-accent">Jovic’s Culture Services</p>
        <h1 className="title mt-4 max-w-3xl">
          Every space deserves
          <br />
          <em>a little care.</em>
        </h1>
        <p className="copy mt-5 max-w-xl">
          From the everyday reset to a completely fresh start. Explore home
          cleaning, garment care and the details that make a place feel like
          yours.
        </p>
      </header>
      <section className="container-x pt-10 pb-16 lg:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-stone">
          Service descriptions illustrate the proposed scope. Prices,
          availability, timings and final inclusions require confirmation with
          the business.
        </p>
      </section>
      <section className="container-x pb-20">
        <PatternBand
          eyebrow="Start with your space"
          title="Not sure where to begin?"
          actions={
            <ButtonLink href="/contact" variant="cream">
              Let’s talk about your home
              <Arrow />
            </ButtonLink>
          }
        >
          Explore a demo enquiry and tell us what you have in mind. Sometimes,
          the first step is simply knowing what your home needs.
        </PatternBand>
      </section>
    </>
  );
}
export function ServiceDetail({
  service,
}: {
  service: (typeof services)[number];
}) {
  return (
    <>
      <div className="container-x py-5">
        <Link
          href="/services"
          className="text-xs font-semibold text-stone hover:text-accent"
        >
          Services <span className="mx-2">/</span> {service.name}
        </Link>
      </div>
      <section className="container-x">
        <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
            <Photo
              name={service.image}
              alt={service.name + " — illustrative setting"}
              priority
            />
          </div>
          <div>
            <p className="eyebrow text-accent">{service.label}</p>
            <h1 className="title mt-4">{service.name}</h1>
            <p className="mt-4 font-display text-xl italic text-accent">
              {service.short}
            </p>
            <p className="copy mt-5">{service.description}</p>
            <div className="mt-7">
              <ButtonLink href={"/book?service=" + service.slug} large>
                Plan this service
                <Arrow />
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-stone">
              No confirmed price · Demo booking available
            </p>
          </div>
        </div>
      </section>
      <section className="container-x section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              title="Thoughtful care, in the details."
              subtitle="Suggested inclusions to discuss with the team."
            />
            <div className="mt-7">
              <CheckList items={service.includes} />
            </div>
          </div>
          <aside className="rounded-3xl bg-sand p-7 sm:p-9">
            <h2 className="text-2xl text-forest">A good fit for</h2>
            <p className="copy mt-4 text-sm">{service.suited}</p>
            <div className="my-6 h-px bg-line" />
            <h3 className="text-xl text-forest">Before you book</h3>
            <p className="copy mt-3 text-sm">{service.note}</p>
            <p className="copy mt-3 text-sm">
              Service area, prices and appointment availability have not yet
              been provided. This website saves demonstration bookings only.
            </p>
          </aside>
        </div>
      </section>
      <section className="container-x section section-last">
        <SectionHeading
          title="A little more for your everyday."
          href="/services"
          linkLabel="All services"
        />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((item) => item.slug !== service.slug)
            .slice(0, 3)
            .map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
        </div>
      </section>
    </>
  );
}
