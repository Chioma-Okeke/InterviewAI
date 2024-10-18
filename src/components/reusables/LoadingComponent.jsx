import React from "react";
import Logo from "../../assets/logo-black-white.svg";
import LogoLight from "../../assets/logo.svg";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

function LoadingComponent() {
    const [theme] = useThemeSwitcher();
    return (
        <main className="h-[70vh] flex items-center justify-center">
            {theme === "dark" ? (
                <img
                    src={Logo}
                    alt="Dark Logo"
                    className="animate-pulse w-10 lg:w-[60px]"
                />
            ) : (
                <img
                    src={LogoLight}
                    alt="Light Logo"
                    className="animate-pulse w-10 lg:w-[60px]"
                />
            )}
        </main>
    );
}

export default LoadingComponent;
