import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
const origin = process.env.PREVIEW_URL || "http://127.0.0.1:3107";
const data = await readFile(
  new URL("../src/lib/data.ts", import.meta.url),
  "utf8",
);
const [serviceBlock, productBlock] = data.split(
  "export const products: Product[]",
);
const slugs = (source) =>
  [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
const routes = [
  "/",
  "/services",
  "/mart",
  "/book",
  "/culture-plus",
  "/about",
  "/contact",
  "/faqs",
  "/account",
  "/cart",
  "/checkout",
  "/booking-confirmation",
  "/order-confirmation",
  "/account/bookings",
  "/account/orders",
  ...slugs(serviceBlock).map((slug) => "/services/" + slug),
  ...slugs(productBlock).map((slug) => "/mart/" + slug),
];
for (let offset = 0; offset < routes.length; offset += 6) {
  await Promise.all(
    routes.slice(offset, offset + 6).map(async (path) => {
      const response = await fetch(origin + path);
      assert.equal(response.status, 200, path + " must load");
      const body = await response.text();
      assert.match(body, /Jovic/, path + " must use the new brand");
      assert.doesNotMatch(
        body,
        /Native, beyond the plate|aria-label="Native home"/,
        "Wrong application at " + path,
      );
    }),
  );
}
for (const path of [
  "/page-that-does-not-exist",
  "/services/unknown-service",
  "/mart/unknown-product",
  "/account/unknown",
]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 404, path + " must return 404");
  assert.match(await response.text(), /way home/, "Custom 404 must render");
}
const profile = await fetch(origin + "/account/profile", {
  redirect: "manual",
});
assert.equal(profile.status, 307);
assert.equal(profile.headers.get("location"), "/account");
const assets = await readdir(new URL("../public/images/", import.meta.url));
for (const file of assets) {
  const response = await fetch(origin + "/images/" + file);
  assert.equal(response.status, 200, "Missing asset: " + file);
  assert.ok(
    (await response.arrayBuffer()).byteLength > 100,
    "Empty asset: " + file,
  );
}
console.log(
  "PASS: " +
    routes.length +
    " pages, 4 custom 404 routes, profile redirect and " +
    assets.length +
    " image assets.",
);
