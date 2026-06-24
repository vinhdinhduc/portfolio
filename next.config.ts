import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Bắt buộc khi export static
  },
};

export default nextConfig;
