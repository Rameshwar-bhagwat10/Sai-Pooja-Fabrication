import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["lucide-react"],
  images: {
    qualities: [70, 75, 90],
  },
};

export default nextConfig;
