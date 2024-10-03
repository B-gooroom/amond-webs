/** @type {import('next').NextConfig} */

// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xtlpqspaohusobjcvsas.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/amond-img/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
