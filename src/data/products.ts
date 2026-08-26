import { type ProductItem } from "@/types/product";

export const ALL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    slug: "heavy-duty-hydraulic-reversible-plough",
    name: "Hydraulic Reversible Plough",
    hindiName: "हाइड्रोलिक रिवर्सिबल प्लाउ",
    category: "plough",
    categoryGroup: "tillage",
    categoryName: "Tillage",
    tagline: "Precision engineered hydraulic soil inversion plough with wear-resistant boron steel points.",
    description:
      "Engineered for primary deep tillage in hard, dry, and tough soils. Features a heavy-duty seamless tubular frame and dual-acting hydraulic turnover mechanism for complete soil inversion without creating dead furrows.",
    fullDescription:
      "The Sai Pooja Hydraulic Reversible Plough is constructed using high-grade structural steel channels and high-carbon boron wear points. The hydraulic turnover cylinder provides a smooth 180-degree rotation, enabling continuous back-and-forth plowing. The under-frame clearance prevents trash accumulation and clogging during heavy stubble inversion.",
    heroImage: "/images/products/plough/plough-main.svg",
    thumbnail: "/images/products/plough/plough-main.svg",
    galleryImages: [
      "/images/products/plough/plough-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "45-75 HP",
    warranty: "1 Year Structural Warranty",
    specifications: [
      { label: "Main Frame", value: "Heavy Seamless Box Section (100x100x8 mm)" },
      { label: "Turnover Operation", value: "Dual-Acting Hydraulic Cylinder 180°" },
      { label: "Under-Frame Clearance", value: "650 mm Minimum" },
      { label: "Mouldboard & Points", value: "High-Tensile Boron Steel" },
      { label: "Linkage Standard", value: "CAT-II Three-Point Linkage" },
      { label: "Tillage Depth", value: "Up to 300 mm" },
    ],
    features: [
      {
        number: "01",
        title: "HIGH-TENSILE BORON STEEL POINTS",
        description: "Hardened wear points with exceptional abrasion resistance for extended service life in rocky soil.",
      },
      {
        number: "02",
        title: "DUAL-ACTING HYDRAULIC TURNOVER",
        description: "Enables instant 180-degree reversal directly from the tractor cabin without manual hitching effort.",
      },
      {
        number: "03",
        title: "REINFORCED DRAWBAR & MAST",
        description: "Heavy gusseted CAT-II hitch geometry distributes tractor drawbar load evenly to eliminate frame twist.",
      },
      {
        number: "04",
        title: "SMOOTH SOIL INVERSION",
        description: "Curved mouldboard profile buries weeds and crop residue deep beneath the seedbed layer.",
      },
    ],
    applications: [
      {
        title: "Primary Deep Tillage",
        description: "Breaking up hardpan layers and virgin soil to maximize root aeration.",
      },
      {
        title: "Crop Residue Burial",
        description: "Complete turning of standing stubble, stalks, and weed roots into organic matter.",
      },
      {
        title: "Moisture Retention",
        description: "Deep soil opening for monsoon rainwater penetration and subsoil absorption.",
      },
    ],
    relatedProductSlugs: [
      "rigid-tine-cultivator",
      "heavy-duty-rotavator",
      "heavy-disc-harrow",
    ],
    isFeatured: true,
    order: 1,
  },
  {
    id: "prod-2",
    slug: "rigid-tine-cultivator",
    name: "Heavy Duty Rigid Cultivator",
    hindiName: "हैवी ड्यूटी कल्टीवेटर (9/11 टाइन)",
    category: "cultivator",
    categoryGroup: "tillage",
    categoryName: "Tillage",
    tagline: "9-Tine & 11-Tine tractor-mounted heavy cultivator for rapid secondary seedbed preparation.",
    description:
      "Built with high-tensile channel framework and forged reversible shovels for secondary tillage, soil aeration, and weed uprooting across black cotton and loamy fields.",
    fullDescription:
      "The Sai Pooja Rigid Cultivator uses standard ISMB steel channels clamped with forged alloy steel tines. Its rigid structure ensures uniform working depth across the entire working width without tine deflection, delivering consistent clod crushing and seedbed preparation.",
    heroImage: "/images/products/cultivator/cultivator-main.svg",
    thumbnail: "/images/products/cultivator/cultivator-main.svg",
    galleryImages: [
      "/images/products/cultivator/cultivator-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "35-55 HP",
    warranty: "1 Year Structural Warranty",
    specifications: [
      { label: "Main Frame", value: "Heavy ISMB Steel Channel (75x40 mm)" },
      { label: "Tine Configuration", value: "9 or 11 Rigid Tines (Staggered)" },
      { label: "Tine Clamps", value: "Heavy Forged Steel Clamps (Adjustable)" },
      { label: "Shovels", value: "Reversible High-Carbon Forged Points" },
      { label: "Linkage Standard", value: "CAT-II Three-Point Hitch" },
      { label: "Working Width", value: "2000 mm to 2400 mm" },
    ],
    features: [
      {
        number: "01",
        title: "FORGED REVERSIBLE SHOVELS",
        description: "Double-pointed reversible design doubles operational wear life before shovel replacement.",
      },
      {
        number: "02",
        title: "ADJUSTABLE TINE SPACING",
        description: "Heavy-duty clamp mechanism allows flexible tine repositioning to match diverse inter-row crops.",
      },
      {
        number: "03",
        title: "RIGID HEAVY ISMB CHASSIS",
        description: "Solid welded steel crossbars eliminate deflection under heavy tractor drawbar pull.",
      },
      {
        number: "04",
        title: "UNIFORM SEEDBED FINISHING",
        description: "Staggered row layout ensures trash clearance without soil buildup between tines.",
      },
    ],
    applications: [
      {
        title: "Secondary Soil Pulverization",
        description: "Breaking coarse clods left after primary plowing into fine seedbed tilth.",
      },
      {
        title: "Weed Uprooting",
        description: "Uprooting weed roots and leaving them on top of the soil for solar drying.",
      },
      {
        title: "Inter-Row Loosening",
        description: "Loosening compacted tractor tire tracks to restore soil porosity.",
      },
    ],
    relatedProductSlugs: [
      "heavy-duty-hydraulic-reversible-plough",
      "tractor-mounted-tiller",
      "heavy-duty-rotavator",
    ],
    isFeatured: true,
    order: 2,
  },
  {
    id: "prod-3",
    slug: "heavy-duty-rotavator",
    name: "Multi-Speed Rotary Tiller",
    hindiName: "मल्टी-स्पीड रोटावेटर",
    category: "rotavator",
    categoryGroup: "tillage",
    categoryName: "Tillage",
    tagline: "Heavy-duty gear-drive multi-speed rotary tiller for single-pass seedbed preparation in wet & dry soils.",
    description:
      "Equipped with hardened alloy gear transmission, heavy-duty side gear drive in oil bath, and L/C type boron steel blades for superior pulverization in both dryland farming and wet paddy puddling.",
    fullDescription:
      "Fabricated with reinforced tubular chassis and heavy side plates, the Sai Pooja Rotary Tiller delivers high-efficiency PTO power transfer. Its multi-speed gearbox allows operators to adjust rotor RPM to achieve the desired soil granularity while reducing tractor fuel consumption.",
    heroImage: "/images/products/rotavator/rotavator-main.svg",
    thumbnail: "/images/products/rotavator/rotavator-main.svg",
    galleryImages: [
      "/images/products/rotavator/rotavator-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "40-65 HP",
    warranty: "1 Year Gearbox & Frame Warranty",
    specifications: [
      { label: "Transmission", value: "Heavy-Duty Multi-Speed Gearbox" },
      { label: "Side Drive", value: "Enclosed Oil-Bath Gear Drive" },
      { label: "Rotor Blades", value: "L / C Type High-Carbon Boron Steel" },
      { label: "Blade Count", value: "36 / 42 / 48 Blades" },
      { label: "Working Width", value: "5 ft to 7 ft (1500 - 2100 mm)" },
      { label: "Tailgate", value: "Spring-Loaded Adjustable Floating Board" },
    ],
    features: [
      {
        number: "01",
        title: "MULTI-SPEED GEAR TRANSMISSION",
        description: "Allows flexible gear ratio selection to match tractor speed and soil hardness.",
      },
      {
        number: "02",
        title: "OIL-BATH SIDE GEAR DRIVE",
        description: "Eliminates chain wear and delivers smooth, low-maintenance power transmission.",
      },
      {
        number: "03",
        title: "BORON STEEL ROTOR BLADES",
        description: "Engineered curved profile cuts through tough crop residue and weeds without bogging down.",
      },
      {
        number: "04",
        title: "FLOATING ADJUSTABLE TAILGATE",
        description: "Retains soil for finer pulverization and creates a perfectly level surface for direct sowing.",
      },
    ],
    applications: [
      {
        title: "Single-Pass Seedbed Tilth",
        description: "Produces fine pulverized tilth ready for immediate sowing in a single tractor pass.",
      },
      {
        title: "Paddy Wet Puddling",
        description: "Ideal for water-saturated wetland puddling prior to rice transplantation.",
      },
      {
        title: "Sugar Cane & Cotton Stubble Mixing",
        description: "Milling and incorporating heavy crop stubble directly into the topsoil.",
      },
    ],
    relatedProductSlugs: [
      "rigid-tine-cultivator",
      "heavy-duty-hydraulic-reversible-plough",
      "seed-cum-fertilizer-drill",
    ],
    isFeatured: true,
    order: 3,
  },
  {
    id: "prod-4",
    slug: "tractor-mounted-tiller",
    name: "Tractor-Mounted Tiller",
    hindiName: "ट्रैक्टर माउंटेड टिलर",
    category: "tiller",
    categoryGroup: "tillage",
    categoryName: "Tillage",
    tagline: "Heavy-duty spring-loaded and rigid tiller for versatile inter-cultivation and field preparation.",
    description:
      "Engineered with heavy tubular main beams and high-tensile spring steel shanks to absorb shock when operating in obstacle-heavy or stony soil conditions.",
    fullDescription:
      "The Sai Pooja Tractor-Mounted Tiller is designed for multipurpose soil loosening and weed management. Its heavy-duty spring trip mechanism automatically absorbs shocks when encountering hidden subterranean stones or roots, resetting immediately without operator intervention.",
    heroImage: "/images/products/tiller/tiller-main.svg",
    thumbnail: "/images/products/tiller/tiller-main.svg",
    galleryImages: [
      "/images/products/tiller/tiller-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "35-50 HP",
    warranty: "1 Year Structural Warranty",
    specifications: [
      { label: "Frame", value: "Heavy Seamless Box Section (65x65 mm)" },
      { label: "Tines", value: "Heavy Forged Spring Steel Tines" },
      { label: "Trip Mechanism", value: "Dual Heavy Coil Springs per Tine" },
      { label: "Points", value: "Reversible Boron Steel Points" },
      { label: "Linkage", value: "Standard CAT-II 3-Point Linkage" },
    ],
    features: [
      {
        number: "01",
        title: "DUAL SPRING SHOCK ABSORPTION",
        description: "Spring mechanism deflects under heavy stone impact and snaps back into working position automatically.",
      },
      {
        number: "02",
        title: "HEAT-TREATED SHANKS",
        description: "Resistant to bending fatigue and micro-fractures under continuous hard soil load.",
      },
      {
        number: "03",
        title: "EFFICIENT FUEL DRAFT",
        description: "Optimized tine angle reduces tractor drawbar pull resistance.",
      },
      {
        number: "04",
        title: "EASY POINT REPLACEMENT",
        description: "Standardized bolt-on reversible points for fast field maintenance.",
      },
    ],
    applications: [
      {
        title: "Stony & Hard Land Tillage",
        description: "Ideal for terrain with embedded stones where rigid implements would suffer damage.",
      },
      {
        title: "Orchard & Plantation Loosening",
        description: "Inter-row cultivation around fruit orchards and tree plantations.",
      },
      {
        title: "Root Aeration",
        description: "Breaking crusty topsoil layers to promote root oxygen uptake.",
      },
    ],
    relatedProductSlugs: [
      "rigid-tine-cultivator",
      "heavy-duty-hydraulic-reversible-plough",
      "heavy-disc-harrow",
    ],
    isFeatured: false,
    order: 4,
  },
  {
    id: "prod-5",
    slug: "heavy-disc-harrow",
    name: "Heavy-Duty Mounted Disc Harrow",
    hindiName: "हैवी डिस्क हैरो",
    category: "disc-harrow",
    categoryGroup: "tillage",
    categoryName: "Tillage",
    tagline: "Trailed and mounted disc harrows with boron steel notched discs for heavy trash cutting.",
    description:
      "Engineered with heavy-duty structural steel gang carriers and high-tensile carbon steel concave discs for chopping thick crop residue, clod breaking, and soil mixing.",
    fullDescription:
      "The Sai Pooja Disc Harrow delivers aggressive soil penetration and stubble chopping. Featuring high-grade boron steel notched and plain disc options, heavy-duty spool spacers, and sealed grease-lubricated bearing hubs, it operates reliably across demanding multi-season rotations.",
    heroImage: "/images/products/disc-harrow/disc-harrow-main.svg",
    thumbnail: "/images/products/disc-harrow/disc-harrow-main.svg",
    galleryImages: [
      "/images/products/disc-harrow/disc-harrow-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "45-75 HP",
    warranty: "1 Year Frame & Gang Warranty",
    specifications: [
      { label: "Frame", value: "Reinforced Heavy Channel (100x50 mm)" },
      { label: "Disc Diameter", value: "508 mm to 560 mm (20 - 22 inches)" },
      { label: "Disc Count", value: "12, 14, or 16 Discs (2-Gang)" },
      { label: "Bearing Hubs", value: "Heavy Sealed Taper Roller Bearing Hubs" },
      { label: "Gang Angle", value: "Adjustable 0° to 22°" },
    ],
    features: [
      {
        number: "01",
        title: "BORON STEEL NOTCHED DISCS",
        description: "Front notched discs aggressively slice through heavy corn, cotton, or sugarcane residue.",
      },
      {
        number: "02",
        title: "HEAVY SEALED BEARING HUBS",
        description: "Triple-lip seals prevent dust and water intrusion during field operations.",
      },
      {
        number: "03",
        title: "ADJUSTABLE GANG ANGLE",
        description: "Quick pin adjustment to tune cutting aggression and inversion intensity.",
      },
      {
        number: "04",
        title: "HIGH CLEARANCE DESIGN",
        description: "Prevents trash clogging between adjacent discs in high-biomass field conditions.",
      },
    ],
    applications: [
      {
        title: "Stubble Chopping & Incorporation",
        description: "Chopping and incorporating dense stalks directly into the soil for faster decomposition.",
      },
      {
        title: "Hard Clod Pulverization",
        description: "Slicing through massive dry clods left after mouldboard plowing.",
      },
      {
        title: "Green Manure Incorporation",
        description: "Thoroughly mixing cover crops into soil before the next planting cycle.",
      },
    ],
    relatedProductSlugs: [
      "heavy-duty-hydraulic-reversible-plough",
      "heavy-duty-rotavator",
      "rigid-tine-cultivator",
    ],
    isFeatured: false,
    order: 5,
  },
  {
    id: "prod-6",
    slug: "adjustable-ridger",
    name: "Adjustable 3-Row Furrow Ridger",
    hindiName: "एडजस्टेबल 3-रो मेड़ बनाने वाला रिजर",
    category: "ridger",
    categoryGroup: "land-preparation",
    categoryName: "Land Preparation",
    tagline: "Precision row-crop ridger with adjustable wings for cotton, sugarcane, and potato bed forming.",
    description:
      "Fabricated with heavy-duty tubular toolbars and adjustable double-winged mouldboard bottoms for forming uniform ridges, irrigation furrows, and raised seedbeds.",
    fullDescription:
      "The Sai Pooja Furrow Ridger creates straight, well-packed ridges for row crops. Both row spacing and wing spread are fully adjustable, giving farmers the flexibility to tailor ridge height, width, and furrow depth to match specific crop agronomy and irrigation methods.",
    heroImage: "/images/products/ridger/ridger-main.svg",
    thumbnail: "/images/products/ridger/ridger-main.svg",
    galleryImages: [
      "/images/products/ridger/ridger-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "35-50 HP",
    warranty: "1 Year Structural Warranty",
    specifications: [
      { label: "Frame", value: "Heavy Square Hollow Section (75x75 mm)" },
      { label: "Number of Bottoms", value: "2 or 3 Furrow Bottoms" },
      { label: "Mouldboard Wings", value: "Adjustable High-Grade Steel Wings" },
      { label: "Row Width Range", value: "600 mm to 1000 mm (Adjustable)" },
      { label: "Linkage", value: "CAT-II Three-Point Hitch" },
    ],
    features: [
      {
        number: "01",
        title: "ADJUSTABLE MOULDBOARD WINGS",
        description: "Wings expand or contract to adjust furrow depth and ridge shoulder width.",
      },
      {
        number: "02",
        title: "REVERSIBLE POINT SHOVELS",
        description: "Hardened steel center points penetrate soil cleanly before the wings shape the ridge.",
      },
      {
        number: "03",
        title: "SLIDING TOOLBAR CLAMPS",
        description: "Fast row spacing adjustment to match diverse crop row requirements.",
      },
      {
        number: "04",
        title: "UNIFORM IRRIGATION CHANNELS",
        description: "Creates clean, obstruction-free channels for smooth gravity flood irrigation.",
      },
    ],
    applications: [
      {
        title: "Sugarcane & Cotton Furrowing",
        description: "Making deep, straight furrows for planting setts and row crops.",
      },
      {
        title: "Potato Raised Bed Forming",
        description: "Forming high, aerated ridges for tuber expansion and drainage.",
      },
      {
        title: "Earthing-Up Operations",
        description: "Piling soil around standing crop roots to support plant stability.",
      },
    ],
    relatedProductSlugs: [
      "rigid-tine-cultivator",
      "heavy-duty-land-leveler",
      "seed-cum-fertilizer-drill",
    ],
    isFeatured: false,
    order: 6,
  },
  {
    id: "prod-7",
    slug: "heavy-duty-land-leveler",
    name: "Heavy-Duty Tractor Land Leveler",
    hindiName: "हैवी ड्यूटी लैंड लेवलर (सपाटा)",
    category: "land-leveler",
    categoryGroup: "land-preparation",
    categoryName: "Land Preparation",
    tagline: "Heavy-gauge reinforced levelling blade for field grading, farm road maintenance, and soil smoothing.",
    description:
      "Built with high-tensile curved steel mouldboard and a reversible high-carbon cutting edge for rapid soil movement, field leveling, and efficient water management.",
    fullDescription:
      "The Sai Pooja Land Leveler is an indispensable tool for land reclamation and field grading. Built with a heavy structural frame and reinforced gusseted headstock, it withstands heavy blade loading without buckling. The reversible cutting blade provides double operational life.",
    heroImage: "/images/products/land-leveler/land-leveler-main.svg",
    thumbnail: "/images/products/land-leveler/land-leveler-main.svg",
    galleryImages: [
      "/images/products/land-leveler/land-leveler-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "35-65 HP",
    warranty: "1 Year Structural Warranty",
    specifications: [
      { label: "Mouldboard Width", value: "6 ft, 7 ft, or 8 ft (1800 - 2400 mm)" },
      { label: "Mouldboard Sheet", value: "8 mm Heavy Rolled Structural Plate" },
      { label: "Cutting Edge", value: "Reversible High-Carbon Steel Blade" },
      { label: "Mast", value: "Reinforced 3-Point CAT-II Hitch" },
      { label: "Adjustment", value: "Angle & Tilt Capable (Optional)" },
    ],
    features: [
      {
        number: "01",
        title: "HEAVY-GAUGE CURVED BLADE",
        description: "Optimized curvature rolls soil forward smoothly without causing tractor engine stalling.",
      },
      {
        number: "02",
        title: "REVERSIBLE HIGH-CARBON CUTTING BLADE",
        description: "Bolt-on cutting edge can be flipped when one side wears down.",
      },
      {
        number: "03",
        title: "GUSSETED REINFORCING RIBS",
        description: "Rear structural ribs prevent blade bowing during heavy dirt scraping.",
      },
      {
        number: "04",
        title: "PRECISION FIELD SMOOTHING",
        description: "Eliminates high spots and fills depressions to achieve uniform irrigation water spread.",
      },
    ],
    applications: [
      {
        title: "Field Leveling for Irrigation",
        description: "Ensures uniform water distribution across the field, cutting irrigation water use by up to 25%.",
      },
      {
        title: "Farm Track & Bund Grading",
        description: "Grading farm access roads, leveling field boundary bunds, and ditch backfilling.",
      },
      {
        title: "Land Reclamation",
        description: "Clearing mounds, scraping surface debris, and smoothing virgin plots.",
      },
    ],
    relatedProductSlugs: [
      "adjustable-ridger",
      "hydraulic-tipping-farm-trailer",
      "rigid-tine-cultivator",
    ],
    isFeatured: false,
    order: 7,
  },
  {
    id: "prod-8",
    slug: "seed-cum-fertilizer-drill",
    name: "Automatic Seed Cum Fertilizer Drill",
    hindiName: "ऑटोमेटिक सीड कम फर्टिलाइजर ड्रिल",
    category: "seed-drill",
    categoryGroup: "seeding",
    categoryName: "Seeding",
    tagline: "Precision multi-crop mechanical seed and fertilizer drill with fluted roller metering.",
    description:
      "Engineered with separate seed and fertilizer compartments, ground-wheel drive, and adjustable boot furrow openers for uniform planting depth and fertilizer placement.",
    fullDescription:
      "The Sai Pooja Seed Cum Fertilizer Drill ensures accurate seed metering and simultaneous fertilizer application below the seed line. Fluted aluminum rollers provide steady seed discharge without seed damage. Row spacing and sowing depth are easily adjusted for wheat, gram, soybean, mustard, and maize.",
    heroImage: "/images/products/seed-drill/seed-drill-main.svg",
    thumbnail: "/images/products/seed-drill/seed-drill-main.svg",
    galleryImages: [
      "/images/products/seed-drill/seed-drill-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "35-55 HP",
    warranty: "1 Year Metering & Frame Warranty",
    specifications: [
      { label: "Number of Rows", value: "9, 11, or 13 Rows" },
      { label: "Row Spacing", value: "Adjustable (150 mm to 225 mm)" },
      { label: "Metering Mechanism", value: "Fluted Aluminum Roller Drive" },
      { label: "Hopper Capacity", value: "50 kg Seed + 50 kg Fertilizer" },
      { label: "Furrow Openers", value: "Reversible Shoe / Inverted T-Type" },
      { label: "Drive Wheel", value: "Ground Traction Steel Lugged Wheel" },
    ],
    features: [
      {
        number: "01",
        title: "DUAL COMPARTMENT HOPPER",
        description: "Independent seed and fertilizer boxes fabricated with corrosion-resistant primed sheet.",
      },
      {
        number: "02",
        title: "PRECISION FLUTED METERING",
        description: "Gentle on seeds with adjustable lever control for precise seed rate calibration per acre.",
      },
      {
        number: "03",
        title: "SIMULTANEOUS FERTILIZER BANDING",
        description: "Places fertilizer slightly beside and below the seed line to prevent seed burn.",
      },
      {
        number: "04",
        title: "GROUND-DRIVEN ACCURACY",
        description: "Seed rate adjusts proportionally to tractor speed to prevent overseeding or missed patches.",
      },
    ],
    applications: [
      {
        title: "Wheat & Grain Sowing",
        description: "Accurate depth placement for uniform crop emergence and robust seedling stand.",
      },
      {
        title: "Pulses & Oilseed Planting",
        description: "Adjustable metering for chickpea, soybean, mustard, and lentils.",
      },
      {
        title: "Simultaneous Soil Nutrition",
        description: "Applying basal DAP/NPK fertilizer directly into root zone during seeding.",
      },
    ],
    relatedProductSlugs: [
      "rigid-tine-cultivator",
      "heavy-duty-rotavator",
      "heavy-duty-land-leveler",
    ],
    isFeatured: true,
    order: 8,
  },
  {
    id: "prod-9",
    slug: "hydraulic-tipping-farm-trailer",
    name: "Heavy Duty Tipping Farm Trailer",
    hindiName: "हाइड्रोलिक टिपिंग फार्म ट्रॉली",
    category: "farm-trailer",
    categoryGroup: "transport",
    categoryName: "Transport",
    tagline: "Reinforced steel chassis agricultural tipping trailer with heavy telescopic hydraulic ram.",
    description:
      "Fabricated with heavy rolled steel joists, high-strength corrugated sidewalls, and automotive-grade hub bearings for agricultural crop transport, gravel hauling, and heavy farm logistics.",
    fullDescription:
      "The Sai Pooja Farm Trailer is built for maximum payload capacity and rugged terrain endurance. Featuring heavy ISMB chassis beams, heavy gauge corrugated side panels with drop-down gates, and a multi-stage hydraulic tipping ram, it unloads bulk produce with speed and safety.",
    heroImage: "/images/products/farm-trailer/farm-trailer-main.svg",
    thumbnail: "/images/products/farm-trailer/farm-trailer-main.svg",
    galleryImages: [
      "/images/products/farm-trailer/farm-trailer-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "40-75+ HP",
    warranty: "1 Year Chassis & Hydraulic Warranty",
    specifications: [
      { label: "Chassis", value: "Heavy ISMB Steel Channel (150x75 mm / 200x100 mm)" },
      { label: "Payload Capacity", value: "3 Tonne to 10 Tonne Capacity" },
      { label: "Tipping Ram", value: "Heavy Single/Twin Multi-Stage Telescopic Ram" },
      { label: "Floor Plate", value: "3.5 mm to 5 mm Heavy Carbon Steel Sheet" },
      { label: "Axle & Bearings", value: "Solid Steel Axle with Taper Roller Bearings" },
      { label: "Brakes & Hitch", value: "Heavy Swivel Ring Drawbar Hitch" },
    ],
    features: [
      {
        number: "01",
        title: "HEAVY ISMB CHASSIS RAILS",
        description: "High torsional stiffness prevents chassis sagging under extreme bulk grain or stone loads.",
      },
      {
        number: "02",
        title: "MULTI-STAGE TELESCOPIC CYLINDER",
        description: "Provides steep 50-degree tipping angle for clean discharge of sticky or wet manure and soil.",
      },
      {
        number: "03",
        title: "DROP-DOWN & DETACHABLE SIDES",
        description: "Side and rear gates open or detach easily for flatbed transport of bagged cargo and equipment.",
      },
      {
        number: "04",
        title: "SOLID STEEL AXLE HUB ASSEMBLY",
        description: "Engineered for uneven farm cart tracks and rutted rural roads.",
      },
    ],
    applications: [
      {
        title: "Harvested Crop Transport",
        description: "Hauling bulk sugarcane, grain, cotton, and vegetables from farm to market.",
      },
      {
        title: "Fertilizer & Manure Hauling",
        description: "Transporting compost, farmyard manure, and bulk fertilizer to fields.",
      },
      {
        title: "Earth & Gravel Movement",
        description: "Moving construction sand, soil, and aggregate across farm infrastructure projects.",
      },
    ],
    relatedProductSlugs: [
      "heavy-duty-land-leveler",
      "heavy-duty-hydraulic-reversible-plough",
      "custom-fabricated-implements",
    ],
    isFeatured: true,
    order: 9,
  },
  {
    id: "prod-10",
    slug: "custom-fabricated-implements",
    name: "Custom Engineered Farm Implements",
    hindiName: "कस्टम फैब्रिकेटेड कृषि उपकरण",
    category: "custom-implements",
    categoryGroup: "custom",
    categoryName: "Custom",
    tagline: "Tailor-made agricultural attachments and custom machinery fabricated to your exact field specifications.",
    description:
      "Custom structural fabrication for specialized regional farming operations, custom hitch geometries, heavy sugarcane implements, and specialized tractor mounting brackets.",
    fullDescription:
      "When standard off-the-shelf implements do not meet specific soil conditions or crop geometries, Sai Pooja Fabrication provides custom design and fabrication services. Our engineers work directly with farmers to fabricate reinforced implements, specialized weeders, bed formers, and tractor attachments.",
    heroImage: "/images/products/custom-implements/custom-implements-main.svg",
    thumbnail: "/images/products/custom-implements/custom-implements-main.svg",
    galleryImages: [
      "/images/products/custom-implements/custom-implements-main.svg",
      "/images/workshop/steel-fabrication.svg",
      "/images/workshop/field-operations.svg",
    ],
    suitableForTractorHp: "Custom Tailored (30 - 90+ HP)",
    warranty: "1 Year Structural Warranty",
    specifications: [
      { label: "Fabrication Standard", value: "High-Tensile ISMB / Heavy Tubular Steel" },
      { label: "Welding Process", value: "Multi-Pass MIG Welding & Ultrasonic Testing" },
      { label: "Hitch Geometry", value: "Custom CAT-I / CAT-II / CAT-III Hitch" },
      { label: "Customization Options", value: "Width, Tine Spacing, Blade Material, Hydraulics" },
      { label: "Finishing", value: "Anti-Corrosion Epoxy Primer & Polyurethane Coat" },
    ],
    features: [
      {
        number: "01",
        title: "TAILORED TO REGIONAL CROPS",
        description: "Customized implements designed specifically for regional soil conditions and crop row geometry.",
      },
      {
        number: "02",
        title: "PRECISE TRACTOR HP MATCHING",
        description: "Dimensions and frame weight calibrated for maximum fuel efficiency on your tractor model.",
      },
      {
        number: "03",
        title: "HIGH-STRENGTH STEEL GRADES",
        description: "Fabricated with heavy ISMB channels, laser-cut plates, and boron wear components.",
      },
      {
        number: "04",
        title: "DIRECT WORKSHOP COLLABORATION",
        description: "Direct consultation with our fabrication craftsmen to refine dimensions and functionality.",
      },
    ],
    applications: [
      {
        title: "Specialized Crop Farming",
        description: "Tailor-made attachments for sugarcane, horticulture, cotton, and tuber crops.",
      },
      {
        title: "Heavy-Duty Soil Reclamation",
        description: "Reinforced deep-ripping attachments for rocky and compacted terrain.",
      },
      {
        title: "Tractor Attachment Retrofitting",
        description: "Customizing mounting brackets and hitch points for non-standard tractor models.",
      },
    ],
    relatedProductSlugs: [
      "heavy-duty-hydraulic-reversible-plough",
      "hydraulic-tipping-farm-trailer",
      "heavy-duty-rotavator",
    ],
    isFeatured: false,
    order: 10,
  },
];

// Helper functions for centralized querying
export function getAllProducts(): ProductItem[] {
  return ALL_PRODUCTS;
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return ALL_PRODUCTS.find((product) => product.slug === slug);
}

export function getProductsByCategoryGroup(group: string): ProductItem[] {
  if (group === "all") return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter((product) => product.categoryGroup === group);
}

export function getFeaturedProducts(): ProductItem[] {
  return ALL_PRODUCTS.filter((product) => product.isFeatured);
}

export function getRelatedProducts(product: ProductItem): ProductItem[] {
  const related = ALL_PRODUCTS.filter(
    (p) => product.relatedProductSlugs.includes(p.slug) && p.slug !== product.slug
  );
  if (related.length >= 3) return related.slice(0, 3);
  
  // Fallback: Fill with other products from same or adjacent category
  const fallback = ALL_PRODUCTS.filter(
    (p) => p.slug !== product.slug && !related.some((r) => r.slug === p.slug)
  );
  return [...related, ...fallback].slice(0, 3);
}

export function getAdjacentProducts(currentSlug: string): {
  prev: ProductItem | null;
  next: ProductItem | null;
} {
  const index = ALL_PRODUCTS.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? ALL_PRODUCTS[index - 1] : ALL_PRODUCTS[ALL_PRODUCTS.length - 1];
  const next = index < ALL_PRODUCTS.length - 1 ? ALL_PRODUCTS[index + 1] : ALL_PRODUCTS[0];

  return { prev, next };
}

export const SAMPLE_PRODUCTS = ALL_PRODUCTS;
