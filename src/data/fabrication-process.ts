export interface FabricationProcessStep {
  step: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  tag: string;
}

export const FABRICATION_PROCESS: FabricationProcessStep[] = [
  {
    step: "01",
    title: "REQUIREMENT & FIELD CONTEXT",
    shortDescription: "Understanding tractor horsepower, soil type, and specific crop tillage requirements.",
    detailedDescription:
      "We begin by assessing the operating context—whether the implement will work in heavy black cotton soil, abrasive sandy loam, or stony land—and determine the optimal frame weight and tractor drawbar pull matching.",
    image: "/images/workshop/field-operations.svg",
    tag: "ANALYSIS",
  },
  {
    step: "02",
    title: "STRUCTURAL LAYOUT & PROFILE SIZING",
    shortDescription: "Sizing high-tensile steel channels, plate gauges, and pivot clearances.",
    detailedDescription:
      "Heavy ISMB channel sections, seamless box tubes, and gusset plates are calibrated for geometric alignment, standard CAT-II 3-point linkage clearance, and trash clearance between tines.",
    image: "/images/hero/hero-machinery.svg",
    tag: "ENGINEERING",
  },
  {
    step: "03",
    title: "HEAVY PLATE & SECTION CUTTING",
    shortDescription: "Precision profile shearing, plasma cutting, and hydraulic press bending.",
    detailedDescription:
      "Structural steel plates and channels are cut with accurate bevels for deep weld penetration. Hydraulic presses form curved mouldboards and reinforced drawbar headstocks.",
    image: "/images/workshop/steel-fabrication.svg",
    tag: "CUTTING & FORMING",
  },
  {
    step: "04",
    title: "MULTI-PASS STRUCTURAL WELDING",
    shortDescription: "Heavy MIG welding with multi-pass seams and stress-relieved gusseting.",
    detailedDescription:
      "Frames are secured in heavy rigid jigs and welded using multi-pass MIG processes. High-stress joints receive thick gussets and web stiffeners to eliminate weld cracking during heavy pulling.",
    image: "/images/workshop/steel-fabrication.svg",
    tag: "WELDING & ASSEMBLY",
  },
  {
    step: "05",
    title: "PRIMING, FITTING & QUALITY CHECK",
    shortDescription: "Boron wear parts fitting, anti-corrosive priming, and alignment inspection.",
    detailedDescription:
      "Hardened boron steel points, hydraulic rams, and gearbox assemblies are mounted. The completed implement is treated with heavy anti-corrosion primer and final industrial polyurethane enamel.",
    image: "/images/products/plough/plough-main.svg",
    tag: "FINISHING & QA",
  },
];
