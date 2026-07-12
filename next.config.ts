import type { NextConfig } from "next";

const nextConfig: any = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/portfolie" : "",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
