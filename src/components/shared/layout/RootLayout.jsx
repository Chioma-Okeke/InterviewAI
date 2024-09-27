import { Outlet, useLocation } from "react-router-dom";

function RootLayout() {
    return (
        <main className="relative">
        {/* <button
            onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
            }
            className="dark:text-primary-light text-primary-dark"
        >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
        </button> */}
            <Outlet />
        </main>
    );
}

export default RootLayout;
