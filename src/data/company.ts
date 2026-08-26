export interface CompanyApproachPillar {
  number: string;
  title: string;
  description: string;
  tag: string;
}

export const COMPANY_INFO = {
  name: "Sai Pooja Fabrication",
  legalName: "Sai Pooja Fabrication",
  tagline: "Agricultural Implements & Heavy Fabrication Engineering",
  shortDescription:
    "Specialists in durable agricultural machinery, tractor-mounted implements, and precision structural fabrication built for demanding field conditions.",
  longDescription:
    "Sai Pooja Fabrication manufactures high-strength agricultural implements and custom equipment designed around practical farming needs. By combining heavy structural steel channels, wear-resistant boron points, and precision MIG welding, we produce implements that withstand tough soil conditions, heavy draft loads, and years of demanding fieldwork.",
  philosophy:
    "We believe agricultural machinery should be built with the structural resilience of industrial equipment. Every frame, hinge pin, and turnover mechanism is calibrated for maximum field turnaround and minimal downtime.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@saipoojafabrication.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  address: {
    line1: "Industrial Area",
    city: "Maharashtra",
    country: "India",
  },
  operatingHours: "Monday - Saturday: 9:00 AM - 7:00 PM",
};

export const COMPANY_APPROACH: CompanyApproachPillar[] = [
  {
    number: "01",
    title: "PRACTICAL FIELD THINKING",
    description:
      "Every implement is engineered with insights from actual soil resistance, stubble handling, and tractor drawbar pulling dynamics.",
    tag: "FIELD TESTED",
  },
  {
    number: "02",
    title: "STRUCTURAL RESILIENCE",
    description:
      "We build exclusively with heavy ISMB channels, seamless box sections, and boron steel components to eliminate frame distortion.",
    tag: "HIGH-TENSILE STEEL",
  },
  {
    number: "03",
    title: "FABRICATION PRECISION",
    description:
      "Multi-pass MIG welding, CNC cut alignment, and stress-relieved joint geometry ensure longevity under heavy continuous draft.",
    tag: "MIG WELDED SEAMS",
  },
  {
    number: "04",
    title: "CUSTOM HORSEPOWER MATCHING",
    description:
      "We calibrate implement dimensions and frame weights specifically for 35 HP to 90+ HP tractor models with standard CAT-II 3-point hitches.",
    tag: "35-90+ HP TAILORED",
  },
];
