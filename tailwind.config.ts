import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#4f46e5",
                    50: "#FBF7FF",
                    100: "#F3EBFC",
                    200: "#E0CFFA",
                    300: "#C7B0F5",
                    400: "#927BED",
                    500: "#4f46e5",
                    600: "#413ACF",
                    700: "#2E27AB",
                    800: "#1E1A8A",
                    900: "#110E66",
                    950: "#080642",
                },
                secondary: "#3b82f6",
            },
            container: {
                center: true,
            },

            screens: {
                "3xl": "1792px",
                "4xl": "2048px",
            },
        },
    },
    plugins: [
        require("tailwindcss-debug-screens"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
} satisfies Config;
