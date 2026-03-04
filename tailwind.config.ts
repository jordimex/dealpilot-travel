import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#07332c",
          secondary: "#485b46",
          muted: "#afb7ac",
          accent: "#bca879",
          bg: "#ededed",
        },
      },
    },
  },
};

export default config;
