/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary-light": "#ECECEC",
                "secondary-light": "#FFFFFF",
                "ternary-light": "#888888",

                "primary-dark": "#212121",
                "secondary-dark": "#171717",
                "ternary-dark": "#2C2F2C",
                "hover-dark": "#2F2F2F",

                "brand-color": "#3D9963"
            },
            stroke: {
                "primary-dark": "#212121", // dark mode stroke color
                "primary-light": "#ECECEC", // light mode stroke color
            },
        },
    },
    plugins: [],
};
