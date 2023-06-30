/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#4f46e5",
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
};
