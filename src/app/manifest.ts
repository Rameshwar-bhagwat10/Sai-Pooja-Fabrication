import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sai Pooja Fabrication",
    short_name: "Sai Pooja",
    description:
      "Agricultural Implements & Heavy Fabrication Engineering. Built for strength, durability, and field performance.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F1E8",
    theme_color: "#10271D",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
