# Jovic’s Culture

An independent, frontend-only Next.js App Router website inspired by **Native Version A — Original UI**. All application source, configuration, dependencies, assets and build outputs belong to this directory. The reference project is not a runtime dependency.

## Run locally

In PowerShell:

~~~powershell
Set-Location "C:\Users\HomePC\Desktop\Cul Projects\Jovics-Culture"
npm.cmd install --cache .npm-cache
npm.cmd run dev
~~~

Open **http://localhost:3107**. Port 3107 keeps this preview separate from other local projects.

For a production preview:

~~~powershell
npm.cmd run build
npm.cmd start
~~~

Use one preview server at a time. No environment variables, database or external accounts are required.

## Checks

~~~powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run verify:routes
~~~

The route check requires a running preview on port 3107. Set PREVIEW_URL to test another origin. Run "npm.cmd run format" to format the source. Regenerate the original SVG product concepts with "node scripts/create-product-art.mjs".

## Included

- Homepage with service shortcuts, featured services, Culture Plus, Mart products and brand storytelling.
- Six service detail pages: Standard Cleaning, Deep Cleaning, Move-In Cleaning, Extra Tasks, Garment Care and Home Refresh.
- Four-stage booking demonstration with sample schedule, customer details, review, acknowledgement and confirmation.
- Culture Plus benefits and a modal enrolment/review demonstration.
- Mart directory with nine sample products, four categories, search, sorting and individual detail pages.
- Quantity controls, persistent cart, automatic sample totals, demo checkout and order confirmation.
- About, Contact demonstration, searchable FAQs, demo profile, booking history, order history, custom 404, loading and error views.
- Search dialog with Ctrl/Cmd+K; desktop service dropdown; mobile drawer and five-tab dock.
- Keyboard focus styles, semantic controls, native dialog focus management and reduced-motion handling.

## Data and architecture

src/lib/data.ts is the single catalogue for services, sample products, membership benefits and FAQs. The prices are sample naira amounts and are labelled throughout the UI.

src/lib/store.ts isolates the demo state from page rendering. It uses useSyncExternalStore, browser localStorage under jovics-culture:demo:v1, and a storage-event subscription for other tabs. Cart, bookings, orders, profile and membership persist when browser storage is available. If storage fails, changes stay in memory for the current visit.

src/components/ui.tsx provides shared visual primitives; chrome.tsx owns navigation, footer and site search. home.tsx, shop.tsx, journeys.tsx and support.tsx implement the visitor experience. App Router files supply metadata, route validation and static generation.

There are no API routes, business server actions, payment SDKs, real authentication or external service integrations. Next.js serves and renders the frontend only. Demo confirmations are local records, never a claim that the business received a booking, enquiry, enrolment or order.

The profile page can clear all local demo information. The Contact form does not store its input. Use fictitious personal details when demonstrating the flows.

## Design reference

The implemented baseline is the confirmed read-only project at C:\Users\HomePC\Desktop\Cul Projects\owerri, specifically Version A components. It uses Fraunces/Manrope, the original forest/cream palette, 76rem content containers, 16/24/32px gutters, serif editorial headings, rounded photo cards, restrained orange indicators, pill controls, dark patterned banners and a column footer.

The homepage follows the reference’s immersive, left-aligned hero composition using relevant interior photography. No Jovic’s Culture video or official logo was supplied. The wordmark is replaceable text. The new project has no Version B selector or imports from Native.

## Business details still needed

The brand overview PDF was not present. Content is based on the supplied implementation brief.

Before connecting real services, supply the official logo and media, service area, verified scope, prices and quotes, availability and operating hours, contact details, membership fees/eligibility and benefit terms, actual product specifications and stock, and approved shipping, tax, returns, cancellation and privacy policies. The website does not invent these.

See ASSET-CREDITS.md for imagery and fonts. Browser and build verification is recorded in qa/VERIFICATION.md.
