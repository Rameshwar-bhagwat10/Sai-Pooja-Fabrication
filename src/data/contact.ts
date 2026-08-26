import { type ContactFaqItem, type InquiryType } from "@/types/contact";

export interface InquiryTypeOption {
  id: InquiryType;
  title: string;
  subtitle: string;
  description: string;
}

export const INQUIRY_TYPE_OPTIONS: InquiryTypeOption[] = [
  {
    id: "product",
    title: "PRODUCT ENQUIRY",
    subtitle: "CATALOGUE IMPLEMENTS",
    description: "Inquire about standard agricultural implements, pricing, tractor HP matching, and availability.",
  },
  {
    id: "custom-fabrication",
    title: "CUSTOM FABRICATION",
    subtitle: "TAILORED ATTACHMENTS",
    description: "Discuss specialized toolbar widths, sugarcane furrowers, tipping trailers, and custom metalwork.",
  },
  {
    id: "equipment-requirement",
    title: "EQUIPMENT REQUIREMENT",
    subtitle: "FARM / FLEET SIZING",
    description: "Tell us about your land size, soil type, and tractor horsepower to get technical recommendations.",
  },
  {
    id: "general",
    title: "GENERAL ENQUIRY",
    subtitle: "WORKSHOP & DELIVERY",
    description: "General questions regarding workshop visits, spare parts, delivery logistics, or partnerships.",
  },
];

export const CONTACT_FAQS: ContactFaqItem[] = [
  {
    id: "faq-1",
    question: "What agricultural equipment does Sai Pooja Fabrication manufacture?",
    answer:
      "We manufacture a wide range of tractor-mounted agricultural implements including Hydraulic Reversible Ploughs, Rigid Tine Cultivators, Heavy-Duty Rotavators, Seed Cum Fertilizer Drills, Disc Harrows, Furrow Ridgers, Land Levelers, and Hydraulic Tipping Farm Trailers.",
  },
  {
    id: "faq-2",
    question: "Can you fabricate custom implements for non-standard tractor hitches or specific crop spacing?",
    answer:
      "Yes. We specialize in custom heavy agricultural fabrication. We can engineer custom toolbars, modify 3-point hitch geometry (CAT-I, CAT-II), and build specialized sugarcane or horticulture furrowing attachments according to your tractor and field dimensions.",
  },
  {
    id: "faq-3",
    question: "How do I determine the right implement size for my tractor horsepower?",
    answer:
      "Each implement category is engineered for specific tractor power ranges (e.g. 35-50 HP for 9-tine cultivators, 45-75+ HP for 2/3 bottom reversible ploughs). You can check the specifications on each product page or send us your tractor model and horsepower for direct factory recommendations.",
  },
  {
    id: "faq-4",
    question: "How can I inquire about prices and delivery timelines?",
    answer:
      "You can submit an inquiry through our website form, connect directly on WhatsApp (+91 98765 43210), or call our workshop directly. We provide transparent factory pricing and dispatch timelines based on your location.",
  },
  {
    id: "faq-5",
    question: "Can I visit your fabrication workshop to inspect equipment before ordering?",
    answer:
      "Yes, visitors and farmers are welcome to visit our fabrication workshop during operating hours (Monday to Saturday, 9:00 AM – 7:00 PM). Please contact us in advance to ensure the specific implement model is ready for inspection.",
  },
];
