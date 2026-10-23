"use client";

import Link from "next/link";
import {
  Check,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories, money, products, type Product } from "@/lib/data";
import {
  addToCart,
  cartTotal,
  hasStorage,
  setQuantity,
  useDemo,
} from "@/lib/store";
import {
  Arrow,
  ButtonLink,
  DemoNotice,
  EmptyState,
  PageIntro,
  Photo,
  PhotoHero,
  Quantity,
  SectionHeading,
} from "./ui";

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  return (
    <article className="card group">
      <Link href={"/mart/" + product.slug} className="block">
        <div className="relative aspect-square overflow-hidden bg-sand">
          <Photo
            name={product.image}
            alt={product.name + " — concept illustration"}
            sizes="(min-width: 1024px) 280px, 50vw"
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-1 text-[9px] font-semibold text-forest">
            Mart preview
          </span>
        </div>
        <div className="px-3 pt-4 sm:px-5">
          <p className="text-[9px] leading-relaxed font-semibold text-stone">
            {product.category}
          </p>
          <h3 className="mt-2 text-base leading-tight font-semibold text-forest sm:text-xl">
            {product.name}
          </h3>
          <p className="mt-2 text-[10px] text-stone">{product.size}</p>
        </div>
      </Link>
      <div className="flex items-end justify-between gap-1 px-3 pt-4 pb-4 sm:px-5">
        <div>
          <p className="text-sm font-bold text-forest">
            {money(product.price)}
          </p>
          <p className="mt-1 text-[9px] text-stone">Sample price</p>
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(product.slug);
            setAdded(true);
          }}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-white transition-colors hover:bg-forest"
          aria-label={"Add " + product.name + " to cart"}
        >
          {added ? <Check size={17} /> : <Plus size={17} />}
        </button>
      </div>
      {added && (
        <p role="status" className="px-3 pb-3 text-[10px] text-accent sm:px-5">
          {hasStorage()
            ? "Added to your demo bag."
            : "Added for this visit; storage unavailable."}{" "}
          <Link href="/cart" className="underline">
            View bag
          </Link>
        </p>
      )}
    </article>
  );
}
export function MartPage() {
  const params = useSearchParams();
  const initialCategory = params.get("category");
  const [category, setCategory] = useState<string>(
    categories.some((item) => item === initialCategory)
      ? initialCategory!
      : "All",
  );
  const [query, setQuery] = useState(params.get("q") || "");
  const [sort, setSort] = useState("featured");
  const visible = products
    .filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (product.name + " " + product.category + " " + product.description)
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
    )
    .sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : Number(!!b.featured) - Number(!!a.featured),
    );
  return (
    <>
      <PhotoHero
        eyebrow="Jovic’s Mart"
        title="Small essentials. Better everyday living."
        description="Discover home-care rituals, comforting fragrance and thoughtful things for the place you call home."
        image="scent"
      />
      <section className="container-x pt-8 pb-20">
        <DemoNotice>
          Storefront preview. Products, photographs, sizes and prices are
          illustrative. No real stock, payment or delivery is available.
        </DemoNotice>
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
          <label className="relative block sm:w-96">
            <span className="sr-only">Search products</span>
            <Search size={18} className="absolute top-4 left-4 text-stone" />
            <input
              className="field !pl-11"
              placeholder="Search your everyday essentials…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="flex items-center gap-3 text-xs font-semibold text-stone">
            <SlidersHorizontal size={17} />
            Sort by
            <select
              className="field !w-auto !text-xs"
              aria-label="Sort products"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Sample price: low to high</option>
              <option value="price-high">Sample price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>
        <div
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Product categories"
        >
          {["All", ...categories].map((item) => (
            <button
              key={item}
              className="chip"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs text-stone" aria-live="polite">
          {visible.length} {visible.length === 1 ? "essential" : "essentials"}{" "}
          to explore
        </p>
        {visible.length ? (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h2 className="text-3xl text-forest">A fresh search?</h2>
            <p className="mt-4 text-sm text-stone">
              No products match these filters.
            </p>
            <button
              className="btn btn-outline mt-6"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setAmount] = useState(1);
  const [added, setAdded] = useState("");
  return (
    <>
      <div className="container-x py-6 text-xs text-stone">
        <Link href="/mart" className="hover:text-accent">
          Jovic’s Mart
        </Link>
        <span className="mx-2">/</span>
        {product.name}
      </div>
      <section className="container-x">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-sand">
              <Photo
                name={product.image}
                alt={product.name + " — product concept illustration"}
                priority
              />
            </div>
            <p className="mt-3 text-[10px] text-stone">
              Product concept illustration. Final packaging and specifications
              are unconfirmed.
            </p>
          </div>
          <div className="py-3 lg:py-8">
            <Link
              href={"/mart?category=" + encodeURIComponent(product.category)}
              className="eyebrow text-accent"
            >
              {product.category}
            </Link>
            <h1 className="title mt-5 !text-4xl sm:!text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xs text-stone">{product.size}</p>
            <p className="mt-6 text-2xl font-semibold text-forest">
              {money(product.price)}{" "}
              <span className="text-xs font-normal text-stone">
                Sample price
              </span>
            </p>
            <p className="copy mt-5 text-sm">{product.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Quantity
                value={quantity}
                onChange={setAmount}
                label={product.name}
              />
              <button
                className="btn btn-primary !min-h-12"
                onClick={() => {
                  addToCart(product.slug, quantity);
                  setAdded(
                    quantity +
                      " added to your demo bag." +
                      (hasStorage()
                        ? ""
                        : " Storage unavailable; saved for this visit."),
                  );
                }}
              >
                Add to demo bag
                <ShoppingBag size={16} />
              </button>
            </div>
            {added && (
              <p role="status" className="mt-4 text-sm text-accent">
                {added}{" "}
                <Link href="/cart" className="font-semibold underline">
                  View bag
                </Link>
              </p>
            )}
            <div className="mt-8 border-t border-line pt-6">
              <h2 className="text-xl text-forest">A few thoughtful details</h2>
              <ul className="mt-4 space-y-3">
                {product.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-2 text-xs leading-relaxed text-stone"
                  >
                    <Check size={14} className="mt-0.5 shrink-0 text-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <DemoNotice className="mt-7">
              Demo product only. No confirmed stock or official shipping and
              returns policies. Checkout does not take payment or place a real
              order.
            </DemoNotice>
          </div>
        </div>
      </section>
      <section className="container-x section section-last">
        <SectionHeading
          title="A little more for your home."
          href="/mart"
          linkLabel="All essentials"
        />
        <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products
            .filter((item) => item.slug !== product.slug)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
        </div>
      </section>
    </>
  );
}
export function CartPage() {
  const { cart } = useDemo();
  const total = cartTotal(cart);
  return (
    <>
      <PageIntro
        eyebrow="Jovic’s Mart"
        title="Your everyday essentials."
        description="A little collection of things for a well-cared-for home."
      />
      <section className="container-x pt-3 pb-20">
        {cart.length ? (
          <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-1">
              {cart.map((item) => {
                const product = products.find((p) => p.slug === item.slug)!;
                return (
                  <article
                    key={item.slug}
                    className="flex gap-4 border-b border-line py-6"
                  >
                    <Link
                      href={"/mart/" + item.slug}
                      className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-sand sm:size-32"
                    >
                      <Photo
                        name={product.image}
                        alt={product.name}
                        sizes="128px"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link href={"/mart/" + item.slug}>
                        <h2 className="text-lg leading-tight text-forest sm:text-xl">
                          {product.name}
                        </h2>
                      </Link>
                      <p className="mt-2 text-[10px] text-stone">
                        {product.size}
                      </p>
                      <p className="mt-2 text-xs font-bold text-forest">
                        {money(product.price)}{" "}
                        <span className="font-normal text-stone">
                          sample each
                        </span>
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <Quantity
                          value={item.quantity}
                          onChange={(quantity) =>
                            setQuantity(item.slug, quantity)
                          }
                          label={product.name}
                        />
                        <button
                          className="icon-btn text-stone hover:text-red-800"
                          aria-label={"Remove " + product.name}
                          onClick={() => setQuantity(item.slug, 0)}
                        >
                          <Trash2 size={16} />
                        </button>
                        <p className="ml-auto text-sm font-bold text-forest">
                          {money(product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
              <Link
                href="/mart"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-forest"
              >
                Continue exploring
                <Arrow />
              </Link>
            </div>
            <aside className="rounded-3xl border border-line bg-white p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-2xl text-forest">Your demo bag</h2>
              <div className="mt-7 flex justify-between text-sm">
                <span className="text-stone">Subtotal · sample prices</span>
                <strong>{money(total)}</strong>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-stone">
                Shipping and tax are not calculated. No official fees have been
                supplied.
              </p>
              <div className="mt-6 flex justify-between border-t border-line pt-5 text-lg text-forest">
                <span>Sample total</span>
                <strong>{money(total)}</strong>
              </div>
              <ButtonLink href="/checkout" className="mt-7 w-full">
                Continue to demo checkout
                <Arrow />
              </ButtonLink>
              <DemoNotice className="mt-5">
                No payment will be collected. This journey creates a demo order
                on this device only.
              </DemoNotice>
            </aside>
          </div>
        ) : (
          <EmptyState
            title="A fresh start for your bag."
            description="Your bag is empty. Explore the Mart and bring together a few everyday essentials."
            href="/mart"
            action="Explore Jovic’s Mart"
          />
        )}
      </section>
    </>
  );
}
