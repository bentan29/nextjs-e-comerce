import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.snapshot = { managedPaths: [] }; // evita que intente leer fuera
    return config;
  },
  experimental: {
    typedRoutes: false, // evita que explore rutas automáticamente
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      }
    ]
  }
};

export default nextConfig;
