import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import LogoDark from "../../assets/logo-black-white.svg";
import LogoLight from "../../assets/logo.svg";
import Button from "../reusables/Button";

const navLinks = [
    {
        name: "Home",
    },
    {
        name: "Features",
    },
    {
        name: "About",
    },
    {
        name: "Resources",
    },
];

function Header() {
    const [theme, setTheme] = useThemeSwitcher();
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsMobileScreen(true);
        } else {
            setIsMobileScreen(false);
        }
    }, []);

    return (
        <header className="px-10 2xl:px-24 pt-10 2xl:gap-0 bg-transparent ">
            <div className=" flex items-center gap-10 justify-between">
                {isMobileScreen && (
                    <div
                        // onClick={toggleSideBar}
                        className="cursor-pointer hover:scale-105"
                    >
                        <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            stroke={theme === "dark" ? "#ECECEC" : "#212121"}
                            xmlns="http://www.w3.org/2000/svg"
                            className="lg:block hidden"
                        >
                            <path
                                d="M22.4872 15V9C22.4872 4 20.4401 2 15.3225 2H9.18131C4.06366 2 2.0166 4 2.0166 9V15C2.0166 20 4.06366 22 9.18131 22H15.3225C20.4401 22 22.4872 20 22.4872 15Z"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#212121"
                                }
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.15723 2V22"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#212121"
                                }
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.3224 9.44043L12.7021 12.0004L15.3224 14.5604"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#212121"
                                }
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <svg
                            width="22"
                            height="12"
                            viewBox="0 0 22 12"
                            fill="none"
                            stroke={theme === "dark" ? "#ECECEC" : "#212121"}
                            xmlns="http://www.w3.org/2000/svg"
                            className="block lg:hidden"
                        >
                            <path
                                d="M2 1.5L13 1.5"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#212121"
                                }
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M2 10.5L20 10.5"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#212121"
                                }
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                )}
                <Link
                    to="/user/dashboard"
                    className="flex items-center gap-2 justify-center lg:justify-start w-fit"
                >
                    {theme === "dark" ? (
                        <img
                            src={LogoDark}
                            alt="Dark Logo"
                            className="w-[23px]"
                        />
                    ) : (
                        <img
                            src={LogoLight}
                            alt="Light Logo"
                            className="w-[23px]"
                        />
                    )}
                    <p className="text-primary-dark dark:text-primary-light text-[20px] leading-[25px]">
                        InterviewAI
                    </p>
                </Link>
                {!isMobileScreen && (
                    <div className="">
                        <ul className="flex items-center gap-16 ">
                            {navLinks.map((navLink, index) => {
                                return (
                                    <NavLink
                                        key={index}
                                        className={({ isActive }) => {
                                            return (
                                                "dark:text-primary-light leading-[20px] text-sm lg:text-base text-center opacity-30" +
                                                (isActive ? "opacity-100" : "")
                                            );
                                        }}
                                    >
                                        {navLink.name}
                                    </NavLink>
                                );
                            })}
                        </ul>
                    </div>
                )}
                <div className="flex items-center gap-6">
                    <Link to={"/auth/login"}>
                        <Button className="text-sm lg:text-base text-primary-dark dark:text-primary-light">
                            Log in
                        </Button>
                    </Link>
                    <Link to={"/auth"}>
                        <Button className="text-sm lg:text-base bg-brand-color text-white rounded-3xl py-[10px] px-3 shadow-custom;">
                            Create an account
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
