"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  Crown,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { benefits, money, products, services } from "@/lib/data";
import {
  cartTotal,
  hasStorage,
  reference,
  updateDemo,
  useDemo,
  type Booking,
  type Customer,
  type Order,
} from "@/lib/store";
import {
  Arrow,
  ButtonLink,
  CheckList,
  cx,
  DemoNotice,
  EmptyState,
  Modal,
  PageIntro,
  PatternBand,
  Photo,
} from "./ui";

const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
export const displayDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Africa/Lagos",
  }).format(new Date(date.length === 10 ? date + "T12:00:00+01:00" : date));
const blankCustomer: Customer = { name: "", email: "", phone: "", address: "" };
export function CustomerFields({
  value,
  setValue,
}: {
  value: Customer;
  setValue: (value: Customer) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="label">
        Full name
        <input
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className="field"
          value={value.name}
          onChange={(event) => setValue({ ...value, name: event.target.value })}
        />
      </label>
      <label className="label">
        Email address
        <input
          required
          type="email"
          maxLength={150}
          autoComplete="email"
          className="field"
          value={value.email}
          onChange={(event) =>
            setValue({ ...value, email: event.target.value })
          }
        />
      </label>
      <label className="label sm:col-span-2">
        Phone number
        <input
          required
          type="tel"
          minLength={7}
          maxLength={30}
          autoComplete="tel"
          className="field"
          value={value.phone}
          onChange={(event) =>
            setValue({ ...value, phone: event.target.value })
          }
        />
      </label>
      <label className="label sm:col-span-2">
        Address
        <textarea
          required
          minLength={10}
          maxLength={500}
          autoComplete="street-address"
          rows={3}
          className="field resize-y"
          value={value.address}
          onChange={(event) =>
            setValue({ ...value, address: event.target.value })
          }
        />
      </label>
    </div>
  );
}
function Steps({ items, current }: { items: string[]; current: number }) {
  return (
    <ol className="mb-9 grid grid-cols-4 gap-2" aria-label="Journey progress">
      {items.map((item, index) => (
        <li
          key={item}
          aria-current={current === index ? "step" : undefined}
          className={cx(
            "border-t-2 pt-3",
            index <= current ? "border-accent" : "border-line",
          )}
        >
          <span
            className={cx(
              "flex items-center gap-1 text-[10px] font-semibold sm:text-xs",
              index <= current ? "text-forest" : "text-stone",
            )}
          >
            {index < current ? (
              <Check size={12} />
            ) : (
              <span>{"0" + (index + 1)}</span>
            )}
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}
export function BookingPage() {
  const search = useSearchParams();
  const router = useRouter();
  const state = useDemo();
  const [step, setStep] = useState(0);
  const [service, setService] = useState(
    services.some((item) => item.slug === search.get("service"))
      ? search.get("service")!
      : "",
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [customer, setCustomer] = useState<Customer>({ ...blankCustomer });
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const lock = useRef(false);
  const chosen = services.find((item) => item.slug === service);
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (step === 0 && !chosen) {
      setError("Choose a service to continue.");
      return;
    }
    if (step === 1 && (!date || date < today() || !time)) {
      setError("Choose a future or current sample date and a sample time.");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    if (lock.current) return;
    lock.current = true;
    setSaving(true);
    const id = reference("BOOK");
    const booking: Booking = {
      ...customer,
      id,
      service,
      date,
      time,
      notes,
      created: new Date().toISOString(),
    };
    updateDemo((current) => ({
      ...current,
      bookings: [booking, ...current.bookings],
    }));
    router.push("/booking-confirmation?id=" + id);
  }
  return (
    <>
      <PageIntro
        eyebrow="Jovic’s Culture Services"
        title="Make room for a fresh start."
        description="Tell us what your space needs. Explore the journey with a demonstration booking."
      />
      <section className="container-x pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.45fr_1fr]">
          <div className="rounded-3xl border border-line bg-white p-5 sm:p-8">
            <Steps
              items={["Service", "Schedule", "Details", "Review"]}
              current={step}
            />
            <form onSubmit={next}>
              {step === 0 && (
                <fieldset>
                  <legend className="mb-2 font-display text-2xl text-forest">
                    What can we care for?
                  </legend>
                  <p className="mb-6 text-xs leading-relaxed text-stone">
                    Choose a service. You can describe additional tasks in your
                    notes.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((item) => (
                      <label
                        key={item.slug}
                        className={cx(
                          "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
                          service === item.slug
                            ? "border-accent bg-mint/50"
                            : "border-line hover:bg-sand/40",
                        )}
                      >
                        <input
                          required
                          type="radio"
                          name="service"
                          value={item.slug}
                          checked={service === item.slug}
                          onChange={() => setService(item.slug)}
                          className="mt-1 accent-accent"
                        />
                        <span>
                          <strong className="block text-sm font-semibold text-forest">
                            {item.name}
                          </strong>
                          <span className="mt-2 block text-[11px] leading-relaxed text-stone">
                            {item.short}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl text-forest">When would suit you?</h2>
                  <p className="mt-3 mb-7 text-xs leading-relaxed text-stone">
                    These are sample scheduling options, not live availability.
                    Times shown in West Africa Time (Lagos, UTC+1).
                  </p>
                  <label className="label">
                    Preferred sample date
                    <input
                      type="date"
                      required
                      min={today()}
                      className="field"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </label>
                  <fieldset className="mt-6">
                    <legend className="mb-3 text-xs font-semibold">
                      Preferred sample time
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {["09:00 – 12:00", "12:00 – 15:00", "15:00 – 18:00"].map(
                        (slot) => (
                          <label
                            key={slot}
                            className={cx(
                              "flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-xs",
                              time === slot
                                ? "border-accent bg-mint"
                                : "border-line",
                            )}
                          >
                            <input
                              type="radio"
                              name="time"
                              value={slot}
                              required
                              checked={time === slot}
                              onChange={() => setTime(slot)}
                              className="accent-accent"
                            />
                            {slot}
                          </label>
                        ),
                      )}
                    </div>
                  </fieldset>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="mb-3 text-2xl text-forest">
                    A little about you & your space.
                  </h2>
                  <p className="mb-6 text-xs leading-relaxed text-stone">
                    Use sample details for this demonstration. These details are
                    saved only in this browser.
                  </p>
                  {state.profile.name && (
                    <button
                      type="button"
                      className="btn btn-outline mb-6 !text-xs"
                      onClick={() => setCustomer({ ...state.profile })}
                    >
                      Use my demo profile
                    </button>
                  )}
                  <CustomerFields value={customer} setValue={setCustomer} />
                  <label className="label mt-5">
                    Special instructions{" "}
                    <span className="-mt-1 text-[10px] font-normal text-stone">
                      Optional · rooms, additional tasks, garment needs or scent
                      preferences
                    </span>
                    <textarea
                      maxLength={1500}
                      className="field"
                      rows={4}
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                    />
                  </label>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl text-forest">One last look.</h2>
                  <p className="mt-3 text-xs leading-relaxed text-stone">
                    Review your demo booking. No appointment will be reserved.
                  </p>
                  <div className="mt-6 space-y-5">
                    <ReviewRow title="Your care" value={chosen!.name} />
                    <ReviewRow
                      title="Sample schedule"
                      value={displayDate(date) + " · " + time + " WAT"}
                    />
                    <ReviewRow
                      title="Your details"
                      value={
                        customer.name +
                        " · " +
                        customer.email +
                        " · " +
                        customer.phone
                      }
                    />
                    <ReviewRow title="Address" value={customer.address} />
                    {notes && <ReviewRow title="Your notes" value={notes} />}
                  </div>
                  <DemoNotice className="mt-6">
                    No service price has been confirmed. This saves a local
                    demonstration record only. Nothing is sent to Jovic’s
                    Culture.
                  </DemoNotice>
                  <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed">
                    <input
                      required
                      type="checkbox"
                      className="mt-0.5 accent-accent"
                    />
                    I understand this is a demonstration, not a confirmed
                    booking.
                  </label>
                </div>
              )}
              {error && (
                <p role="alert" className="mt-4 text-sm text-red-800">
                  {error}
                </p>
              )}
              <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
                {step > 0 ? (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setStep(step - 1);
                      setError("");
                    }}
                  >
                    <ChevronLeft size={15} />
                    Back
                  </button>
                ) : (
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-stone"
                  >
                    Explore services
                  </Link>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {step === 3
                    ? saving
                      ? "Saving demo…"
                      : "Save demo booking"
                    : "Continue"}
                  <Arrow />
                </button>
              </div>
            </form>
          </div>
          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-sand p-7">
              <span className="grid size-12 place-items-center rounded-full bg-forest text-cream">
                <CalendarDays size={22} />
              </span>
              <h2 className="mt-5 text-2xl text-forest">
                Your care, your way.
              </h2>
              <p className="copy mt-4 text-sm">
                {chosen
                  ? chosen.description
                  : "Choose your service to begin. We’ll walk you through a sample schedule and the details of your space."}
              </p>
              {chosen && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="eyebrow text-accent">Selected service</p>
                  <p className="mt-3 text-sm font-semibold">{chosen.name}</p>
                  {date && (
                    <p className="mt-2 text-xs text-stone">
                      {displayDate(date)}
                    </p>
                  )}
                </div>
              )}
              <p className="mt-6 text-xs leading-relaxed text-stone">
                Prices, service area and real appointment times require
                confirmation.
              </p>
            </div>
            <DemoNotice />
          </aside>
        </div>
      </section>
    </>
  );
}
export function ReviewRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="border-b border-line pb-4">
      <p className="text-[10px] font-semibold tracking-wide text-stone uppercase">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed break-words whitespace-pre-wrap text-forest">
        {value}
      </p>
    </div>
  );
}
export function CulturePlusPage() {
  const { membership } = useDemo();
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  return (
    <>
      <section className="container-x pt-6">
        <PatternBand
          eyebrow="Culture Plus™ · Membership & loyalty"
          title="A little more care. A little more Culture."
          image="bedroom"
          actions={
            <button
              onClick={() => {
                setOpen(true);
                setSaved(false);
                setReview(false);
              }}
              className="btn btn-cream btn-lg"
            >
              {membership ? "View demo membership" : "Explore demo enrolment"}
              <Crown size={17} />
            </button>
          }
        >
          Your home has its own rhythm. Discover a membership and VIP programme
          designed to bring more thoughtful benefits to your everyday.
        </PatternBand>
      </section>
      <section className="container-x section">
        <div className="max-w-xl">
          <p className="eyebrow text-accent">The Culture Plus experience</p>
          <h1 className="mt-4 text-4xl leading-tight text-forest sm:text-5xl">
            Considered benefits.
            <br />
            <em>A more personal touch.</em>
          </h1>
          <p className="copy mt-5">
            Explore the proposed benefits of belonging. Programme fees,
            eligibility, availability and detailed terms are still to be
            confirmed.
          </p>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="border-t border-line pt-6">
              <span className="text-xs font-semibold text-accent">
                {"0" + (index + 1)}
              </span>
              <h2 className="mt-4 text-2xl text-forest">{benefit.title}</h2>
              <p className="copy mt-3 text-sm">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container-x section section-last">
        <div className="rounded-3xl border border-line bg-white p-7 sm:p-10">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow text-accent">
                Where everyday care becomes a culture
              </p>
              <h2 className="mt-3 text-3xl text-forest">
                Get to know Culture Plus™.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone">
                Try the enrolment experience. No fees are charged and no real
                membership is activated.
              </p>
            </div>
            <button
              className="btn btn-primary shrink-0"
              onClick={() => {
                setOpen(true);
                setSaved(false);
                setReview(false);
              }}
            >
              Preview membership
              <Arrow />
            </button>
          </div>
          <DemoNotice className="mt-7">
            Benefits are supplied programme concepts. No discount amounts,
            service entitlements or complimentary upgrade conditions have been
            confirmed.
          </DemoNotice>
        </div>
      </section>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Welcome to a little more"
      >
        {membership || saved ? (
          <div>
            <Crown size={36} className="text-accent" />
            <h3 className="mt-4 text-2xl text-forest">
              Your demo Culture Plus profile.
            </h3>
            <p className="copy mt-4 text-sm">
              {membership?.name || name} · {membership?.email || email}
            </p>
            <DemoNotice className="mt-5">
              {hasStorage()
                ? "Demo enrolment saved in this browser."
                : "Storage unavailable. Demo enrolment kept for this visit."}{" "}
              No real membership has been activated. Benefits and fees require
              confirmation.
            </DemoNotice>
            <ButtonLink href="/account" className="mt-6">
              View demo profile
              <Arrow />
            </ButtonLink>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!review) {
                setReview(true);
                return;
              }
              updateDemo((current) => ({
                ...current,
                membership: { name, email, created: new Date().toISOString() },
              }));
              setSaved(true);
            }}
          >
            {!review ? (
              <>
                <p className="copy mb-6 text-sm">
                  Try the membership journey with sample details. Your demo
                  enrolment stays in this browser.
                </p>
                <label className="label">
                  Full name
                  <input
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    className="field"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
                <label className="label mt-5">
                  Email address
                  <input
                    required
                    autoComplete="email"
                    maxLength={150}
                    type="email"
                    className="field"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
              </>
            ) : (
              <>
                <h3 className="text-2xl text-forest">
                  Your Culture Plus preview
                </h3>
                <p className="mt-4 text-sm">
                  {name}
                  <br />
                  {email}
                </p>
                <div className="mt-6">
                  <CheckList items={benefits.map((benefit) => benefit.title)} />
                </div>
                <DemoNotice className="mt-6">
                  No real enrolment, fee or benefit activation. The final
                  programme terms are not yet supplied.
                </DemoNotice>
                <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed">
                  <input
                    required
                    type="checkbox"
                    className="mt-0.5 accent-accent"
                  />
                  I understand this is a demo enrolment only.
                </label>
              </>
            )}
            <div className="mt-7 flex gap-3">
              {review && (
                <button
                  type="button"
                  onClick={() => setReview(false)}
                  className="btn btn-outline"
                >
                  Edit details
                </button>
              )}
              <button className="btn btn-primary flex-1" type="submit">
                {review ? "Save demo enrolment" : "Review demo enrolment"}
                <Arrow />
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
export function CheckoutPage() {
  const { cart, profile } = useDemo();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>({ ...blankCustomer });
  const [review, setReview] = useState(false);
  const [saving, setSaving] = useState(false);
  const lock = useRef(false);
  const total = cartTotal(cart);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!review) {
      setReview(true);
      return;
    }
    if (lock.current || !cart.length) return;
    lock.current = true;
    setSaving(true);
    const id = reference("ORDER");
    const order: Order = {
      ...customer,
      id,
      items: cart.map((item) => ({ ...item })),
      total,
      created: new Date().toISOString(),
    };
    updateDemo((state) => ({
      ...state,
      orders: [order, ...state.orders],
      cart: [],
    }));
    router.push("/order-confirmation?id=" + id);
  }
  return (
    <>
      <PageIntro
        eyebrow="Jovic’s Mart · Demo checkout"
        title={
          review
            ? "One last look at your essentials."
            : "A few details. A little closer."
        }
        description="Explore checkout without entering payment information or placing a real order."
      />
      <section className="container-x pb-20">
        {cart.length ? (
          <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
            <form
              onSubmit={submit}
              className="rounded-3xl border border-line bg-white p-5 sm:p-8"
            >
              {!review ? (
                <>
                  <h2 className="text-2xl text-forest">
                    Your sample delivery details
                  </h2>
                  <p className="mt-3 mb-6 text-xs leading-relaxed text-stone">
                    Use sample details. Delivery is not arranged by this
                    demonstration.
                  </p>
                  {profile.name && (
                    <button
                      type="button"
                      className="btn btn-outline mb-6"
                      onClick={() => setCustomer({ ...profile })}
                    >
                      Use demo profile
                    </button>
                  )}
                  <CustomerFields value={customer} setValue={setCustomer} />
                  <DemoNotice className="mt-6">
                    There is no payment step. Shipping, tax, availability and
                    delivery policies are unconfirmed.
                  </DemoNotice>
                </>
              ) : (
                <>
                  <h2 className="mb-6 text-2xl text-forest">
                    Review demo order
                  </h2>
                  <div className="space-y-5">
                    <ReviewRow
                      title="Contact details"
                      value={
                        customer.name +
                        " · " +
                        customer.email +
                        " · " +
                        customer.phone
                      }
                    />
                    <ReviewRow
                      title="Sample delivery address"
                      value={customer.address}
                    />
                    <ReviewRow
                      title="Sample product subtotal"
                      value={money(total)}
                    />
                  </div>
                  <DemoNotice className="mt-6">
                    Saving creates a local demo record, empties your demo bag
                    and does not send an order. No payment or delivery occurs.
                    Shipping and taxes are excluded.
                  </DemoNotice>
                  <label className="mt-6 flex items-start gap-3 text-xs leading-relaxed">
                    <input
                      required
                      type="checkbox"
                      className="mt-0.5 accent-accent"
                    />
                    I understand this is a demonstration with sample prices.
                  </label>
                </>
              )}
              <div className="mt-8 flex items-center justify-between gap-3">
                {review ? (
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => setReview(false)}
                  >
                    Edit details
                  </button>
                ) : (
                  <Link
                    href="/cart"
                    className="text-xs font-semibold text-stone"
                  >
                    Back to bag
                  </Link>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {review
                    ? saving
                      ? "Saving demo…"
                      : "Save demo order"
                    : "Review demo order"}
                  <Arrow />
                </button>
              </div>
            </form>
            <aside className="rounded-3xl bg-sand p-6 lg:sticky lg:top-28">
              <h2 className="text-2xl text-forest">
                A little collection for home.
              </h2>
              <div className="mt-5 divide-y divide-line">
                {cart.map((item) => {
                  const product = products.find((p) => p.slug === item.slug)!;
                  return (
                    <div
                      className="flex items-center gap-3 py-4"
                      key={item.slug}
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                        <Photo
                          name={product.image}
                          alt={product.name}
                          sizes="56px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-forest">
                          {product.name}
                        </p>
                        <p className="mt-1 text-[10px] text-stone">
                          Qty {item.quantity} · Sample price
                        </p>
                      </div>
                      <span className="text-xs font-semibold">
                        {money(product.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex justify-between border-t border-line pt-5 text-lg text-forest">
                <span>Sample total</span>
                <strong>{money(total)}</strong>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-stone">
                Product subtotal only. No shipping or tax calculated.
              </p>
              <Link
                href="/cart"
                className="mt-6 inline-block text-xs font-semibold text-accent underline"
              >
                Edit your bag
              </Link>
            </aside>
          </div>
        ) : saving ? (
          <p className="py-10 text-stone">Opening your demo confirmation…</p>
        ) : (
          <EmptyState
            title="Your bag is waiting for a little care."
            description="Add an essential from the Mart before exploring demo checkout."
            href="/mart"
            action="Explore the Mart"
          />
        )}
      </section>
    </>
  );
}
export function ConfirmationPage({ kind }: { kind: "booking" | "order" }) {
  const params = useSearchParams();
  const state = useDemo();
  const id = params.get("id");
  const booking =
    kind === "booking"
      ? state.bookings.find((item) => item.id === id)
      : undefined;
  const order =
    kind === "order" ? state.orders.find((item) => item.id === id) : undefined;
  const record = booking || order;
  return (
    <>
      <PageIntro
        eyebrow="A thoughtful preview"
        title={
          kind === "booking" ? "Your demo care plan." : "Your demo collection."
        }
      />
      <section className="container-x pb-20">
        {record ? (
          <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-white p-6 sm:p-10">
            <span className="grid size-16 place-items-center rounded-full bg-mint text-accent">
              <CheckCircle2 size={30} />
            </span>
            <h2 className="mt-6 text-3xl text-forest">Demo {kind} saved.</h2>
            <p className="copy mt-4 text-sm">
              Thank you, {record.name}.{" "}
              {hasStorage()
                ? "Your demonstration record is saved in this browser only."
                : "Browser storage is unavailable; your record is available for this visit only."}
            </p>
            <p className="mt-4 break-all rounded-lg bg-sand px-3 py-2 font-mono text-xs">
              {record.id}
            </p>
            <DemoNotice className="mt-6">
              {kind === "booking"
                ? "No real booking was sent and no appointment is reserved. This is not a service confirmation."
                : "No order was sent, no payment was taken and no delivery is arranged. This is not a purchase receipt."}
            </DemoNotice>
            <div className="mt-7 space-y-5">
              {booking && (
                <>
                  <ReviewRow
                    title="Service"
                    value={
                      services.find(
                        (service) => service.slug === booking.service,
                      )?.name || booking.service
                    }
                  />
                  <ReviewRow
                    title="Sample date and time"
                    value={
                      displayDate(booking.date) + " · " + booking.time + " WAT"
                    }
                  />
                  {booking.notes && (
                    <ReviewRow
                      title="Special instructions"
                      value={booking.notes}
                    />
                  )}
                </>
              )}
              {order && (
                <>
                  <div>
                    <p className="eyebrow text-stone">Sample essentials</p>
                    {order.items.map((item) => (
                      <p key={item.slug} className="mt-3 text-sm">
                        {products.find((product) => product.slug === item.slug)
                          ?.name || item.slug}{" "}
                        × {item.quantity}
                      </p>
                    ))}
                  </div>
                  <ReviewRow
                    title="Sample total · shipping and tax not calculated"
                    value={money(order.total)}
                  />
                </>
              )}
              <ReviewRow
                title="Customer"
                value={
                  record.name + " · " + record.email + " · " + record.phone
                }
              />
              <ReviewRow title="Sample address" value={record.address} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={
                  kind === "booking" ? "/account/bookings" : "/account/orders"
                }
              >
                View demo history
                <Arrow />
              </ButtonLink>
              <ButtonLink
                href={kind === "booking" ? "/services" : "/mart"}
                variant="outline"
              >
                Keep exploring
              </ButtonLink>
            </div>
          </div>
        ) : (
          <EmptyState
            title={"No demo " + kind + " selected."}
            description="Open a saved record from your demo history, or begin a new journey."
            href={kind === "booking" ? "/account/bookings" : "/account/orders"}
            action="View demo history"
          />
        )}
      </section>
    </>
  );
}
