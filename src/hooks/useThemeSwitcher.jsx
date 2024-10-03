import { useEffect, useState } from "react";

function useThemeSwitcher() {
    const getInitialTheme = () => {
        if (localStorage.theme) {
            return localStorage.theme;
        } else {
            return window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }
    };

    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const root = window.document.documentElement;
        const oppositeTheme = theme === "dark" ? "light" : "dark";

        // Remove the opposite theme class and apply the current theme
        root.classList.remove(oppositeTheme);
        root.classList.add(theme);

        // Store theme in localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme];
}

export default useThemeSwitcher;
