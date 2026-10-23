import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const directory = fileURLToPath(new URL("../public/images/", import.meta.url));
await mkdir(directory, { recursive: true });
const label = (
  title,
  sub = "EVERYDAY CARE",
  x = 190,
  y = 258,
  width = 220,
  height = 150,
) =>
  '<g><rect x="' +
  x +
  '" y="' +
  y +
  '" width="' +
  width +
  '" height="' +
  height +
  '" rx="3" fill="#f7f5ee"/><text x="' +
  (x + width / 2) +
  '" y="' +
  (y + 35) +
  '" text-anchor="middle" font-family="Georgia,serif" font-size="19" fill="#0f3d2a">Jovic’s Culture</text><path d="M' +
  (x + width / 2 - 15) +
  " " +
  (y + 50) +
  ' h30" stroke="#c49042"/><text x="' +
  (x + width / 2) +
  '" y="' +
  (y + 77) +
  '" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" letter-spacing="2" fill="#0f3d2a">' +
  title +
  '</text><text x="' +
  (x + width / 2) +
  '" y="' +
  (y + 100) +
  '" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" letter-spacing="1.6" fill="#59645d">' +
  sub +
  '</text><text x="' +
  (x + width / 2) +
  '" y="' +
  (y + height - 17) +
  '" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" letter-spacing="2" fill="#59645d">PRODUCT CONCEPT</text></g>';
const shapes = {
  cleaner:
    '<rect x="233" y="112" width="134" height="70" rx="12" fill="#193d2e"/><path d="M255 160 Q255 188 214 210 Q189 224 189 260 V454 Q189 477 213 477 H387 Q411 477 411 454 V260 Q411 224 386 210 Q345 188 345 160Z" fill="url(#green)"/><path d="M212 255V439" stroke="#b5d6b9" stroke-width="8" opacity=".14" stroke-linecap="round"/>' +
    label("SURFACE CLEANER"),
  mist:
    '<rect x="265" y="128" width="70" height="64" rx="5" fill="#234337"/><rect x="275" y="98" width="50" height="35" rx="5" fill="#d4c4a8"/><path d="M264 160 H336 V189 Q380 211 380 252 V458 Q380 478 357 478 H243 Q220 478 220 458 V252 Q220 211 264 189Z" fill="url(#amber)"/><path d="M238 252V444" stroke="#ffe5b4" stroke-width="7" opacity=".25" stroke-linecap="round"/>' +
    label("LINEN &amp; ROOM MIST", "HOME FRAGRANCE", 232, 270, 136, 137),
  candle:
    '<rect x="174" y="224" width="252" height="244" rx="20" fill="url(#green)"/><ellipse cx="300" cy="225" rx="126" ry="28" fill="#48634b"/><ellipse cx="300" cy="224" rx="110" ry="21" fill="#e8dfca"/><path d="M300 222v-18" stroke="#483d2c" stroke-width="4"/><ellipse cx="300" cy="200" rx="7" ry="15" fill="#e7b76b" opacity=".8"/><path d="M194 256v183" stroke="#acc8a8" stroke-width="6" opacity=".13"/>' +
    label("QUIET EVENING", "SCENTED CANDLE", 191, 278, 218, 144) +
    '<ellipse cx="427" cy="459" rx="67" ry="15" fill="#b5a07e"/><ellipse cx="427" cy="454" rx="67" ry="15" fill="#ccba99"/>',
  cloths:
    '<g transform="rotate(-7 300 350)"><rect x="135" y="326" width="330" height="125" rx="18" fill="#b9c1a6"/><path d="M145 419h310M145 430h310" stroke="#9da58e" fill="none"/><rect x="147" y="274" width="306" height="120" rx="16" fill="#d6cfba"/><path d="M155 365h286M155 378h286" stroke="#bfb79f"/><rect x="157" y="218" width="286" height="117" rx="15" fill="#eeeadf"/><path d="M164 306h268M164 320h268" stroke="#d6d0c2"/><rect x="267" y="216" width="65" height="235" fill="#244a35"/><text x="300" y="340" transform="rotate(-90 300 340)" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#f7f5ee">Jovic’s Culture</text></g><text x="300" y="490" text-anchor="middle" font-family="Arial" font-size="8" letter-spacing="3" fill="#59645d">CARE CLOTHS · PRODUCT CONCEPT</text>',
  towels:
    '<g><rect x="133" y="365" width="334" height="89" rx="24" fill="#b4bda9"/><rect x="142" y="306" width="316" height="105" rx="24" fill="#d1d9c8"/><rect x="151" y="246" width="298" height="111" rx="24" fill="#e7e8dd"/><path d="M161 330h274M151 385h292M144 430h308" stroke="#929f88" stroke-width="3" opacity=".35"/><rect x="274" y="247" width="52" height="208" fill="#f7f5ee"/><text x="300" y="352" transform="rotate(-90 300 352)" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#0f3d2a">Jovic’s Culture</text></g><text x="300" y="489" text-anchor="middle" font-family="Arial" font-size="8" letter-spacing="3" fill="#59645d">SOFT COTTON · PRODUCT CONCEPT</text>',
  brush:
    '<g transform="rotate(-22 300 310)"><path d="M284 127Q300 110 316 127L325 305H275Z" fill="url(#wood)"/><circle cx="300" cy="143" r="7" fill="#8d7049"/><path d="M211 322Q209 290 246 280H354Q391 290 389 322L384 359H216Z" fill="url(#wood)"/><path d="M220 358v77M230 358v82M240 358v83M250 358v84M260 358v85M270 358v86M280 358v87M290 358v87M300 358v87M310 358v87M320 358v86M330 358v85M340 358v84M350 358v83M360 358v82M370 358v79M380 358v77" stroke="#c6b28a" stroke-width="6"/><path d="M232 314h137" stroke="#e9d6af" stroke-width="3" opacity=".5"/></g><text x="300" y="491" text-anchor="middle" font-family="Arial" font-size="8" letter-spacing="3" fill="#59645d">NATURAL BRUSH · PRODUCT CONCEPT</text>',
  basket:
    '<path d="M172 270Q164 240 195 242H405Q436 240 428 270L402 455Q399 475 378 475H222Q201 475 198 455Z" fill="url(#weave)" stroke="#b49462" stroke-width="4"/><ellipse cx="300" cy="250" rx="129" ry="32" fill="#98764a"/><ellipse cx="300" cy="254" rx="119" ry="25" fill="#b39363"/><path d="M221 248V209Q221 182 248 182M379 248V209Q379 182 352 182" fill="none" stroke="#c9ac7f" stroke-width="14"/><rect x="262" y="309" width="76" height="53" rx="4" fill="#244a35"/><text x="300" y="332" text-anchor="middle" font-family="Georgia" font-size="10" fill="#f7f5ee">Jovic’s</text><text x="300" y="347" text-anchor="middle" font-family="Georgia" font-size="10" fill="#f7f5ee">Culture</text>',
  diffuser:
    '<path d="M276 294L220 109M291 293L272 91M306 294L327 82M320 294L379 123M300 291L300 72" stroke="#a18b61" stroke-width="5"/><rect x="261" y="271" width="78" height="40" rx="5" fill="#244234"/><path d="M261 304Q215 325 215 354V454Q215 478 240 478H360Q385 478 385 454V354Q385 325 339 304Z" fill="url(#amber)"/>' +
    label("SOFT MORNING", "REED DIFFUSER", 229, 345, 142, 103),
};
for (const [name, shape] of Object.entries(shapes)) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f5f1e7"/><stop offset="1" stop-color="#e5dfd0"/></linearGradient><linearGradient id="green"><stop stop-color="#244d37"/><stop offset=".45" stop-color="#40664a"/><stop offset="1" stop-color="#173d2b"/></linearGradient><linearGradient id="amber"><stop stop-color="#6c4825"/><stop offset=".3" stop-color="#b58a4e"/><stop offset=".65" stop-color="#9c723a"/><stop offset="1" stop-color="#5c3f23"/></linearGradient><linearGradient id="wood"><stop stop-color="#b28e59"/><stop offset=".45" stop-color="#dbc39a"/><stop offset="1" stop-color="#b99b6e"/></linearGradient><pattern id="weave" width="18" height="12" patternUnits="userSpaceOnUse"><rect width="18" height="12" fill="#c2a372"/><path d="M0 3h18M0 9h18" stroke="#a18558" stroke-width="2"/><path d="M4 0v12M13 0v12" stroke="#dcc18f" stroke-width="3"/></pattern><filter id="shadow"><feGaussianBlur stdDeviation="13"/></filter></defs><rect width="600" height="600" fill="url(#bg)"/><path d="M450 0L210 600H395L600 110V0Z" fill="#fff" opacity=".22"/><ellipse cx="310" cy="480" rx="145" ry="18" fill="#466044" opacity=".14" filter="url(#shadow)"/>' +
    shape +
    '<text x="34" y="563" font-family="Arial,sans-serif" font-size="8" letter-spacing="3" fill="#697362">JOVIC’S MART / THE EVERYDAY COLLECTION</text></svg>';
  await writeFile(directory + "product-" + name + ".svg", svg);
}
console.log("Created 8 product concept illustrations.");
