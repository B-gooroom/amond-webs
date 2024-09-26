import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        // ...colors,
        "ad-brown": {
          800: "#B5582A",
        },
        "ad-black": "#212121",
        "ad-gray": {
          800: "#424242",
          500: "#9E9E9E",
          100: "#F5F5F5",
        },
        "ad-white": "#FFFFFF",
      },
      fontSize: {
        h1: [
          "36px",
          {
            lineHeight: "1.4", // 140%
            fontWeight: "600", // Semibold
          },
        ],
        h2: [
          "24px",
          {
            lineHeight: "1.4", // 140%
            fontWeight: "600", // Semibold
          },
        ],
        h3: [
          "20px",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        subtitle1: [
          "16px",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        subtitle2: [
          "16px",
          {
            lineHeight: "1.4",
            fontWeight: "400", // Regular
          },
        ],
        button: [
          "16px",
          {
            lineHeight: "1.4",
            fontWeight: "600", // Semibold
          },
        ],
        body1: [
          "14px",
          {
            lineHeight: "1.4",
            fontWeight: "600", // Semibold
          },
        ],
        body2: [
          "14px",
          {
            lineHeight: "1.4",
            fontWeight: "400", // Regular
          },
        ],
        caption1: [
          "12px",
          {
            lineHeight: "1.4",
            fontWeight: "400", // Regular
          },
        ],
        caption2: [
          "10px",
          {
            lineHeight: "1.4",
            fontWeight: "300", // Light
          },
        ],
      },
      spacing: {
        // 기본적으로 rem 단위로 설정되어 있으므로 직접 px 단위로 설정
        "4": "4px",
        "8": "8px",
        "12": "12px",
        "14": "14px",
        "16": "16px",
        "20": "20px",
        "24": "24px",
        "32": "32px",
      },
    },
  },
  plugins: [],
};
export default config;
