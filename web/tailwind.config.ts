import type { Config } from "tailwindcss";

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
            },
            boxShadow: {
                brandSoft: "0 18px 45px rgba(255, 62, 165, 0.35)",
                brandStrong: "0 24px 60px rgba(157, 78, 221, 0.4)",
            },
        },
    },
    plugins: [],
};

export default config;
