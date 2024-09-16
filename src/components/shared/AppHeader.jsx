import React from "react";
import LogoDark from "../../assets/logo-black-white.svg";
import LogoLight from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { CgProfile } from "react-icons/cg";
import bigScreenNavIcon from "../../assets/sideIcon.svg";
import MobNavIcon from "../../assets/sideIconMob.svg";
import { toggleNavBar } from "../../store/navSlice";
import { useDispatch, useSelector } from "react-redux";

function AppHeader() {
    const [theme, setTheme] = useThemeSwitcher();
    console.log("Current theme:", theme);
    const dispatch = useDispatch()
    const isSideBarVisible = useSelector((state) => state.nav.showNavBar)

    function toggleSideBar () {
        dispatch(toggleNavBar())
    }

    return (
        <header className="px-8 py-7">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {!isSideBarVisible && (
                        <div
                            onClick={toggleSideBar}
                            onMouseEnter={toggleSideBar}
                            className="cursor-pointer hover:scale-105"
                        >
                            <img
                                src={bigScreenNavIcon}
                                alt="Nav open icon"
                                className="stroke-primary-dark dark:stroke-primary-light hidden lg:block"
                                style={{
                                    stroke:
                                        theme === "dark"
                                            ? "#ECECEC"
                                            : "#212121",
                                }}
                            />
                            <img
                                src={MobNavIcon}
                                alt="Nav open icon"
                                className="stroke-primary-dark dark:stroke-primary-light block lg:hidden"
                            />
                        </div>
                    )}
                    <Link to="/" className="flex items-center gap-2">
                        {theme === "dark" ? (
                            <img src={LogoDark} alt="Dark Logo" />
                        ) : (
                            <img
                                src={LogoLight}
                                alt="Light Logo"
                                className="w-[21.45px]"
                            />
                        )}
                        <p className="text-primary-dark dark:text-primary-light text-[20px] leading-[25px]">
                            InterviewAI
                        </p>
                    </Link>
                </div>

                <button
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="dark:text-primary-light text-primary-dark"
                >
                    Toggle {theme === "dark" ? "Light" : "Dark"} Mode
                </button>
                {/* <img src={} alt="" className='rounded-full'/> */}
                <div className="hidden lg:block">
                    <CgProfile size={45} className="text-primary-dark dark:text-primary-light" />
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
