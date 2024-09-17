import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import LogoDark from "../../../assets/logo-black-white.svg";
import LogoLight from "../../../assets/logo.svg";
import useThemeSwitcher from "../../../hooks/useThemeSwitcher";
import BookIcon from "../../../assets/book.svg";
import SuitcaseIcon from "../../../assets/suitcase.svg";
import bigScreenNavIcon from "../../../assets/sideIcon.svg";
import MobNavIcon from "../../../assets/sideIconMob.svg";
import { useDispatch } from "react-redux";
import { toggleNavBar } from "../../../store/navSlice";

function SideBar() {
    const [theme, setTheme] = useThemeSwitcher();
    console.log(theme, "in sdie bar")
    const dispatch = useDispatch();

    function handleSideBarToggle() {
        dispatch(toggleNavBar());
    }

    return (
        <section className=" py-10 pl-6 pr-6 h-screen">
            <div
                className="mb-12 cursor-pointer hover:scale-105 w-fit"
                onClick={handleSideBarToggle}
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
                        stroke={theme === "dark" ? "#ECECEC" : "#212121"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.15723 2V22"
                        stroke={theme === "dark" ? "#ECECEC" : "#212121"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.3224 9.44043L12.7021 12.0004L15.3224 14.5604"
                        stroke={theme === "dark" ? "#ECECEC" : "#212121"}
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
                        stroke={theme === "dark" ? "#ECECEC" : "#212121"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M2 10.5L20 10.5"
                        stroke={theme === "dark" ? "#ECECEC" : "#212121"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <nav>
                <ul>
                    <NavLink
                        to={"/"}
                        className={({ isActive }) => {
                            return (
                                "flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark " +
                                (isActive ? "dark:bg-primary-dark" : "")
                            );
                        }}
                    >
                        {theme === "dark" ? (
                            <img src={LogoDark} alt="Dark Logo" />
                        ) : (
                            <img
                                src={LogoLight}
                                alt="Light Logo"
                                className="w-[21.45px]"
                            />
                        )}
                        <span className="text-primary-dark dark:text-primary-light">
                            InterviewAI
                        </span>
                    </NavLink>
                    <NavLink
                        to={"/learning"}
                        className={({ isActive }) => {
                            return (
                                "flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark " +
                                (isActive ? "dark:bg-primary-dark" : "")
                            );
                        }}
                    >
                        <img
                            src={BookIcon}
                            alt="Book icon"
                            className="stroke-primary-dark dark:stroke-primary-light"
                        />
                        <span className="text-primary-dark dark:text-primary-light">
                            Learning
                        </span>
                    </NavLink>
                    <NavLink
                        to={"/practice"}
                        className={({ isActive }) => {
                            return (
                                "flex items-center gap-3 p-2 dark:hover:bg-primary-dark " +
                                (isActive ? "dark:bg-primary-dark" : "")
                            );
                        }}
                    >
                        <img
                            src={SuitcaseIcon}
                            alt="Suitcase Icon"
                            className="stroke-primary-dark dark:stroke-primary-light"
                        />
                        <span className="text-primary-dark dark:text-primary-light">
                            Practice
                        </span>
                    </NavLink>
                </ul>
            </nav>
        </section>
    );
}

SideBar.propTypes = {
    toggleSideBar: PropTypes.func,
};

export default SideBar;
