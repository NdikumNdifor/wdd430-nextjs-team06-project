// src/app/lib/placeholder-data.ts
// Realistic seed data for Handcrafted Haven.
// Passwords are pre-hashed with bcrypt (cost factor 10).
// Plain-text equivalents are listed in comments for local dev only —
// NEVER commit real credentials to source control.

import type { User, Product } from './definitions';

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------
// artisan_elena  → plain-text: "Sunflower#2024"
// buyer_marco    → plain-text: "BluePebble!9"
// buyer_sofia    → plain-text: "WillowBranch$3"

export const placeholderUsers: User[] = [
  {
    id: 'a1b2c3d4-0001-4e5f-8a9b-000000000001',
    name: 'Elena Vasquez',
    email: 'elena.vasquez@handcraftedhaven.dev',
    password:
      '$2b$10$RIZf3V5bEBNHuMQ/u1o./.2fZh1jUxT/3wvELj5M4cSq9PdEh4h5K', // Sunflower#2024
  },
  {
    id: 'a1b2c3d4-0002-4e5f-8a9b-000000000002',
    name: 'Marco Ricci',
    email: 'marco.ricci@handcraftedhaven.dev',
    password:
      '$2b$10$K8XPqxLmNYdToFhGsWEO6.P0q3Y4VbN1JrZpT2c9MwDjL7oHa6FuO', // BluePebble!9
  },
  {
    id: 'a1b2c3d4-0003-4e5f-8a9b-000000000003',
    name: 'Sofia Andersen',
    email: 'sofia.andersen@handcraftedhaven.dev',
    password:
      '$2b$10$Hv2PnT6yBmR8cWqDzLfE3.eJxK5sOgN0AuVb4YwMi1Fd7CrTp9GlS', // WillowBranch$3
  },
];

// ---------------------------------------------------------------------------
// Products — all sold by Elena Vasquez (the artisan)
// ---------------------------------------------------------------------------

export const placeholderProducts: Product[] = [
  {
    id: 'd0000001-aaaa-4bbb-8ccc-dd0000000001',
    seller_id: 'a1b2c3d4-0001-4e5f-8a9b-000000000001', // Elena Vasquez
    name: 'Speckled Stoneware Mug',
    description:
      'Wheel-thrown stoneware mug fired in a wood kiln at cone 10. ' +
      'The natural ash glaze creates a unique speckled finish in earthy tones of ' +
      'charcoal, cream, and warm amber. Food-safe, dishwasher-safe, and holds ' +
      'approximately 330 ml. Each piece is one-of-a-kind — minor variations in ' +
      'glaze colour and surface texture are the hallmark of true handcraft.',
    price: 38.0,
    image_url:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop',
  },
  {
    id: 'd0000002-aaaa-4bbb-8ccc-dd0000000002',
    seller_id: 'a1b2c3d4-0001-4e5f-8a9b-000000000001',
    name: 'Merino Wool Cable-Knit Scarf',
    description:
      'Hand-knitted from 100 % extra-fine merino wool in a classic 8-stitch cable ' +
      'pattern. Measures 180 cm × 22 cm and weighs a luxuriously warm 210 g. ' +
      'Available in deep forest green. The yarn is ethically sourced from a small ' +
      'cooperative in the Basque Country and dyed with low-impact acid dyes. ' +
      'Hand-wash cold, dry flat.',
    price: 74.5,
    image_url:
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop',
  },
  {
    id: 'd0000003-aaaa-4bbb-8ccc-dd0000000003',
    seller_id: 'a1b2c3d4-0001-4e5f-8a9b-000000000001',
    name: 'Hammered Sterling Silver Ring',
    description:
      'Fabricated from recycled sterling silver sheet and finished with a ' +
      'hand-hammered texture that catches the light beautifully. Band width is ' +
      '6 mm, and the ring is available in whole sizes 5–11 (US). ' +
      'Oxidised highlights in the hammer marks add depth and contrast. ' +
      'Arrives in a handmade cloth pouch. Elena offers free resizing within ' +
      '30 days of purchase.',
    price: 62.0,
    image_url:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
  },
  {
    id: 'd0000004-aaaa-4bbb-8ccc-dd0000000004',
    seller_id: 'a1b2c3d4-0001-4e5f-8a9b-000000000001',
    name: 'White Oak Serving Board',
    description:
      'Hand-planed white oak cutting and charcuterie board with a juice groove ' +
      'routed around the perimeter. Dimensions: 40 cm × 25 cm × 2.2 cm. ' +
      'The end-grain orientation makes it gentle on knife edges and highly ' +
      'resistant to deep scoring. Finished with food-grade beeswax and mineral ' +
      'oil. Do not submerge in water; wipe clean and re-oil occasionally to ' +
      'maintain its warm, honey-toned lustre.',
    price: 89.0,
    image_url:
      'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=800&auto=format&fit=crop',
  },
  {
    id: 'd0000005-aaaa-4bbb-8ccc-dd0000000005',
    seller_id: 'a1b2c3d4-0001-4e5f-8a9b-000000000001',
    name: 'Pressed-Wildflower Beeswax Candle',
    description:
      'Hand-poured pillar candle crafted from 100 % pure beeswax with a cotton ' +
      'wick. Pressed seasonal wildflowers — lavender, chamomile, and cornflower — ' +
      'are embedded in the outer surface. Burns clean for approximately 40 hours ' +
      'with a gentle honey scent. Diameter 7 cm, height 12 cm. ' +
      'Place on a heat-safe holder; trim the wick to 6 mm before each lighting ' +
      'for an optimal, drip-free burn.',
    price: 28.0,
    image_url:
      'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&auto=format&fit=crop',
  },
  {
    id: 'd0000006-aaaa-4bbb-8ccc-dd0000000006',
    seller_id: 'a1b2c3d4-0001-4e5f-8a9b-000000000001',
    name: 'Indigo Shibori-Dyed Tote Bag',
    description:
      'Natural cotton canvas tote (400 g/m²) hand-dyed using traditional Japanese ' +
      'itajime shibori fold-and-clamp resist technique with plant-based indigo. ' +
      'No two bags are identical — the resist pattern produces a distinct blue-on- ' +
      'white geometric motif on each piece. Measures 40 cm × 36 cm with ' +
      '68 cm handles. Machine-washable on cold; colours will soften to a ' +
      'beautiful vintage indigo with age and washing.',
    price: 45.0,
    image_url:
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop',
  },
];
