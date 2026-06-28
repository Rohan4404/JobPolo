/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "infinite-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // move half because we duplicated logos
        },
      },
      animation: {
        "infinite-marquee": "infinite-marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
};
