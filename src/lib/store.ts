"use client";

import { useSyncExternalStore } from "react";
import { products } from "./data";

export type CartItem = { slug: string; quantity: number };
export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
};
export type Booking = Customer & {
  id: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  created: string;
};
export type Order = Customer & {
  id: string;
  items: CartItem[];
  total: number;
  created: string;
};
export type Membership = { name: string; email: string; created: string };
export type DemoState = {
  cart: CartItem[];
  bookings: Booking[];
  orders: Order[];
  profile: Customer;
  membership: Membership | null;
};
const INITIAL: DemoState = {
  cart: [],
  bookings: [],
  orders: [],
  profile: { name: "", email: "", phone: "", address: "" },
  membership: null,
};
const KEY = "jovics-culture:demo:v1";
let cached: DemoState = INITIAL;
let previous: string | null | undefined;
let storageAvailable = true;
const listeners = new Set<() => void>();
function read(): DemoState {
  if (typeof window === "undefined") return INITIAL;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw !== previous) {
      previous = raw;
      if (raw) {
        const value = JSON.parse(raw) as Partial<DemoState>;
        cached = {
          cart: Array.isArray(value.cart)
            ? value.cart
                .filter(
                  (i) =>
                    products.some((p) => p.slug === i.slug) &&
                    Number.isInteger(i.quantity) &&
                    i.quantity > 0,
                )
                .map((i) => ({
                  slug: i.slug,
                  quantity: Math.min(99, i.quantity),
                }))
            : [],
          bookings: Array.isArray(value.bookings)
            ? value.bookings.filter(
                (b) =>
                  b &&
                  typeof b.id === "string" &&
                  typeof b.service === "string",
              )
            : [],
          orders: Array.isArray(value.orders)
            ? value.orders.filter(
                (o) =>
                  o &&
                  typeof o.id === "string" &&
                  Array.isArray(o.items) &&
                  Number.isFinite(o.total),
              )
            : [],
          profile: {
            ...INITIAL.profile,
            ...(typeof value.profile === "object" && value.profile
              ? value.profile
              : {}),
          },
          membership:
            value.membership && typeof value.membership.email === "string"
              ? value.membership
              : null,
        };
      } else cached = INITIAL;
    }
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  return cached;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
export function useDemo() {
  return useSyncExternalStore(subscribe, read, () => INITIAL);
}
export function updateDemo(update: (state: DemoState) => DemoState) {
  cached = update(read());
  const raw = JSON.stringify(cached);
  try {
    localStorage.setItem(KEY, raw);
    previous = raw;
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  listeners.forEach((listener) => listener());
}
export const hasStorage = () => storageAvailable;
export function setQuantity(slug: string, quantity: number) {
  updateDemo((state) => ({
    ...state,
    cart:
      quantity <= 0
        ? state.cart.filter((i) => i.slug !== slug)
        : state.cart.some((i) => i.slug === slug)
          ? state.cart.map((i) =>
              i.slug === slug ? { ...i, quantity: Math.min(99, quantity) } : i,
            )
          : [...state.cart, { slug, quantity: Math.min(99, quantity) }],
  }));
}
export function addToCart(slug: string, quantity = 1) {
  setQuantity(
    slug,
    (read().cart.find((i) => i.slug === slug)?.quantity || 0) + quantity,
  );
}
export const cartTotal = (cart: CartItem[]) =>
  cart.reduce(
    (sum, item) =>
      sum +
      (products.find((p) => p.slug === item.slug)?.price || 0) * item.quantity,
    0,
  );
export const reference = (kind: string) =>
  `DEMO-${kind}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
export function clearDemo() {
  updateDemo(() => ({ ...INITIAL, profile: { ...INITIAL.profile } }));
}
