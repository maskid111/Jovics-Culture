"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Crown,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { faqs, money, services } from "@/lib/data";
import {
  clearDemo,
  hasStorage,
  updateDemo,
  useDemo,
  type Customer,
} from "@/lib/store";
import {
  Arrow,
  ButtonLink,
  DemoNotice,
  EmptyState,
  Modal,
  PageIntro,
  PatternBand,
  PhotoHero,
  SectionHeading,
} from "./ui";
import { displayDate } from "./journeys";

export function AboutPage() {
  return (
    <>
      <PhotoHero
        eyebrow="The Jovic’s Culture story"
        title="Care is a culture. Home is where it begins."
        description="Where Hygiene Meets Heritage — a thoughtful way to care for the spaces, garments and everyday details that matter."
        image="organisation"
      />
      <section className="container-x section">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-accent">Rooted in the everyday</p>
            <h2 className="mt-5 text-4xl leading-tight text-balance text-forest sm:text-5xl">
              A well-cared-for home.
              <br />
              <em>A little more life.</em>
            </h2>
          </div>
          <div>
            <p className="copy">
              A home is more than the rooms inside it. It is where you find your
              rhythm, welcome your people and return to yourself. We believe the
              care it receives should feel just as personal.
            </p>
            <p className="copy mt-5">
              Jovic’s Culture brings together home cleaning, garment care and
              lifestyle services with a simple idea: everyday care can be
              thoughtful, warm and connected to the way we live.
            </p>
            <p className="copy mt-5">
              Through Jovic’s Culture Services, Culture Plus™ and Jovic’s Mart,
              explore three connected ways to bring that idea home.
            </p>
          </div>
        </div>
      </section>
      <section className="container-x section">
        <SectionHeading title="One culture. Three ways to care." />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Jovic’s Culture Services",
              text: "Home cleaning, garment care and lifestyle services for the everyday and the fresh start.",
              href: "/services",
              icon: Sparkles,
              action: "Explore our services",
            },
            {
              title: "Culture Plus™",
              text: "Membership, loyalty and VIP benefits for a more personal home-care journey.",
              href: "/culture-plus",
              icon: Crown,
              action: "Discover membership",
            },
            {
              title: "Jovic’s Mart",
              text: "Home-care and lifestyle essentials that help you carry the feeling forward.",
              href: "/mart",
              icon: ShoppingBag,
              action: "Explore the Mart",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="card group p-7">
              <span className="grid size-12 place-items-center rounded-full bg-forest text-cream">
                <item.icon size={22} />
              </span>
              <h3 className="mt-6 text-2xl leading-tight text-forest">
                {item.title}
              </h3>
              <p className="copy mt-4 text-sm">{item.text}</p>
              <span className="mt-7 flex items-center gap-2 text-xs font-bold text-accent">
                {item.action}
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container-x section section-last">
        <PatternBand
          eyebrow="Where Hygiene Meets Heritage"
          title="The little things make it yours."
          actions={
            <ButtonLink href="/services" variant="cream">
              Find your everyday care
              <Arrow />
            </ButtonLink>
          }
        >
          A fresh room. A well-kept wardrobe. A considered detail. Discover care
          that fits the way you want to live.
        </PatternBand>
      </section>
    </>
  );
}
export function ContactPage() {
  const [saved, setSaved] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }
  return (
    <>
      <PageIntro
        eyebrow="Let’s start a conversation"
        title="A little care starts here."
        description="Have a question about your home, a service or Culture Plus? Explore the enquiry experience below."
      />
      <section className="container-x pb-20">
        <div className="grid items-start gap-9 lg:grid-cols-[1.3fr_1fr]">
          <form
            onSubmit={submit}
            className="rounded-3xl border border-line bg-white p-6 sm:p-8"
          >
            <h2 className="text-2xl text-forest">
              Tell us what’s on your mind.
            </h2>
            <DemoNotice className="mt-5 mb-6">
              This is a demo enquiry form. Your message is not sent or saved.
              Use sample details.
            </DemoNotice>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="label">
                Your name
                <input
                  className="field"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  name="name"
                />
              </label>
              <label className="label">
                Email address
                <input
                  className="field"
                  type="email"
                  required
                  maxLength={150}
                  autoComplete="email"
                  name="email"
                />
              </label>
              <label className="label sm:col-span-2">
                What would you like to discuss?
                <select className="field" name="topic" required defaultValue="">
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option>Home cleaning</option>
                  <option>Garment care</option>
                  <option>Home Refresh & Extra Tasks</option>
                  <option>Culture Plus™</option>
                  <option>Jovic’s Mart</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="label sm:col-span-2">
                Your message
                <textarea
                  className="field"
                  required
                  minLength={10}
                  maxLength={2000}
                  name="message"
                  rows={5}
                />
              </label>
            </div>
            <button className="btn btn-primary mt-7" type="submit">
              Preview demo enquiry
              <Arrow />
            </button>
          </form>
          <aside className="space-y-6">
            <div className="rounded-3xl bg-sand p-7">
              <h2 className="text-2xl text-forest">Good to know.</h2>
              <p className="copy mt-4 text-sm">
                Official contact details, operating hours and the service area
                are still to be supplied. This preview does not send enquiries
                or offer live customer support.
              </p>
              <div className="mt-6 border-t border-line pt-6">
                <h3 className="text-xl text-forest">
                  Looking for a quick answer?
                </h3>
                <p className="copy mt-3 text-sm">
                  Our FAQs explain the services, the demo experience and what is
                  still to be confirmed.
                </p>
                <Link
                  href="/faqs"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-accent"
                >
                  Explore FAQs
                  <Arrow />
                </Link>
              </div>
            </div>
            <div className="pattern rounded-3xl p-7 text-cream">
              <Crown size={26} className="text-leaf" />
              <h2 className="mt-5 text-2xl">A little more Culture.</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                Get to know the membership benefits of Culture Plus™.
              </p>
              <div className="mt-6">
                <ButtonLink href="/culture-plus" variant="ghost">
                  Explore membership
                  <Arrow />
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <Modal
        open={saved}
        onClose={() => setSaved(false)}
        title="Your demo enquiry preview"
      >
        <span className="grid size-14 place-items-center rounded-full bg-mint text-accent">
          <Check size={25} />
        </span>
        <h3 className="mt-5 text-2xl text-forest">
          You’ve explored the enquiry journey.
        </h3>
        <p className="copy mt-4 text-sm">
          Nothing was sent to Jovic’s Culture. Your message has not been saved,
          and no reply will be generated.
        </p>
        <button
          type="button"
          className="btn btn-primary mt-6"
          onClick={() => setSaved(false)}
        >
          Back to your enquiry
          <Arrow />
        </button>
      </Modal>
    </>
  );
}
export function FaqPage() {
  const [query, setQuery] = useState("");
  const visible = faqs.filter((faq) =>
    (faq.q + " " + faq.a).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="A little clarity"
        title="Questions, thoughtfully answered."
        description="A guide to Jovic’s Culture and this demonstration experience."
      />
      <section className="container-x pb-20">
        <div className="max-w-3xl">
          <label className="relative block">
            <span className="sr-only">Search FAQs</span>
            <Search size={18} className="absolute top-4 left-4 text-stone" />
            <input
              className="field !pl-11"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your questions…"
            />
          </label>
          <p className="mt-4 text-xs text-stone" aria-live="polite">
            {visible.length} answers to explore
          </p>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {visible.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex list-none items-center justify-between gap-4 text-sm font-semibold text-forest">
                  {faq.q}
                  <span
                    className="text-xl font-normal transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="copy pt-4 pr-5 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
          {!visible.length && (
            <div className="py-10">
              <p className="text-sm text-stone">
                No answers match your search.
              </p>
              <button
                className="btn btn-outline mt-4"
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
          <div className="mt-9 rounded-2xl bg-mint p-6">
            <h2 className="text-2xl text-forest">Still curious?</h2>
            <p className="copy mt-3 text-sm">
              Explore the demonstration enquiry form and tell us what you would
              like to know.
            </p>
            <ButtonLink href="/contact" variant="outline" className="mt-5">
              Explore contact
              <Arrow />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
export function AccountPage() {
  const state = useDemo();
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const profile: Customer = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      address: String(form.get("address") || "").trim(),
    };
    updateDemo((current) => ({ ...current, profile }));
    setMessage(
      hasStorage()
        ? "Demo profile saved in this browser."
        : "Browser storage is unavailable. Profile kept for this visit only.",
    );
  }
  return (
    <>
      <PageIntro
        eyebrow="Your little corner"
        title="Make yourself at home."
        description="Your demo profile, care plans and everyday essentials, together in one place."
      />
      <section className="container-x pb-20">
        <DemoNotice>
          No real login or account. Demo information stays in this browser and
          is visible to anyone using this browser profile. Use sample personal
          details.
        </DemoNotice>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
          <form
            onSubmit={save}
            key={JSON.stringify(state.profile)}
            className="rounded-3xl border border-line bg-white p-6 sm:p-8"
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-mint text-accent">
                <UserRound size={21} />
              </span>
              <h2 className="text-2xl text-forest">Your demo profile</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="label">
                Full name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className="field"
                  defaultValue={state.profile.name}
                />
              </label>
              <label className="label">
                Email address
                <input
                  name="email"
                  required
                  type="email"
                  maxLength={150}
                  autoComplete="email"
                  className="field"
                  defaultValue={state.profile.email}
                />
              </label>
              <label className="label sm:col-span-2">
                Phone number <span className="sr-only">optional</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                  className="field"
                  defaultValue={state.profile.phone}
                />
              </label>
              <label className="label sm:col-span-2">
                Address <span className="sr-only">optional</span>
                <textarea
                  name="address"
                  autoComplete="street-address"
                  maxLength={500}
                  rows={3}
                  className="field"
                  defaultValue={state.profile.address}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-6">
              Save demo profile
              <Check size={16} />
            </button>
            {message && (
              <p role="status" className="mt-4 text-xs text-accent">
                {message}
              </p>
            )}
          </form>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  href: "/account/bookings",
                  label: "Demo bookings",
                  count: state.bookings.length,
                  icon: CalendarDays,
                },
                {
                  href: "/account/orders",
                  label: "Demo orders",
                  count: state.orders.length,
                  icon: ShoppingBag,
                },
              ].map((item) => (
                <Link href={item.href} key={item.href} className="card p-5">
                  <item.icon size={22} className="text-accent" />
                  <p className="mt-5 font-display text-4xl text-forest">
                    {item.count}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-stone">
                    {item.label}
                  </p>
                  <ArrowRight size={16} className="mt-4 text-accent" />
                </Link>
              ))}
            </div>
            <div className="pattern rounded-3xl p-7 text-cream">
              <Crown size={26} className="text-leaf" />
              <h2 className="mt-5 text-2xl">Culture Plus™</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                {state.membership
                  ? "Demo enrolment saved for " +
                    state.membership.name +
                    ". No real membership activated."
                  : "Discover membership, loyalty and thoughtful VIP benefits."}
              </p>
              <div className="mt-6">
                <ButtonLink href="/culture-plus" variant="ghost">
                  {state.membership
                    ? "View demo enrolment"
                    : "Explore Culture Plus"}
                  <Arrow />
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <h2 className="text-xl text-forest">A clean slate.</h2>
              <p className="copy mt-3 text-xs">
                Remove this browser’s demo profile, cart, bookings, orders and
                membership. This cannot be undone.
              </p>
              <button
                type="button"
                className="mt-4 text-xs font-semibold text-red-800 underline"
                onClick={() => setConfirm(true)}
              >
                Clear all demo data
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Clear this browser’s demo data?"
      >
        <p className="copy text-sm">
          Your demo profile, bag, booking history, order history and enrolment
          will be removed from this browser. This action cannot be undone.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setConfirm(false)}
          >
            Keep my data
          </button>
          <button
            type="button"
            className="btn bg-red-800 text-white"
            onClick={() => {
              clearDemo();
              setMessage("All demo data cleared from this browser.");
              setConfirm(false);
            }}
          >
            Clear demo data
          </button>
        </div>
      </Modal>
    </>
  );
}
export function HistoryPage({ kind }: { kind: "bookings" | "orders" }) {
  const state = useDemo();
  const records = kind === "bookings" ? state.bookings : state.orders;
  return (
    <>
      <PageIntro
        eyebrow="Your demo history"
        title={
          kind === "bookings"
            ? "Your little plans for home."
            : "Your everyday collections."
        }
        description="Demonstration records saved on this device. Nothing has been submitted to the business."
      />
      <section className="container-x pb-20">
        <div className="mb-7 flex flex-wrap gap-2">
          <ButtonLink href="/account" variant="outline">
            Demo profile
          </ButtonLink>
          <ButtonLink
            href="/account/bookings"
            variant={kind === "bookings" ? "forest" : "outline"}
          >
            Bookings
          </ButtonLink>
          <ButtonLink
            href="/account/orders"
            variant={kind === "orders" ? "forest" : "outline"}
          >
            Orders
          </ButtonLink>
        </div>
        {records.length ? (
          <div className="space-y-4">
            {records.map((record) => {
              const booking = "service" in record ? record : undefined;
              const order = "total" in record ? record : undefined;
              return (
                <article
                  key={record.id}
                  className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-mint text-accent">
                    {booking ? (
                      <CalendarDays size={22} />
                    ) : (
                      <ShoppingBag size={22} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="rounded-full bg-sand px-2.5 py-1 text-[9px] font-semibold text-stone">
                      Demo only · Not submitted
                    </span>
                    <h2 className="mt-3 text-2xl text-forest">
                      {booking
                        ? services.find(
                            (service) => service.slug === booking.service,
                          )?.name || booking.service
                        : order?.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0,
                          ) + " everyday essentials"}
                    </h2>
                    <p className="mt-2 text-xs text-stone">
                      {booking
                        ? displayDate(booking.date) +
                          " · " +
                          booking.time +
                          " WAT"
                        : displayDate(record.created) +
                          " · Sample total " +
                          money(order!.total)}
                    </p>
                    <p className="mt-2 break-all font-mono text-[10px] text-stone">
                      {record.id}
                    </p>
                  </div>
                  <ButtonLink
                    href={
                      "/" +
                      (booking ? "booking" : "order") +
                      "-confirmation?id=" +
                      record.id
                    }
                    variant="outline"
                  >
                    View demo details
                    <Arrow />
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title={
              kind === "bookings"
                ? "Your first fresh start awaits."
                : "A little collection, waiting to happen."
            }
            description={
              kind === "bookings"
                ? "Explore a service and save your first demonstration booking."
                : "Discover a few essentials and try the demonstration checkout."
            }
            href={kind === "bookings" ? "/services" : "/mart"}
            action={
              kind === "bookings" ? "Explore services" : "Explore the Mart"
            }
          />
        )}
      </section>
    </>
  );
}
