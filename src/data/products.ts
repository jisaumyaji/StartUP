import { Product } from '@/types';

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Essentials',
    count: 12,
    icon: 'Package',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    description: 'Browse complete eco-friendly personal & medical catalog'
  },
  {
    id: 'sanitary-pads',
    name: 'Sanitary Pads & Intimate',
    count: 4,
    icon: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    description: '100% Bamboo fiber, chlorine-free & biodegradable sanitary napkins'
  },
  {
    id: 'bamboo-tissues',
    name: 'Bamboo Tissues & Wipes',
    count: 3,
    icon: 'Feather',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-soft unbleached 3-ply bamboo facial tissues and wipes'
  },
  {
    id: 'medical-gloves',
    name: 'Doctors & Surgical Gloves',
    count: 3,
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80',
    description: 'Eco-certified biodegradable nitrile & sterile surgical gloves'
  },
  {
    id: 'clinic-supplies',
    name: 'Clinic & Hospital Rolls',
    count: 2,
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    description: 'Compostable bed rolls, medical drapes, and clinic paper consumables'
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'eco-pads-day-20',
    title: 'Ultra-Soft Bamboo Sanitary Pads (Day Flow)',
    subtitle: 'Chemical-Free • 100% Organic Bamboo Core • Zero Rash',
    category: 'sanitary-pads',
    categoryName: 'Sanitary Pads & Intimate',
    price: 9.99,
    originalPrice: 13.99,
    rating: 4.9,
    reviewCount: 342,
    badge: '-28% OFF',
    badgeType: 'discount',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered with natural antimicrobial bamboo fiber. Our day pads offer supreme breathable absorbency without harmful dioxins, plastics, synthetic perfumes, or bleaching agents.',
    features: [
      '100% Organic certified bamboo top sheet',
      'Naturally antibacterial and hypoallergenic',
      'Biodegradable individual paper wrappers',
      'Ultra-thin 240mm with dual contour wings'
    ],
    certifications: ['OK Compost Industrial', 'OEKO-TEX Standard 100', 'Dermatologically Tested', 'Cruelty-Free'],
    ecoMetrics: {
      plasticSaved: '95% Plastic-Free',
      biodegradableTime: 'Breaks down in 180 days',
      material: 'Organic Bamboo & Cornstarch Film'
    },
    variants: [
      { id: 'v1', name: 'Standard Pack (10 Pads)', price: 5.99, originalPrice: 7.99, inStock: true },
      { id: 'v2', name: 'Value Pack (20 Pads)', price: 9.99, originalPrice: 13.99, inStock: true },
      { id: 'v3', name: 'Quarterly Supply (60 Pads)', price: 24.99, originalPrice: 34.99, inStock: true }
    ],
    isB2BRecommended: false
  },
  {
    id: 'eco-pads-overnight-xl',
    title: 'Heavy Flow Overnight Bamboo Pads (XL 320mm)',
    subtitle: 'Maximum Leak Lock • Wide Feather Wings • Eco Core',
    category: 'sanitary-pads',
    categoryName: 'Sanitary Pads & Intimate',
    price: 11.49,
    originalPrice: 15.99,
    rating: 4.9,
    reviewCount: 289,
    badge: 'BEST SELLER',
    badgeType: 'bestseller',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Designed for restful nights and postpartum comfort. Extra-wide back guard with superabsorbent plant-derived sap core that holds up to 180ml securely.',
    features: [
      'Extra-long 320mm coverage with anti-leak channels',
      'Zero synthetic perfumes, chlorine, or dyes',
      'Compostable plant-based leak-proof backsheet',
      'Cottony-soft gentle feel for sensitive skin'
    ],
    certifications: ['OEKO-TEX Certified', 'FDA Cleared Class 1', 'Hypoallergenic Certified'],
    ecoMetrics: {
      plasticSaved: '96% Plastic-Free',
      biodegradableTime: '6 Months Compostable',
      material: 'Bamboo Core & Corn Polyfilm'
    },
    variants: [
      { id: 'v4', name: 'Night Pack (12 Pads)', price: 6.99, originalPrice: 9.99, inStock: true },
      { id: 'v5', name: 'Double Night Pack (24 Pads)', price: 11.49, originalPrice: 15.99, inStock: true },
      { id: 'v6', name: 'Mega Pack (48 Pads)', price: 21.99, originalPrice: 29.99, inStock: true }
    ],
    isB2BRecommended: false
  },
  {
    id: 'bio-nitrile-exam-gloves-100',
    title: 'Biodegradable Nitrile Examination Gloves (Box of 100)',
    subtitle: 'Medical-Grade EN 455 / ASTM D6978 • Powder-Free • Micro-Textured',
    category: 'medical-gloves',
    categoryName: 'Doctors & Surgical Gloves',
    price: 18.99,
    originalPrice: 24.99,
    rating: 5.0,
    reviewCount: 512,
    badge: 'MEDICAL CE',
    badgeType: 'medical',
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80',
    description: 'Next-generation medical exam gloves infused with eco-accelerator technology. Degrades 10x faster in landfill conditions without losing chemo-rated chemical barrier protection or tactile sensitivity.',
    features: [
      'Biodegrades in active landfills via anaerobic microbial action',
      'Medical Grade AQL 1.5 conforming to EN 455 & ASTM D6319',
      'Latex-free, powder-free, accelerator-free skin allergy formula',
      'Micro-textured fingertips for precise wet & dry grip during procedures'
    ],
    certifications: ['FDA 510(k) Cleared', 'CE Medical Device Class I', 'ASTM D5511 Tested', 'ISO 13485'],
    ecoMetrics: {
      plasticSaved: 'Rapid Landfill Biodegradation',
      biodegradableTime: 'Up to 90% in 490 days',
      material: 'Eco-Enhanced Nitrile Polymer'
    },
    variants: [
      { id: 'v7', name: 'Size Small (S) - 100 Gloves', price: 18.99, originalPrice: 24.99, inStock: true },
      { id: 'v8', name: 'Size Medium (M) - 100 Gloves', price: 18.99, originalPrice: 24.99, inStock: true },
      { id: 'v9', name: 'Size Large (L) - 100 Gloves', price: 18.99, originalPrice: 24.99, inStock: true },
      { id: 'v10', name: 'Size XL - 100 Gloves', price: 19.99, originalPrice: 25.99, inStock: true },
      { id: 'v11', name: 'Clinic Case (10 Boxes / 1000 Gloves)', price: 149.99, originalPrice: 219.99, inStock: true }
    ],
    isB2BRecommended: true,
    bulkTierDiscount: 'Buy 5+ Cases: Save 25%'
  },
  {
    id: 'sterile-surgical-latex-gloves',
    title: 'Eco-Conscious Sterile Surgical Gloves (Pairs)',
    subtitle: 'Powder-Free • Curved Fingers • Natural Rubber Latex',
    category: 'medical-gloves',
    categoryName: 'Doctors & Surgical Gloves',
    price: 32.50,
    originalPrice: 42.00,
    rating: 4.8,
    reviewCount: 164,
    badge: 'SURGEON CHOICE',
    badgeType: 'medical',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    description: 'Sustainably tapped natural latex surgical gloves for operating theatres. Gamma-sterilized with ergonomic anatomical hand molds to eliminate hand fatigue during long surgeries.',
    features: [
      'Responsibly harvested FSC-certified natural rubber latex',
      'Triple-washed to minimize protein allergen content (<50 µg/g)',
      'Individual sterile paper peeling pouches (plastic-free pack)',
      'AQL 0.65 for highest barrier integrity during operations'
    ],
    certifications: ['CE 0123 Sterile Class IIa', 'EN 455-1/2/3/4', 'ISO 9001 / ISO 13485'],
    ecoMetrics: {
      plasticSaved: 'Paper-Pouched Sterile Peel',
      biodegradableTime: '100% Natural Latex Degrades',
      material: 'FSC Certified Hevea Latex'
    },
    variants: [
      { id: 'v12', name: 'Size 6.5 - Box of 50 Pairs', price: 32.50, originalPrice: 42.00, inStock: true },
      { id: 'v13', name: 'Size 7.0 - Box of 50 Pairs', price: 32.50, originalPrice: 42.00, inStock: true },
      { id: 'v14', name: 'Size 7.5 - Box of 50 Pairs', price: 32.50, originalPrice: 42.00, inStock: true },
      { id: 'v15', name: 'Size 8.0 - Box of 50 Pairs', price: 32.50, originalPrice: 42.00, inStock: true },
      { id: 'v16', name: 'Hospital Carton (400 Pairs)', price: 219.00, originalPrice: 299.00, inStock: true }
    ],
    isB2BRecommended: true,
    bulkTierDiscount: 'Hospital GPO Discount available'
  },
  {
    id: 'bamboo-facial-tissues-6pack',
    title: '100% Unbleached Bamboo Facial Tissues (6 Cubes)',
    subtitle: 'Zero Trees Cut • 3-Ply Softness • Hypoallergenic & Dust-Free',
    category: 'bamboo-tissues',
    categoryName: 'Bamboo Tissues & Wipes',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.9,
    reviewCount: 420,
    badge: 'ECO CHOICE',
    badgeType: 'eco',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    description: 'Crafted from fast-growing, pesticide-free bamboo grass. Naturally hypoallergenic, unscented, and free of chlorine and formaldehyde. Perfect for clinics, offices, and sensitive family homes.',
    features: [
      'Saves virgin forests: 100% certified FSC bamboo grass',
      'Silky 3-ply thickness that does not rip or shed lint',
      'Cardboard dispenser boxes with no plastic aperture films',
      'Naturally gentle on rhinitis, sinus, and allergy-prone noses'
    ],
    certifications: ['FSC 100% Bamboo', 'BPI Certified Compostable', 'PETA Vegan & Cruelty Free'],
    ecoMetrics: {
      plasticSaved: '100% Zero Plastic Packaging',
      biodegradableTime: 'Composts in 45 Days',
      material: 'Virgin Moso Bamboo Pulp'
    },
    variants: [
      { id: 'v17', name: 'Single Cube (90 Sheets)', price: 2.99, originalPrice: 3.99, inStock: true },
      { id: 'v18', name: 'Family Pack (6 Cubes - 540 Sheets)', price: 14.99, originalPrice: 19.99, inStock: true },
      { id: 'v19', name: 'Bulk Office/Clinic Carton (24 Cubes)', price: 49.99, originalPrice: 69.99, inStock: true }
    ],
    isB2BRecommended: false
  },
  {
    id: 'pocket-bamboo-tissues-12pack',
    title: 'On-the-Go Pocket Bamboo Tissues (12 Packs)',
    subtitle: 'Pocket-Sized • Pure Unbleached Fiber • Compostable Wrappers',
    category: 'bamboo-tissues',
    categoryName: 'Bamboo Tissues & Wipes',
    price: 7.99,
    originalPrice: 10.99,
    rating: 4.8,
    reviewCount: 195,
    badge: '-25% OFF',
    badgeType: 'discount',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'Compact 4-ply travel pocket tissues made from 100% fast-renewable bamboo. Designed for bags, lab coats, medical pockets, and everyday eco journeys.',
    features: [
      'Packaged in biodegradable plant cellulose film',
      '4-ply heavy-duty absorption without shredding',
      'Zero bleach, optical brighteners, or chemical fragrances',
      'Smooth velvet touch suitable for delicate skin'
    ],
    certifications: ['FSC Recycled Standard', 'USDA Certified Biobased 100%'],
    ecoMetrics: {
      plasticSaved: 'Plant Cellulose Wrappers',
      biodegradableTime: 'Degrades in soil in 60 days',
      material: 'Unbleached Organic Bamboo'
    },
    variants: [
      { id: 'v20', name: '12 Pocket Packs (120 Tissues)', price: 7.99, originalPrice: 10.99, inStock: true },
      { id: 'v21', name: '36 Pocket Packs (360 Tissues)', price: 19.99, originalPrice: 28.99, inStock: true }
    ],
    isB2BRecommended: false
  },
  {
    id: 'clinic-bed-sheet-roll',
    title: 'Biodegradable Medical Bed Sheet Roll (50m)',
    subtitle: 'Clinic Examination Paper • Water-Repellent Eco Backing • Perforated',
    category: 'clinic-supplies',
    categoryName: 'Clinic & Hospital Rolls',
    price: 21.99,
    originalPrice: 28.50,
    rating: 4.9,
    reviewCount: 147,
    badge: 'CLINIC STANDARD',
    badgeType: 'medical',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    description: 'Hygienic examination couch rolls made with bamboo-wood cellulose and compostable bio-barrier film. Ideal for doctor examination tables, gynecology clinics, ultrasound beds, and massage tables.',
    features: [
      'Perforated every 38cm for neat, tear-off hygienic sheets',
      'Breathable top layer with waterproof bio-film backing',
      'Significantly reduces medical clinic plastic footprint',
      'Fits standard 50cm medical roll dispensers'
    ],
    certifications: ['ISO 13485 Compliant', 'Hospital Grade Hygiene Standard'],
    ecoMetrics: {
      plasticSaved: 'Plant-Polymer Barrier Film',
      biodegradableTime: 'Compostable in 120 Days',
      material: 'Recycled Bamboo Pulp & PLA'
    },
    variants: [
      { id: 'v22', name: 'Single Roll (50m x 50cm)', price: 21.99, originalPrice: 28.50, inStock: true },
      { id: 'v23', name: 'Clinic Pack (6 Rolls)', price: 109.00, originalPrice: 145.00, inStock: true },
      { id: 'v24', name: 'Hospital Pallet (24 Rolls)', price: 389.00, originalPrice: 520.00, inStock: true }
    ],
    isB2BRecommended: true,
    bulkTierDiscount: 'Tier 1 Clinic Discount applied'
  },
  {
    id: 'eco-panty-liners-40',
    title: 'Breathable Bamboo Panty Liners (40 Count)',
    subtitle: 'Daily Freshness • Ultra-Thin 155mm • Zero Irritation',
    category: 'sanitary-pads',
    categoryName: 'Sanitary Pads & Intimate',
    price: 7.49,
    originalPrice: 9.99,
    rating: 4.8,
    reviewCount: 210,
    badge: 'EVERYDAY',
    badgeType: 'eco',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Feather-light daily organic liners designed for breathable, dry everyday support. Made with non-GMO organic bamboo fiber and non-toxic food-grade adhesive.',
    features: [
      'Air-permeable backsheet prevents heat & moisture accumulation',
      'Hypoallergenic pH-neutral barrier against yeast & bacteria',
      'Plastic-free cornstarch individual wrapping',
      'Comfortable flexible contour that stays in place'
    ],
    certifications: ['Dermatest Excellent 5-Star', 'OK Compost Home'],
    ecoMetrics: {
      plasticSaved: '98% Plastic-Free',
      biodegradableTime: 'Compostable within 100 days',
      material: '100% Organic Bamboo Fiber'
    },
    variants: [
      { id: 'v25', name: '1 Pack (40 Liners)', price: 7.49, originalPrice: 9.99, inStock: true },
      { id: 'v26', name: '3 Pack Bundle (120 Liners)', price: 18.99, originalPrice: 26.99, inStock: true }
    ],
    isB2BRecommended: false
  }
];

export const TRUST_BADGES = [
  {
    title: 'FREE EXPRESS SHIPPING',
    desc: 'On all orders over $50 nationwide',
    icon: 'Truck'
  },
  {
    title: '100% ECO-CERTIFIED',
    desc: 'Plastic-free & compostable items',
    icon: 'Leaf'
  },
  {
    title: 'DOCTOR & CLINIC APPROVED',
    desc: 'EN 455 & FDA medical grade safety',
    icon: 'ShieldCheck'
  },
  {
    title: 'CARBON-NEUTRAL DELIVERY',
    desc: 'Offsetting emissions on every single cart',
    icon: 'Globe'
  }
];
