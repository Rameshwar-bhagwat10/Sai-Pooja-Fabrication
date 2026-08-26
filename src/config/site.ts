export const siteConfig = {
  name: "Sai Pooja Fabrication",
  shortName: "SPF",
  description:
    "Premium agricultural implements and precision fabrication engineering. Built for strength, durability, and modern agricultural performance.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://saipoojafabrication.com",
  ogImage: "/images/branding/og-image.jpg",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@saipoojafabrication.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 98765 43210",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  },
  links: {
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}`,
  },
};
