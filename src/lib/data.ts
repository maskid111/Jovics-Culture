export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  label: string;
  includes: string[];
  suited: string;
  note: string;
};
export const services: Service[] = [
  {
    slug: "standard-cleaning",
    name: "Standard Cleaning",
    short: "Everyday spaces. A fresh beginning.",
    description:
      "Make room for the moments that matter. A considered refresh for the spaces you live in, from the kitchen counter to your favourite corner.",
    image: "living",
    label: "Everyday care",
    includes: [
      "Accessible surface dusting and wiping",
      "Floor sweeping and mopping",
      "Kitchen counters and exterior appliance surfaces",
      "Bathroom surfaces and fixtures",
      "General tidying of agreed living areas",
    ],
    suited: "Regular upkeep of lived-in homes and apartments.",
    note: "The exact scope depends on your space and will need to be agreed with the team.",
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    short: "A little deeper. A lot more care.",
    description:
      "Give your home a fresh chapter with focused attention to the corners and surfaces that everyday routines can miss.",
    image: "kitchen",
    label: "A deeper refresh",
    includes: [
      "Detailed attention to accessible corners and edges",
      "Kitchen surface and splashback cleaning",
      "Bathroom fixture and surface cleaning",
      "Accessible skirting boards and door surfaces",
      "A room-by-room scope discussion",
    ],
    suited: "Homes ready for a more thorough refresh beyond regular upkeep.",
    note: "Specialist treatments and hard-to-reach work must be discussed separately.",
  },
  {
    slug: "move-in-cleaning",
    name: "Move-In Cleaning",
    short: "Your next chapter starts fresh.",
    description:
      "Settle into a space that feels like yours. Plan a considered clean before the boxes arrive and the memories begin.",
    image: "bedroom",
    label: "New beginnings",
    includes: [
      "Accessible empty rooms and floors",
      "Kitchen counters and cabinet exteriors",
      "Bathroom surfaces",
      "Door handles and touchpoints",
      "Agreed empty cupboard interiors",
    ],
    suited: "Preparing an empty home or apartment before moving in.",
    note: "Utilities, access and the condition of the property need to be confirmed before a real appointment.",
  },
  {
    slug: "extra-tasks",
    name: "Extra Tasks",
    short: "The small things that change everything.",
    description:
      "Find a little order in the everyday. Add focused help with the spaces and tasks that could use an extra pair of hands.",
    image: "organisation",
    label: "Thoughtful details",
    includes: [
      "Pantry arrangement",
      "Closet organisation",
      "Refrigerator cleaning",
      "Decluttering agreed areas",
      "Post-event cleanup",
    ],
    suited:
      "Specific household tasks, a seasonal reset or support after hosting.",
    note: "Choose the tasks you want in your booking notes. Availability and scope require confirmation.",
  },
  {
    slug: "garment-care",
    name: "Garment Care",
    short: "Care for the things you love wearing.",
    description:
      "From everyday essentials to treasured pieces, explore garment care shaped around the fabric and its care instructions.",
    image: "garments",
    label: "Wear it well",
    includes: [
      "Laundry",
      "Ironing and pressing",
      "Dry cleaning enquiries",
      "Delicate garment care",
      "Fabric and care-label discussion",
    ],
    suited: "Everyday wardrobes and garments that need considered attention.",
    note: "Treatment suitability, collection arrangements and turnaround times must be confirmed by the team.",
  },
  {
    slug: "home-refresh",
    name: "Home Refresh",
    short: "A home that feels as good as it looks.",
    description:
      "Bring the finishing touches together. Gentle scent, beautifully arranged cushions and a well-presented bed can shift the feeling of a room.",
    image: "scent",
    label: "The finishing touch",
    includes: [
      "Home scenting",
      "Candle styling",
      "Cushion arrangement",
      "Bed presentation",
      "Final home staging",
    ],
    suited: "Preparing for guests, a special moment or a new feeling at home.",
    note: "Product preferences, scent sensitivities and styling scope should be discussed in advance.",
  },
];

export const categories = [
  "Cleaning Products",
  "Home Fragrance",
  "Cleaning Equipment",
  "Lifestyle & Home Essentials",
] as const;
export type Category = (typeof categories)[number];
export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  size: string;
  description: string;
  details: string[];
  featured?: boolean;
};
export const products: Product[] = [
  {
    slug: "everyday-surface-cleaner",
    name: "Everyday Surface Cleaner",
    category: "Cleaning Products",
    price: 4500,
    image: "product-cleaner",
    size: "500 ml · Sample product",
    description:
      "A simple addition to your daily home-care ritual. This illustrative surface cleaner represents the kind of everyday essentials you can discover at Jovic’s Mart.",
    details: [
      "Illustrative product listing",
      "Formula and surface compatibility to be confirmed",
      "Always follow the final manufacturer’s label",
    ],
    featured: true,
  },
  {
    slug: "quiet-evening-candle",
    name: "Quiet Evening Candle",
    category: "Home Fragrance",
    price: 12500,
    image: "product-candle",
    size: "200 g · Sample product",
    description:
      "Set a slower pace with a softly lit corner. A sample candle for the moments when home becomes your favourite place to be.",
    details: [
      "Illustrative fragrance collection",
      "Scent notes and wax composition to be confirmed",
      "Never leave a lit candle unattended",
    ],
    featured: true,
  },
  {
    slug: "linen-room-mist",
    name: "Linen & Room Mist",
    category: "Home Fragrance",
    price: 6500,
    image: "product-mist",
    size: "150 ml · Sample product",
    description:
      "An invitation to refresh your surroundings. This sample mist is a preview of our home fragrance category.",
    details: [
      "Illustrative fragrance listing",
      "Ingredients and fabric suitability to be confirmed",
      "Check the final care instructions before use",
    ],
    featured: true,
  },
  {
    slug: "everyday-care-cloths",
    name: "Everyday Care Cloths",
    category: "Cleaning Equipment",
    price: 3500,
    image: "product-cloths",
    size: "Set of 3 · Sample product",
    description:
      "Little tools for everyday rituals. A sample set of cleaning cloths for your home-care shelf.",
    details: [
      "Illustrative equipment listing",
      "Material and dimensions to be confirmed",
      "Care instructions supplied with the final product",
    ],
    featured: true,
  },
  {
    slug: "home-care-duo",
    name: "Home Care Duo",
    category: "Cleaning Products",
    price: 8500,
    image: "product-cleaner",
    size: "2 pieces · Sample product",
    description:
      "Bring everyday care together with an illustrative pair of home cleaning essentials.",
    details: [
      "Sample bundle, contents not final",
      "Formulas and sizes to be confirmed",
      "Use only as directed on the final labels",
    ],
  },
  {
    slug: "soft-morning-diffuser",
    name: "Soft Morning Diffuser",
    category: "Home Fragrance",
    price: 15000,
    image: "product-diffuser",
    size: "100 ml · Sample product",
    description:
      "A quiet finishing touch for your shelf. Explore a sample diffuser inspired by the comfort of a well-cared-for home.",
    details: [
      "Illustrative fragrance listing",
      "Fragrance and refill options to be confirmed",
      "Keep fragrance oils away from children and pets",
    ],
  },
  {
    slug: "natural-cleaning-brush",
    name: "Natural Cleaning Brush",
    category: "Cleaning Equipment",
    price: 5000,
    image: "product-brush",
    size: "1 piece · Sample product",
    description:
      "A practical companion for your daily reset. An illustrative brush from the home-care equipment collection.",
    details: [
      "Illustrative equipment listing",
      "Materials and surface suitability to be confirmed",
      "Allow tools to dry between uses",
    ],
  },
  {
    slug: "woven-storage-basket",
    name: "Woven Storage Basket",
    category: "Lifestyle & Home Essentials",
    price: 18000,
    image: "product-basket",
    size: "Medium · Sample product",
    description:
      "A home for the little things. This sample woven basket brings warmth and order to everyday spaces.",
    details: [
      "Illustrative lifestyle listing",
      "Dimensions and material to be confirmed",
      "Product photography is illustrative",
    ],
  },
  {
    slug: "soft-cotton-towels",
    name: "Soft Cotton Towels",
    category: "Lifestyle & Home Essentials",
    price: 14000,
    image: "product-towels",
    size: "Set of 2 · Sample product",
    description:
      "A thoughtful detail for your daily routine. A sample towel set for a softer start and finish to the day.",
    details: [
      "Illustrative home essentials listing",
      "Fabric composition and dimensions to be confirmed",
      "Colours and availability are not final",
    ],
  },
];

export const benefits = [
  {
    title: "Priority booking",
    text: "A little more room in the diary for your home-care plans.",
  },
  {
    title: "Preferred pricing",
    text: "Member pricing opportunities, with details to be confirmed.",
  },
  {
    title: "Exclusive offers",
    text: "Explore offers created with Culture Plus members in mind.",
  },
  {
    title: "Seasonal benefits",
    text: "Thoughtful touches for the changing rhythms of your year.",
  },
  {
    title: "Complimentary upgrades",
    text: "Discover member upgrade opportunities as the programme develops.",
  },
  {
    title: "Premium support",
    text: "More personal assistance with your home-care journey.",
  },
];
export const faqs = [
  {
    q: "What is Jovic’s Culture?",
    a: "Jovic’s Culture connects home cleaning, garment care and lifestyle services with Culture Plus™ membership and Jovic’s Mart home-care essentials. Our tagline is Where Hygiene Meets Heritage.",
  },
  {
    q: "Can I make a real booking on this website?",
    a: "This website is a frontend demonstration. You can explore the booking journey and save a demo booking on this device, but nothing is sent to the business and no appointment is reserved.",
  },
  {
    q: "How much do services cost?",
    a: "Confirmed service prices have not been supplied. A real quote would depend on the service, property and agreed scope. The demonstration does not calculate or promise a service price.",
  },
  {
    q: "Where are services available?",
    a: "The confirmed service area has not been supplied. Availability and address coverage must be verified with the business before any real appointment.",
  },
  {
    q: "What does Culture Plus™ cost?",
    a: "Membership fees, eligibility and the detailed terms of benefits have not been supplied. The enrolment here is a demonstration and does not activate a real membership.",
  },
  {
    q: "Can I buy products from Jovic’s Mart?",
    a: "You can explore sample products and a demo checkout. Every price is illustrative. No payment is collected, no order is sent and no delivery is arranged.",
  },
  {
    q: "What are the shipping, returns and cancellation policies?",
    a: "Official shipping, returns, refunds and booking cancellation policies have not been supplied. No policy is implied by this demonstration.",
  },
  {
    q: "Where is my demonstration data stored?",
    a: "Cart items, demo bookings, demo orders, profile and membership are saved only in this browser when storage is available. There is no real login or server account. You can clear these records from the profile page.",
  },
];
export const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
export const photo = (name: string) =>
  "/images/" + name + (name.startsWith("product-") ? ".svg" : ".jpg");
export const navigation = [
  { href: "/services", label: "Our services" },
  { href: "/culture-plus", label: "Culture Plus™" },
  { href: "/mart", label: "Jovic’s Mart" },
  { href: "/about", label: "Our story" },
];
