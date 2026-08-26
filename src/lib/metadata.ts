import type { Metadata } from "next";

export const siteConfig = {
  name: "Sai Pooja Fabrication",
  description:
    "Premium agricultural implements and precision fabrication engineering. Built for strength, durability, and modern agricultural performance.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://saipoojafabrication.com",
  ogImage: "/images/branding/og-image.jpg",
  locale: "en_IN",
  author: "Sai Pooja Fabrication",
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description,
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    metadataBase: new URL(siteConfig.url),
  };
}
