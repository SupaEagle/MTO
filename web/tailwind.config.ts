import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    pink: "#FF3EA5",
                    purple: "#9D4EDD",
                    gold: "#FFD700",
                    goldDeep: "#C5A000",
                },
                surface: {
                    DEFAULT: "#0f172a", // slate-900
                    dark: "#020617",    // slate-950
                    card: "#1e293b",    // slate-800
                    hover: "#334155",   // slate-700
                    border: "#475569",  // slate-600
                },
                sidebar: {
                    DEFAULT: "#0f172a",
                    foreground: "#f8fafc",
                    primary: "#9D4EDD",
                    "primary-foreground": "#ffffff",
                    accent: "#334155",
                    "accent-foreground": "#f8fafc",
                    border: "#475569",
                    ring: "#9D4EDD",
                },
            },
            boxShadow: {
                brandSoft: "0 18px 45px rgba(255, 62, 165, 0.35)",
                brandStrong: "0 24px 60px rgba(157, 78, 221, 0.4)",
            },
        },
    },
    plugins: [
        tailwindcssAnimate,
    ],
};

export default config;
