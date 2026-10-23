"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Info, Minus, Plus, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { photo, type Service } from "@/lib/data";

export const cx = (...values: (string | false | null | undefined)[]) =>
  values.filter(Boolean).join(" ");
export function ButtonLink({
  href,
  children,
  variant = "primary",
  large = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "cream" | "ghost" | "forest";
  large?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx("btn", "btn-" + variant, large && "btn-lg", className)}
    >
      {children}
    </Link>
  );
}
export function Arrow() {
  return <ArrowRight size={16} aria-hidden="true" />;
}
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={photo(name)}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cx("object-cover", className)}
    />
  );
}
export function Wordmark({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <span
      className={cx(
        "inline-flex flex-col",
        light ? "text-cream" : "text-forest",
      )}
    >
      <span className="font-display text-[1.45rem] leading-none font-medium tracking-[-.055em] sm:text-[1.85rem]">
        Jovic’s Culture
        <span className="ml-1 text-accent" aria-hidden="true">
          ·
        </span>
      </span>
      {!compact && (
        <span className="mt-2 text-[7px] font-semibold tracking-[.14em] uppercase sm:text-[8px] sm:tracking-[.16em]">
          Where Hygiene Meets Heritage
        </span>
      )}
    </span>
  );
}
export function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel = "Explore all",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-[1.45rem] leading-tight font-semibold text-forest sm:text-3xl">
          {title}
        </h2>
        <div className="divider mt-3" />
        {subtitle && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone">
            {subtitle}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 pb-1 text-xs font-bold text-forest sm:text-sm"
        >
          {linkLabel}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="container-x pt-10 pb-8 sm:pt-14 lg:pt-16">
      {eyebrow && <p className="eyebrow mb-4 text-accent">{eyebrow}</p>}
      <h1 className="title max-w-3xl">{title}</h1>
      {description && <p className="copy mt-5 max-w-2xl">{description}</p>}
      {children}
    </header>
  );
}
export function PhotoHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="lg:container-x lg:pt-6">
      <div className="relative isolate flex min-h-80 items-end overflow-hidden rounded-b-[1.75rem] sm:min-h-[26rem] lg:rounded-[2rem]">
        <Photo name={image} alt="" priority className="-z-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/90 via-forest-deep/55 to-forest-deep/10" />
        <div className="w-full p-6 text-cream sm:p-10 lg:p-12">
          <p className="eyebrow text-leaf">{eyebrow}</p>
          <h1 className="mt-4 max-w-2xl text-4xl leading-[1.07] font-medium text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/85 sm:text-base">
            {description}
          </p>
          {children && (
            <div className="mt-7 flex flex-wrap gap-3">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}
export function PatternBand({
  eyebrow,
  title,
  children,
  image,
  actions,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  image?: string;
  actions?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "pattern grid overflow-hidden rounded-[1.5rem] text-cream lg:rounded-[2rem]",
        image && "md:grid-cols-[1.15fr_1fr]",
      )}
    >
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <p className="eyebrow flex items-center gap-2 text-leaf">
          <span className="h-px w-6 bg-leaf" />
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-lg text-4xl leading-[1.08] font-medium text-balance sm:text-5xl">
          {title}
        </h2>
        <div className="mt-5 max-w-lg text-sm leading-relaxed text-cream/80 sm:text-base">
          {children}
        </div>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
      {image && (
        <div className="relative min-h-64 md:min-h-full">
          <Photo name={image} alt="A thoughtful detail in a welcoming home" />
        </div>
      )}
    </div>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reduced ? {} : { y: [12, 0] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card group relative">
      <Link href={"/services/" + service.slug} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Photo
            name={service.image}
            alt={service.name + " — an illustrative home setting"}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          />
          <span className="absolute top-4 left-4 rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-bold text-forest">
            {service.label}
          </span>
        </div>
        <div className="flex items-center gap-3 p-5">
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-forest">
              {service.name}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone">
              {service.short}
            </p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-white">
            <Arrow />
          </span>
        </div>
      </Link>
    </article>
  );
}
export function DemoNotice({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex items-start gap-3 rounded-xl border border-line bg-sand/60 p-4 text-xs leading-relaxed text-stone",
        className,
      )}
    >
      <Info size={16} className="mt-0.5 shrink-0 text-accent" />
      <p>
        {children ||
          "Demonstration only. Nothing is submitted to the business, no payment is taken and no appointment or delivery is arranged."}
      </p>
    </div>
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed">
          <Check size={18} className="mt-0.5 shrink-0 text-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
export function EmptyState({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-line px-6 py-16 text-center">
      <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-mint text-accent">
        <Plus size={24} />
      </span>
      <h2 className="text-3xl text-forest">{title}</h2>
      <p className="mx-auto mt-3 mb-7 max-w-md text-sm leading-relaxed text-stone">
        {description}
      </p>
      <ButtonLink href={href}>
        {action}
        <Arrow />
      </ButtonLink>
    </div>
  );
}
export function Quantity({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (quantity: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex h-11 items-center rounded-full border border-line bg-white">
      <button
        type="button"
        className="icon-btn !size-10"
        disabled={value <= 1}
        aria-label={"Decrease " + label + " quantity"}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span
        className="min-w-8 text-center text-sm font-semibold"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className="icon-btn !size-10"
        disabled={value >= 99}
        aria-label={"Increase " + label + " quantity"}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function Modal({
  open,
  onClose,
  title,
  children,
  drawer = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog
        .querySelector<HTMLElement>('input:not([type="checkbox"])')
        ?.focus();
    }
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cx(
        "fixed max-h-[90dvh] border-0 bg-paper p-0 shadow-2xl",
        drawer
          ? "inset-y-0 left-0 m-0 h-dvh max-h-dvh w-[86%] max-w-sm rounded-r-[1.75rem]"
          : "inset-0 m-auto w-[calc(100%_-_2rem)] max-w-xl rounded-3xl",
      )}
    >
      <motion.div
        initial={false}
        animate={
          open && !reduced
            ? { x: drawer ? [-30, 0] : 0, y: drawer ? 0 : [12, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <div
          className={cx(
            "mb-5 flex items-center justify-between gap-4",
            drawer && "absolute right-4 top-4 z-10",
          )}
        >
          <h2 className={cx("text-2xl text-forest", drawer && "sr-only")}>
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="icon-btn text-forest"
            aria-label={"Close " + title}
          >
            <X size={21} />
          </button>
        </div>
        {open && children}
      </motion.div>
    </dialog>
  );
}
