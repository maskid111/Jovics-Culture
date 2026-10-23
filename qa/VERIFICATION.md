# Frontend verification — 23 October 2026

## Final automated checks

| Check | Result |
| --- | --- |
| npm.cmd run lint | PASS — no errors or warnings |
| npm.cmd run typecheck | PASS — route type generation and TypeScript |
| npm.cmd run build | PASS — Next.js 16.4.3 production build; 34 prerendered outputs |
| npm.cmd run verify:routes | PASS — 30 content routes, 4 custom 404s, profile redirect, 15 image assets |
| SVG XML validation | PASS — all 8 product illustrations parse |

The route verifier checks successful responses, Jovic’s branding, rejection of Native content, invalid route status codes, the profile redirect and nonempty image assets.

## Browser checks

Tested in the in-app Chromium browser. Booking was tested in the development preview; commerce, membership, supporting pages and final visual checks used the production build.

- Booking: service preselection from a detail link, required field validation, required date validation, future sample date entry with native date controls, sample time selection, customer details and instructions, review, acknowledgement, save, local confirmation and persisted history.
- Storefront: category filter, ascending sample-price sorting, zero-result search, clearing filters and quick add.
- Product detail: quantity increase and adding multiple units.
- Cart: automatic sample totals, persistence after reload, item removal and empty state.
- Checkout: sample customer/address details, review, acknowledgement, local order creation, correct sample total, empty cart after confirmation and persisted order history.
- Culture Plus: enrolment modal, details, benefits review, acknowledgement, saved demo membership and profile display.
- Profile: save and reload persistence. The clear-all review modal opens; cancelling preserves data. Final irreversible clearing was not exercised.
- Contact: topic selection, required inputs, keyboard and pointer submission to the local preview modal. The result explicitly states nothing was sent or saved.
- FAQs: keyword filtering and native accordion expansion.
- Global search: “pantry” returns Extra Tasks and the result navigates to that service.
- Navigation: desktop Services dropdown, Escape dismissal, mobile drawer, Escape dismissal and mobile dock.
- Images: no broken images in the final Mart view; all nine product cards display their concept artwork.

Only fictitious test details were used. Demo booking/order/profile/membership fixtures remain in the test browser’s localStorage; the app includes a clear-data control.

## Responsive and visual checks

| Viewport | Result |
| --- | --- |
| 320 × 800 phone | Header overflow corrected; document width 305px, within the viewport |
| 390 × 844 phone | Homepage, drawer, forms and FAQ layout reviewed; document width 375px |
| 768 × 1024 tablet | Mart filters and two-column product layout reviewed; no horizontal overflow |
| 1440 × 960 desktop | Homepage, services, navigation, booking, cart and checkout reviewed; document width 1425px |

The 15px difference in several width measurements is the browser scrollbar. The final hero uses Version A’s 40.8px phone / 60px tablet / 76px desktop type scale. The content container is 76rem with 16/24/32px gutters. The header uses a 64px phone / 76px desktop content height, plus its border on inner pages.

Screenshots are stored in qa/screenshots:
- home-desktop.png
- home-desktop-full.png
- home-phone.png
- mart-tablet-full.png
- drawer-phone.png

Reduced-motion CSS and Motion preference handling were inspected in source. Physical devices and an OS-level reduced-motion toggle were not tested.

## Reference preservation

Implementation, dependency installation, configuration, assets and outputs are inside Jovics-Culture. No Native source, dependencies, configuration or deployment was modified.

The confirmed reference homepage and global CSS SHA-256 hashes still match the values captured during initial inspection:

- src/app/page.tsx: 4EB6D5F904A69A451EF76D189558D365F6DACDCF1ECF933808BF13F050ADD47C
- src/app/globals.css: 1A2EADC844B59E3918752EC4AC71FF0DB225E2CC3AC559F11799FF6794F04E9F

These are representative source checks, not a full-repository baseline comparison.

## Business and launch boundaries

The brand PDF and official logo were not available. The supplied brief is the business source. Service pricing, scope approval, operating area and availability, contact details, membership fees and terms, actual products and stock, shipping/tax/returns/cancellation/privacy policies remain unconfirmed.

All bookings, enrolments and orders are demonstrations saved locally. No business submission, authentication, payment, fulfilment or backend integration is implemented, as requested.
