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
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
