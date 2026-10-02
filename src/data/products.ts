import { Product } from '../types';

export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_nine_campaign_1790947756429.jpg',
  ringsMacro: '/src/assets/images/category_rings_macro_1790947691815.jpg',
  necklacesEditorial: '/src/assets/images/category_necklaces_editorial_1790947714913.jpg',
  giftingCraft: '/src/assets/images/editorial_craft_gifting_1790947730598.jpg',
  signatureBangle: '/src/assets/images/collection_signature_bangle_1790947743694.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'nine-rng-01',
    name: 'Solstice Bevelled 9K Band',
    subtitle: 'Sculptural everyday ring with chamfered light-catching facets',
    category: 'Rings',
    occasion: 'Everyday',
    collection: 'The Essentials',
    price: 9800,
    mrp: 11500,
    weight: '1.85g',
    dimensions: 'Band width: 2.4mm · Thickness: 1.3mm',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.ringsMacro,
      ASSET_IMAGES.necklacesEditorial,
    ],
    description: 'A contemporary study in geometric balance. The Solstice Bevelled Band features micro-faceted perimeter edges engineered in 9-karat solid gold to capture and refract ambient light with every subtle gesture. Engineered with an ergonomic comfort-fit inner profile for uninterrupted all-day wear.',
    details: [
      'Certified 375 (9K) solid yellow gold alloy',
      'High-polish mirror surface with hand-finished chamfered edges',
      'Hypoallergenic, nickel-safe metallurgical alloy',
      'Laser-inscribed with official EVOLUXE hallmark certificate code'
    ],
    sizes: ['10', '12', '14', '16', '18'],
    pairWithIds: ['nine-nck-01', 'nine-ear-01'],
    isBestseller: true,
    canPersonalise: true
  },
  {
    id: 'nine-nck-01',
    name: 'Horizon Paperclip 9K Chain',
    subtitle: 'Elongated Italian link chain with brushed brushed-gold sheen',
    category: 'Necklaces',
    occasion: 'Work Edit',
    collection: 'The Layering Edit',
    price: 18400,
    mrp: 21900,
    weight: '3.40g',
    dimensions: 'Length: 16 inches + 2 inch extension · Link width: 3.1mm',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.necklacesEditorial,
      ASSET_IMAGES.hero,
    ],
    description: 'Clean architectural links calibrated for modern fluidity. The Horizon Chain lays flat against the collarbone, engineered to resist twisting and snagging. Crafted from dense 9K gold for structural integrity that effortlessly supports daily stacking or standalone poise.',
    details: [
      'Engineered solid 9K interlocking rectangular links',
      'Secure custom lobster-claw clasp with NINE four-point star tag',
      'Dual jump-ring stations for variable 16" or 18" drop length',
      'Tested for daily resistance against perspiration and moisture'
    ],
    sizes: ['16 - 18 inch adjustable'],
    pairWithIds: ['nine-pnd-01', 'nine-brc-01'],
    isBestseller: true,
    canPersonalise: false
  },
  {
    id: 'nine-bng-01',
    name: 'Continuum Sculpted 9K Torc Bangle',
    subtitle: 'Open-cuff architectural silhouette in solid 9 karat brushed gold',
    category: 'Bangles',
    occasion: 'Celebrations',
    collection: 'The Signatures',
    price: 28900,
    mrp: 33500,
    weight: '5.20g',
    dimensions: 'Internal diameter: 58mm (Small/Medium) · Thickness: 3.5mm taper',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.signatureBangle,
      ASSET_IMAGES.giftingCraft,
    ],
    description: 'An understated triumph of form and restraint. The Continuum Torc Bangle boasts a tapered sculptural cross-section that gently wraps the wrist. Finished in a dual satin-brushed top face with mirror-polished interior contours that feel cool and weightless upon the skin.',
    details: [
      'Heavy-gauge 9K solid gold with memory-tempered spring tension',
      'Subtle brushed satin exterior with bevelled mirror edges',
      'Easy slip-on open torque architecture',
      'Individual bullion certificate issued by EVOLUXE Exchange'
    ],
    sizes: ['Small (56mm)', 'Medium (60mm)', 'Large (64mm)'],
    pairWithIds: ['nine-rng-01', 'nine-ear-02'],
    isBestseller: true,
    canPersonalise: true
  },
  {
    id: 'nine-ear-01',
    name: 'Elliptical Everyday 9K Hoops',
    subtitle: 'Featherlight hollow-formed oval hoops for dawn-to-dusk wear',
    category: 'Earrings',
    occasion: 'Everyday',
    collection: 'The Essentials',
    price: 8900,
    mrp: 10400,
    weight: '1.45g',
    dimensions: 'Drop length: 18mm · Outer width: 14mm · Tube width: 2.2mm',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.hero,
      ASSET_IMAGES.necklacesEditorial,
    ],
    description: 'The archetype of effortless everyday jewellery. Scaled with calculated restraint, these elliptical hoops frame the jawline with a soft champagne gold gleam. Their featherlight weight ensures zero lobe fatigue even during 14-hour workdays and transcontinental flights.',
    details: [
      'Precision snap-bar hinge closure with tactile audible click',
      'Featherweight electroformed 9K core for all-day comfort',
      'Hypoallergenic post compatible with sensitive skin',
      'Daily shower and swim resilient alloy'
    ],
    sizes: ['One Size (18mm)'],
    pairWithIds: ['nine-rng-01', 'nine-nck-01'],
    isBestseller: true,
    canPersonalise: false
  },
  {
    id: 'nine-pnd-01',
    name: 'North Star 9K Monogram Talisman',
    subtitle: 'Engravable celestial medallion suspended from a delicate curb chain',
    category: 'Pendants',
    occasion: 'Gifting',
    collection: 'The Gift Edit',
    price: 13600,
    mrp: 15900,
    weight: '2.60g',
    dimensions: 'Pendant diameter: 14mm · Chain: 18 inches adjustable',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.giftingCraft,
      ASSET_IMAGES.necklacesEditorial,
    ],
    description: 'Inspired by navigational celestials and personal compass points. The North Star Talisman features a subtle recessed four-point star emblem with space for bespoke back engraving. A legacy keepsake designed to carry names, dates, or quiet intentions.',
    details: [
      'Subtle diamond-cut star center with soft sandblasted backdrop',
      'Flat mirror reverse tailored for laser precision engraving',
      'Includes fine 9K gold diamond-cut link chain',
      'Delivered in the signature emerald green velvet keepsake case'
    ],
    sizes: ['18 inch chain included'],
    pairWithIds: ['nine-nck-01', 'nine-rng-02'],
    isBestseller: false,
    isNew: true,
    canPersonalise: true
  },
  {
    id: 'nine-rng-02',
    name: 'Aura Delicate Pavé 9K Band',
    subtitle: 'Whisper-thin 9K gold band studded with ethically sourced micro-accents',
    category: 'Rings',
    occasion: 'Date Night',
    collection: 'The Layering Edit',
    price: 11200,
    mrp: 13000,
    weight: '1.30g',
    dimensions: 'Band width: 1.5mm',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.ringsMacro,
      ASSET_IMAGES.signatureBangle,
    ],
    description: 'Designed specifically to stack alongside signet rings, solitaire pieces, or your everyday wedding band. The Aura band captures refined femininity with micro-beaded borders and shimmering stone settings that never overwhelm.',
    details: [
      'Precision micro-pavé setting with protective prongs',
      'Ultra-slender profile engineered without sacrificing 9K structural strength',
      'Stackable flush against companion rings',
      '100% genuine precious metal certificate included'
    ],
    sizes: ['10', '12', '14', '16'],
    pairWithIds: ['nine-rng-01', 'nine-ear-02'],
    isBestseller: false,
    canPersonalise: false
  },
  {
    id: 'nine-brc-01',
    name: 'Serene Fine Curb 9K Bracelet',
    subtitle: 'Fluid diamond-cut links designed for second-skin comfort',
    category: 'Bracelets',
    occasion: 'Everyday',
    collection: 'The Essentials',
    price: 12500,
    mrp: 14600,
    weight: '2.15g',
    dimensions: 'Length: 6.5 inches + 1 inch extension · Link width: 2.2mm',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.giftingCraft,
      ASSET_IMAGES.ringsMacro,
    ],
    description: 'Second-skin gold designed to never be taken off. Each link of the Serene Curb Bracelet is individually diamond-cut on four planes, producing a rhythmic shimmer that responds gracefully to wrist motion. Finished with an engraved NINE star charm.',
    details: [
      'Diamond-cut quad facets for refined light dispersion',
      'Robust 9K lobster clasp with reinforced end links',
      'Comfort-tested against desk typing and fabric catch',
      'Backed by EVOLUXE lifetime purity guarantee'
    ],
    sizes: ['6.5 - 7.5 inch adjustable'],
    pairWithIds: ['nine-nck-01', 'nine-rng-01'],
    isBestseller: true,
    canPersonalise: false
  },
  {
    id: 'nine-men-01',
    name: 'Forma Matte 9K Signet',
    subtitle: 'Brutalist-inspired flat rectangular signet in solid 9K brushed gold',
    category: 'Men',
    occasion: 'Work Edit',
    collection: "The Men's Edit",
    price: 24500,
    mrp: 28500,
    weight: '4.80g',
    dimensions: 'Top face: 14mm x 9mm · Solid under-gallery',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.signatureBangle,
      ASSET_IMAGES.ringsMacro,
    ],
    description: 'Substantial, balanced, and unapologetically modern. The Forma Signet rejects ornate traditional carving in favor of stark architectural geometry and a rich horizontal satin brush. Substantial weight and solid under-gallery ensure an authoritative presence.',
    details: [
      'Substantial solid 9K gold casting with weighted comfort fit',
      'Directional hand-brushed matte top face',
      'Smooth tapered shank that will not pinch during activity',
      'Custom monogram engraving optional at complimentary zero cost'
    ],
    sizes: ['18', '20', '22', '24'],
    pairWithIds: ['nine-bng-01'],
    isBestseller: false,
    isNew: true,
    canPersonalise: true
  },
  {
    id: 'nine-ear-02',
    name: 'Starlight Micro 9K Studs',
    subtitle: 'Minimalist four-point star emblem studs with secure screw backs',
    category: 'Earrings',
    occasion: 'Self Love',
    collection: 'The Essentials',
    price: 6400,
    mrp: 7500,
    weight: '0.95g',
    dimensions: 'Diameter: 5.5mm · Post gauge: 0.8mm',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.ringsMacro,
      ASSET_IMAGES.hero,
    ],
    description: 'The defining motif of NINE by EVOLUXE. These miniature celestial studs bring the iconic four-point star into a sharp, everyday architectural form. Ideal as a primary everyday stud or stacked alongside upper cartilage piercings.',
    details: [
      'Micro-sculpted solid 9K gold star emblem',
      'Threaded screw-back design for secure, worry-free wear during sleep and fitness',
      'Hypoallergenic medical-grade gold post',
      'Signature EVOLUXE gold bullion certification card included'
    ],
    sizes: ['One Size (5.5mm)'],
    pairWithIds: ['nine-ear-01', 'nine-nck-01'],
    isBestseller: true,
    canPersonalise: false
  },
  {
    id: 'nine-ank-01',
    name: 'Tide Shimmer 9K Anklet',
    subtitle: 'Delicate twisted rope chain with subtle reflective micro-plates',
    category: 'Anklets',
    occasion: 'Vacation',
    collection: 'The Essentials',
    price: 10400,
    mrp: 12200,
    weight: '1.90g',
    dimensions: 'Length: 9 inches + 1 inch extension',
    purity: '9 Karat Solid Gold (375 Hallmarked)',
    images: [
      ASSET_IMAGES.necklacesEditorial,
      ASSET_IMAGES.giftingCraft,
    ],
    description: 'Crafted for balmy coastal days and barefoot ease. The Tide Shimmer Anklet features an intricate rope weave interspersed with miniature polished discs that catch sunlight with every step. Saltwater and sunscreen resilient 9K gold construction.',
    details: [
      'Engineered specifically to withstand marine environment and daily friction',
      'Reinforced solder points on all stress terminals',
      'Insured doorstep delivery by EVOLUXE Logistics',
      'Hallmarked 375 standard'
    ],
    sizes: ['9 - 10 inch adjustable'],
    pairWithIds: ['nine-brc-01'],
    isBestseller: false,
    canPersonalise: false
  }
];

export const CATEGORIES = [
  { name: 'Rings', image: ASSET_IMAGES.ringsMacro, count: '14 Designs', tag: 'Sculptural & Stacking' },
  { name: 'Earrings', image: ASSET_IMAGES.hero, count: '18 Designs', tag: 'Hoops, Huggies & Studs' },
  { name: 'Necklaces', image: ASSET_IMAGES.necklacesEditorial, count: '12 Designs', tag: 'Chains & Collars' },
  { name: 'Pendants', image: ASSET_IMAGES.giftingCraft, count: '9 Designs', tag: 'Talismans & Medallions' },
  { name: 'Bracelets', image: ASSET_IMAGES.giftingCraft, count: '11 Designs', tag: 'Fluid Chains & Links' },
  { name: 'Bangles', image: ASSET_IMAGES.signatureBangle, count: '6 Designs', tag: 'Cuffs & Torcs' },
  { name: 'Anklets', image: ASSET_IMAGES.necklacesEditorial, count: '5 Designs', tag: 'Summer & Shimmer' },
  { name: 'Men', image: ASSET_IMAGES.signatureBangle, count: '8 Designs', tag: 'Architectural & Matte' },
];

export const OCCASIONS = [
  {
    name: 'Everyday',
    tagline: 'Quiet luxury for everything you do.',
    description: 'Pieces calibrated for your desk, morning coffee, gym sessions, and evening unwinding. Effortless, weightless gold.',
    image: ASSET_IMAGES.hero,
  },
  {
    name: 'Work Edit',
    tagline: 'Understated presence and precision.',
    description: 'Polished geometric chains and low-profile rings that command respect in boardrooms without shouting.',
    image: ASSET_IMAGES.necklacesEditorial,
  },
  {
    name: 'Date Night',
    tagline: 'Let your jewellery speak first.',
    description: 'Catching candlelight with pavé accents and fluid drop earrings tailored for intimate evening celebrations.',
    image: ASSET_IMAGES.ringsMacro,
  },
  {
    name: 'Vacation',
    tagline: 'Effortless shimmer under the sun.',
    description: 'Resilient 9-karat gold that travels effortlessly with you from coastal resorts to cobblestone alleys.',
    image: ASSET_IMAGES.signatureBangle,
  },
  {
    name: 'Festive',
    tagline: 'A modern celebration of gold.',
    description: 'Contemporary interpretations of gold heritage, bringing fresh minimalist silhouette to festive gatherings.',
    image: ASSET_IMAGES.giftingCraft,
  },
  {
    name: 'Gifting',
    tagline: 'Give something made to stay.',
    description: 'Packaged in signature deep emerald presentation boxes with personalized calligraphy cards and certified gold purity.',
    image: ASSET_IMAGES.giftingCraft,
  }
];

export const COLLECTIONS = [
  {
    title: 'THE ESSENTIALS',
    description: 'Minimal pieces designed for uninterrupted everyday wear. Second-skin gold that lives with you effortlessly.',
    cta: 'EXPLORE ESSENTIALS',
    image: ASSET_IMAGES.ringsMacro,
    tag: 'FOUNDATIONAL WARDROBE'
  },
  {
    title: 'THE SIGNATURES',
    description: 'Distinctive architectural NINE designs made to be noticed. Sculpted contours, custom torque bangles, and bold facets.',
    cta: 'EXPLORE SIGNATURES',
    image: ASSET_IMAGES.signatureBangle,
    tag: 'HOUSE CODES'
  },
  {
    title: 'THE LAYERING EDIT',
    description: 'Chains, collars, and stackable bands designed to harmoniously intertwine, layer, and evolve with your personal style.',
    cta: 'EXPLORE LAYERING',
    image: ASSET_IMAGES.necklacesEditorial,
    tag: 'CURATED STACKS'
  },
  {
    title: "THE MEN'S EDIT",
    description: 'Modern 9K gold jewellery designed for him. Weighted signet rings, brushed cuffs, and heavy gauge curb links.',
    cta: "EXPLORE MEN'S",
    image: ASSET_IMAGES.signatureBangle,
    tag: 'ARCHITECTURAL GOLD'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    user: '@the_evoluxe',
    caption: 'Quiet mornings with coffee and the Solstice Bevelled 9K Band. ☕✨',
    image: ASSET_IMAGES.ringsMacro,
    productName: 'Solstice Bevelled 9K Band',
    productId: 'nine-rng-01'
  },
  {
    id: 'ig-2',
    user: '@the_evoluxe',
    caption: 'Stacking the Horizon Paperclip with the North Star Medallion. Modern gold that breathes.',
    image: ASSET_IMAGES.necklacesEditorial,
    productName: 'Horizon Paperclip 9K Chain',
    productId: 'nine-nck-01'
  },
  {
    id: 'ig-3',
    user: '@the_evoluxe',
    caption: 'Unboxing the signature emerald keepsake box. A gift made to stay.',
    image: ASSET_IMAGES.giftingCraft,
    productName: 'North Star 9K Monogram Talisman',
    productId: 'nine-pnd-01'
  },
  {
    id: 'ig-4',
    user: '@the_evoluxe',
    caption: 'The Continuum Torc Bangle on deep emerald marble. Brushed gold mastery.',
    image: ASSET_IMAGES.signatureBangle,
    productName: 'Continuum Sculpted 9K Torc Bangle',
    productId: 'nine-bng-01'
  },
  {
    id: 'ig-5',
    user: '@the_evoluxe',
    caption: 'Dawn light on the Elliptical Hoops. Weightless, everyday luxury.',
    image: ASSET_IMAGES.hero,
    productName: 'Elliptical Everyday 9K Hoops',
    productId: 'nine-ear-01'
  },
  {
    id: 'ig-6',
    user: '@the_evoluxe',
    caption: 'Custom initial engraving underway at our Kerala atelier. Make it your NINE.',
    image: ASSET_IMAGES.giftingCraft,
    productName: 'Forma Matte 9K Signet',
    productId: 'nine-men-01'
  }
];
