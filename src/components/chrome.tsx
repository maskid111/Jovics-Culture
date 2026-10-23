"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Crown,
  House,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation, products, services } from "@/lib/data";
import { useDemo } from "@/lib/store";
import { Arrow, ButtonLink, cx, Modal, Wordmark } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const state = useDemo();
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const overHero = pathname === "/" && !scrolled;
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setSearch((value) => !value);
      }
    };
    window.addEventListener("keydown", shortcut);
    const openMenu = () => setMenu(true);
    window.addEventListener("jovic:menu", openMenu);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", shortcut);
      window.removeEventListener("jovic:menu", openMenu);
    };
  }, []);
  return (
    <>
      <header
        className={cx(
          "site-header inset-x-0 top-0 z-40 transition-colors duration-300",
          pathname === "/" ? "fixed" : "sticky",
          overHero
            ? "bg-transparent text-cream"
            : "border-b border-line/70 bg-canvas/95 text-forest backdrop-blur-lg",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-3 sm:px-6 lg:h-[76px] lg:gap-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            className={cx("icon-btn -ml-2", !overHero && "lg:hidden")}
          >
            <Menu size={23} />
          </button>
          <Link href="/" aria-label="Jovic’s Culture home" className="shrink-0">
            <Wordmark light={overHero} />
          </Link>
          <nav
            aria-label="Main navigation"
            className={cx(
              "ml-auto hidden items-center gap-1",
              !overHero && "lg:flex",
            )}
          >
            {navigation.map((item) =>
              item.href === "/services" ? (
                <ServicesDropdown key={item.href} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    pathname.startsWith(item.href) ? "page" : undefined
                  }
                  className="relative rounded-full px-3 py-3 text-[.8rem] font-semibold hover:bg-mint"
                >
                  {item.label}
                  {pathname.startsWith(item.href) && (
                    <span className="absolute inset-x-4 bottom-1 h-0.5 bg-spark" />
                  )}
                </Link>
              ),
            )}
          </nav>
          <div className="ml-auto flex items-center gap-0.5 lg:gap-1">
            <button
              type="button"
              onClick={() => setSearch(true)}
              aria-label="Search website"
              className="icon-btn"
            >
              <Search size={19} />
            </button>
            <Link
              href="/account"
              aria-label="Demo account"
              className="icon-btn max-sm:hidden"
            >
              <UserRound size={19} />
            </Link>
            <Link
              href="/cart"
              aria-label={
                "Cart (" + count + (count === 1 ? " item)" : " items)")
              }
              className="icon-btn relative"
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] leading-[18px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <Link
              href="/book"
              className={cx(
                "btn ml-3 hidden lg:inline-flex",
                overHero ? "btn-cream" : "btn-forest",
              )}
            >
              Book a service
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>
      <Modal
        open={menu}
        onClose={() => setMenu(false)}
        title="Explore Jovic’s Culture"
        drawer
      >
        <Link href="/" onClick={() => setMenu(false)} className="mb-8 block">
          <Wordmark />
        </Link>
        <nav aria-label="Full navigation" className="space-y-1">
          {[
            { href: "/", label: "Home" },
            ...navigation,
            { href: "/book", label: "Book a service" },
            { href: "/account/bookings", label: "My demo bookings" },
            { href: "/account/orders", label: "My demo orders" },
            { href: "/account", label: "Demo profile" },
            { href: "/contact", label: "Contact" },
            { href: "/faqs", label: "Help & FAQs" },
          ].map((item) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setMenu(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cx(
                "flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium",
                pathname === item.href
                  ? "bg-sand text-forest"
                  : "hover:bg-sand/60",
              )}
            >
              {item.label}
              <ChevronRight size={16} />
            </Link>
          ))}
        </nav>
        <Link
          href="/culture-plus"
          onClick={() => setMenu(false)}
          className="pattern mt-6 flex items-center gap-3 rounded-2xl p-5 text-cream"
        >
          <Crown size={22} />
          <div className="flex-1">
            <strong className="block text-sm">A little more Culture.</strong>
            <span className="text-xs text-cream/75">
              Discover Culture Plus™
            </span>
          </div>
          <Arrow />
        </Link>
      </Modal>
      <SearchModal open={search} close={() => setSearch(false)} />
    </>
  );
}
function ServicesDropdown() {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      ref={ref}
      className="group relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && ref.current) ref.current.open = false;
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget) && ref.current)
          ref.current.open = false;
      }}
    >
      <summary className="flex list-none items-center gap-1 rounded-full px-3 py-3 text-[.8rem] font-semibold hover:bg-mint">
        Our services
        <ChevronDown size={13} />
      </summary>
      <div className="absolute top-full left-0 w-72 rounded-2xl border border-line bg-paper p-2 shadow-lift">
        <Link
          href="/services"
          onClick={() => {
            if (ref.current) ref.current.open = false;
          }}
          className="block rounded-xl px-4 py-3 text-sm font-bold hover:bg-sand"
        >
          Explore all services
          <ArrowRight size={14} className="float-right" />
        </Link>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={"/services/" + service.slug}
            onClick={() => {
              if (ref.current) ref.current.open = false;
            }}
            className="block rounded-xl px-4 py-2.5 text-sm hover:bg-sand"
          >
            {service.name}
          </Link>
        ))}
      </div>
    </details>
  );
}
function SearchModal({ open, close }: { open: boolean; close: () => void }) {
  const [query, setQuery] = useState("");
  const all = [
    ...services.map((item) => ({
      name: item.name,
      type: "Service",
      href: "/services/" + item.slug,
      text: item.includes.join(" "),
    })),
    ...products.map((item) => ({
      name: item.name,
      type: "Mart",
      href: "/mart/" + item.slug,
      text: item.category,
    })),
    {
      name: "Culture Plus™ membership",
      type: "Membership",
      href: "/culture-plus",
      text: "loyalty vip benefits",
    },
    {
      name: "Contact & enquiries",
      type: "Help",
      href: "/contact",
      text: "contact question",
    },
  ];
  const results = all.filter((item) =>
    (item.name + " " + item.text)
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <Modal open={open} onClose={close} title="Find your everyday care">
      <label className="label">
        <span className="sr-only">Search services and products</span>
        <div className="relative">
          <Search size={19} className="absolute top-4 left-4 text-stone" />
          <input
            className="field !pl-12"
            autoFocus
            placeholder="Try cleaning, candles or garment care…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </label>
      <p className="mt-4 text-xs text-stone" aria-live="polite">
        {query
          ? results.length + (results.length === 1 ? " result" : " results")
          : "Explore services, essentials & more"}
      </p>
      <div className="mt-3 max-h-[50dvh] space-y-1 overflow-y-auto">
        {results.length ? (
          results.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                close();
                setQuery("");
              }}
              className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-sand"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-accent">
                {item.type === "Mart" ? (
                  <ShoppingBag size={16} />
                ) : (
                  <Sparkles size={16} />
                )}
              </span>
              <span className="flex-1 text-sm font-semibold">
                {item.name}
                <span className="mt-1 block text-[10px] font-normal text-stone">
                  {item.type}
                </span>
              </span>
              <Arrow />
            </Link>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-stone">
            No matches. Try “cleaning”, “home” or “candle”.
          </p>
        )}
      </div>
    </Modal>
  );
}
export function BottomNav() {
  const path = usePathname();
  const items = [
    { href: "/", label: "Home", icon: House },
    { href: "/services", label: "Services", icon: Sparkles },
    { href: "/mart", label: "Mart", icon: ShoppingBag },
    { href: "/culture-plus", label: "Plus", icon: Crown },
  ];
  return (
    <nav
      aria-label="Mobile quick links"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden"
    >
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cx(
                "relative flex flex-col items-center justify-center gap-1 text-[10px] font-semibold",
                active ? "text-forest" : "text-stone",
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.7} />
              {label}
              {active && (
                <span className="absolute bottom-1 h-0.5 w-5 rounded-full bg-spark" />
              )}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("jovic:menu"))}
          className="flex flex-col items-center justify-center gap-1 text-[10px] font-semibold text-stone"
        >
          <Menu size={20} />
          Menu
        </button>
      </div>
    </nav>
  );
}
export function SiteFooter() {
  const columns = [
    {
      title: "Your home",
      links: [
        { href: "/services", label: "Our services" },
        { href: "/book", label: "Book a service" },
        { href: "/culture-plus", label: "Culture Plus™" },
        { href: "/mart", label: "Jovic’s Mart" },
      ],
    },
    {
      title: "Jovic’s Culture",
      links: [
        { href: "/about", label: "Our story" },
        { href: "/contact", label: "Contact us" },
        { href: "/faqs", label: "FAQs" },
      ],
    },
    {
      title: "Your space",
      links: [
        { href: "/account", label: "Demo profile" },
        { href: "/account/bookings", label: "Booking history" },
        { href: "/account/orders", label: "Order history" },
        { href: "/cart", label: "Shopping bag" },
      ],
    },
  ];
  return (
    <footer className="pattern text-cream">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" aria-label="Jovic’s Culture home">
              <Wordmark light />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              Thoughtful care for your home, your wardrobe and your everyday.
              Rooted in culture. Made for living.
            </p>
            <div className="mt-7">
              <ButtonLink href="/book" variant="ghost">
                Make room for a fresh start
                <Arrow />
              </ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="eyebrow text-leaf">{column.title}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-cream/75 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 pt-6 text-[10px] leading-relaxed text-cream/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Jovic’s Culture. Where Hygiene Meets
            Heritage.
          </p>
          <p className="max-w-sm">
            Frontend demonstration · Sample products & prices · No real
            bookings, payments or orders.
          </p>
        </div>
      </div>
    </footer>
  );
}
export function StorageStatus({ message }: { message: string }) {
  return (
    <p role="status" className="flex items-center gap-2 text-sm text-accent">
      <Check size={16} />
      {message}
    </p>
  );
}
export function BookingShortcut() {
  return (
    <ButtonLink href="/book">
      Book a service
      <CalendarDays size={16} />
    </ButtonLink>
  );
}
