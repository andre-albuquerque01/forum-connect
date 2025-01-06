import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'forum-gradient-1': 'linear-gradient(to right, #f97316, #f43f5e)',
        'forum-gradient-2': 'linear-gradient(to right, #14b8a6, #3b82f6)',
        'forum-gradient-3': 'linear-gradient(to right, #7e22ce, #1e3a8a)',
        'forum-gradient-4': 'linear-gradient(to right, #3b82f6, #9333ea)',
      },
      textColor: {
      }
    },
  },
  plugins: [],
} satisfies Config;
