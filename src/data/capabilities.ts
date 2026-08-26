export interface FabricationCapability {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  keyHighlights: string[];
  image: string;
  categoryTag: string;
}

export const FABRICATION_CAPABILITIES: FabricationCapability[] = [
  {
    id: "agricultural-implements",
    number: "01",
    title: "AGRICULTURAL IMPLEMENT FABRICATION",
    shortDescription:
      "Full-scale manufacturing of heavy-duty primary & secondary tillage equipment, including hydraulic reversible ploughs, cultivators, and rotary tillers.",
    detailedDescription:
      "We fabricate complete agricultural implements starting from raw ISMB structural channels and seamless tubular steel. Every frame is welded using multi-pass MIG processes with heavy reinforcement gussets at critical stress points.",
    keyHighlights: [
      "High-tensile boron steel wear parts",
      "Reinforced CAT-II 3-point mast geometry",
      "Hydraulic turnover mechanism assembly",
      "Anti-corrosive epoxy primer coating",
    ],
    image: "/images/workshop/steel-fabrication.svg",
    categoryTag: "PRIMARY IMPLEMENTS",
  },
  {
    id: "custom-fabrication",
    number: "02",
    title: "CUSTOM HEAVY METAL FABRICATION",
    shortDescription:
      "Tailor-made agricultural equipment and custom structural steel attachments engineered to specific farming and land preparation requirements.",
    detailedDescription:
      "When standard market implements cannot meet specific soil textures, sugarcane crop spacing, or tractor hitch dimensions, we custom engineer frames, specialized bed formers, and reinforced toolbars.",
    keyHighlights: [
      "Custom toolbar widths & tine spacing",
      "Specialized crop furrowers & bed shapers",
      "Direct engineer-to-farmer design consultation",
      "High-load structural reinforcement",
    ],
    image: "/images/products/custom-implements/custom-implements-main.svg",
    categoryTag: "CUSTOM SOLUTIONS",
  },
  {
    id: "tractor-mounted",
    number: "03",
    title: "TRACTOR-MOUNTED IMPLEMENT ASSEMBLY",
    shortDescription:
      "Precision alignment and fabrication of 3-point linkage hitch frames, PTO driveline mountings, and hydraulic cylinder systems.",
    detailedDescription:
      "Ensuring perfect alignment of tractor 3-point linkage geometry (CAT-I, CAT-II) to deliver balanced drawbar pull, prevent tractor engine strain, and maintain consistent operating depth across uneven fields.",
    keyHighlights: [
      "Standard CAT-II 3-point linkage geometry",
      "PTO driveline gear alignment",
      "Dual-acting hydraulic cylinder mounting",
      "Heavy pivot pin & bushing fitting",
    ],
    image: "/images/products/rotavator/rotavator-main.svg",
    categoryTag: "3-POINT MOUNTED",
  },
  {
    id: "structural-modification",
    number: "04",
    title: "STRUCTURAL REINFORCEMENT & TRAILERS",
    shortDescription:
      "Heavy trailer chassis fabrication, tipping ram mountings, axle assembly, and implement frame rebuilding.",
    detailedDescription:
      "Fabricating heavy-duty tipping farm trailers with ISMB steel channels, multi-stage hydraulic telescopic rams, drop-down corrugated sidewalls, and solid axle hub assemblies for heavy bulk hauling.",
    keyHighlights: [
      "Heavy ISMB main chassis beams (150x75 mm)",
      "Multi-stage telescopic hydraulic tipping ram",
      "Drop-down & detachable corrugated gates",
      "Solid steel axle with taper roller bearings",
    ],
    image: "/images/products/farm-trailer/farm-trailer-main.svg",
    categoryTag: "TRAILERS & REPAIR",
  },
];
