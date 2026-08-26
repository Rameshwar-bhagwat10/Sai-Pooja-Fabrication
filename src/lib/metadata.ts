import type { Metadata } from "next";
import { siteConfig } from "@/config/seo";

export { siteConfig };

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonical,
  keywords,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  keywords?: string[];
  noIndex?: boolean;
} = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Heavy-Duty Agricultural Equipment & Implements`;
  const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;

  return {
    title: pageTitle,
    description,
    keywords: keywords || [
      "agricultural equipment",
      "agricultural implements",
      "tractor implements",
      "hydraulic reversible plough",
      "rigid cultivator",
      "rotavator",
      "agricultural fabrication",
      "Sai Pooja Fabrication",
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/brand/logo-mark.svg" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image.startsWith("http") ? image : `${siteConfig.url}${image}`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    metadataBase: new URL(siteConfig.url),
  };
}
