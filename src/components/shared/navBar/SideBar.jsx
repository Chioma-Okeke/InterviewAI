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
import { IoIosLogOut } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

function SideBar() {
    const [theme, setTheme] = useThemeSwitcher();
    const { logout } = useContext(AuthContext);
    console.log(theme, "in sdie bar");
    const dispatch = useDispatch();

    function handleSideBarToggle() {
        dispatch(toggleNavBar());
    }

    function logUserOut() {
        if (window.innerWidth < 1024) {
            handleSideBarToggle();
        }
        logout();
        toast.success("User Successfully logged out.");
    }

    return (
        <section className=" py-10 pl-6 pr-6 h-screen">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div
                        className="mb-12 cursor-pointer hover:scale-105 w-fit"
                        onClick={handleSideBarToggle}
                    >
                        <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            stroke={theme === "dark" ? "#ECECEC" : "#7D7D7D"}
                            xmlns="http://www.w3.org/2000/svg"
                            className="lg:block hidden"
                        >
                            <path
                                d="M22.4872 15V9C22.4872 4 20.4401 2 15.3225 2H9.18131C4.06366 2 2.0166 4 2.0166 9V15C2.0166 20 4.06366 22 9.18131 22H15.3225C20.4401 22 22.4872 20 22.4872 15Z"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#7D7D7D"
                                }
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.15723 2V22"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#7D7D7D"
                                }
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.3224 9.44043L12.7021 12.0004L15.3224 14.5604"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#7D7D7D"
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
                            stroke={theme === "dark" ? "#ECECEC" : "#7D7D7D"}
                            xmlns="http://www.w3.org/2000/svg"
                            className="block lg:hidden"
                        >
                            <path
                                d="M2 1.5L13 1.5"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#7D7D7D"
                                }
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M2 10.5L20 10.5"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#7D7D7D"
                                }
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <nav>
                        <ul>
                            <NavLink
                                to={"/user/dashboard"}
                                onClick={() => {
                                    if (window.innerWidth < 1024)
                                        handleSideBarToggle();
                                }}
                                className={({ isActive }) => {
                                    return (
                                        "flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark rounded-lg " +
                                        (isActive ? "bg-primary-light dark:bg-primary-dark" : "")
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
                                <span className="text-soft-dark dark:text-primary-light">
                                    InterviewAI
                                </span>
                            </NavLink>
                            <NavLink
                                to={"/user/learning/stages"}
                                onClick={() => {
                                    if (window.innerWidth < 1024)
                                        handleSideBarToggle();
                                }}
                                className={({ isActive }) => {
                                    return (
                                        "flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark rounded-lg " +
                                        (isActive ? "bg-primary-light dark:bg-primary-dark" : "")
                                    );
                                }}
                            >
                                {theme !== "dark" ? (
                                    <img
                                        src={BookIcon}
                                        alt="Book icon"
                                        className="stroke-primary-dark dark:stroke-primary-light"
                                    />
                                ) : (
                                    <svg
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22.5 16.7397V4.6697C22.5 3.4697 21.52 2.5797 20.33 2.6797H20.27C18.17 2.8597 14.98 3.9297 13.2 5.0497L13.03 5.1597C12.74 5.3397 12.26 5.3397 11.97 5.1597L11.72 5.0097C9.94 3.8997 6.76 2.8397 4.66 2.6697C3.47 2.5697 2.5 3.4697 2.5 4.6597V16.7397C2.5 17.6997 3.28 18.5997 4.24 18.7197L4.53 18.7597C6.7 19.0497 10.05 20.1497 11.97 21.1997L12.01 21.2197C12.28 21.3697 12.71 21.3697 12.97 21.2197C14.89 20.1597 18.25 19.0497 20.43 18.7597L20.76 18.7197C21.72 18.5997 22.5 17.6997 22.5 16.7397Z"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12.5 5.49023V20.4902"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.25 8.49023H6"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 11.4902H6"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}

                                <span className="text-soft-dark dark:text-primary-light">
                                    Learning
                                </span>
                            </NavLink>
                            <NavLink
                                to={"/user/mylearning"}
                                onClick={() => {
                                    if (window.innerWidth < 1024)
                                        handleSideBarToggle();
                                }}
                                className={({ isActive }) => {
                                    return (
                                        "flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark rounded-lg " +
                                        (isActive ? "bg-primary-light dark:bg-primary-dark" : "")
                                    );
                                }}
                            >
                                {theme !== "dark" ? (
                                    <img
                                        src={BookIcon}
                                        alt="Book icon"
                                        className="stroke-primary-dark dark:stroke-primary-light"
                                    />
                                ) : (
                                    <svg
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22.5 16.7397V4.6697C22.5 3.4697 21.52 2.5797 20.33 2.6797H20.27C18.17 2.8597 14.98 3.9297 13.2 5.0497L13.03 5.1597C12.74 5.3397 12.26 5.3397 11.97 5.1597L11.72 5.0097C9.94 3.8997 6.76 2.8397 4.66 2.6697C3.47 2.5697 2.5 3.4697 2.5 4.6597V16.7397C2.5 17.6997 3.28 18.5997 4.24 18.7197L4.53 18.7597C6.7 19.0497 10.05 20.1497 11.97 21.1997L12.01 21.2197C12.28 21.3697 12.71 21.3697 12.97 21.2197C14.89 20.1597 18.25 19.0497 20.43 18.7597L20.76 18.7197C21.72 18.5997 22.5 17.6997 22.5 16.7397Z"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12.5 5.49023V20.4902"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.25 8.49023H6"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 11.4902H6"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}

                                <span className="text-soft-dark dark:text-primary-light">
                                    My Learning
                                </span>
                            </NavLink>
                            <NavLink
                                to={"/user/practice"}
                                onClick={() => {
                                    if (window.innerWidth < 1024)
                                        handleSideBarToggle();
                                }}
                                className={({ isActive }) => {
                                    return (
                                        "flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark rounded-lg " +
                                        (isActive ? "bg-primary-light dark:bg-primary-dark" : "")
                                    );
                                }}
                            >
                                {theme !== "dark" ? (
                                    <img
                                        src={SuitcaseIcon}
                                        alt="Suitcase Icon"
                                        className="stroke-primary-dark dark:stroke-primary-light"
                                    />
                                ) : (
                                    <svg
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.5008 22H16.5008C20.5208 22 21.2408 20.39 21.4508 18.43L22.2008 10.43C22.4708 7.99 21.7708 6 17.5008 6H7.5008C3.2308 6 2.5308 7.99 2.8008 10.43L3.5508 18.43C3.7608 20.39 4.4808 22 8.5008 22Z"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.5 6V5.2C8.5 3.43 8.5 2 11.7 2H13.3C16.5 2 16.5 3.43 16.5 5.2V6"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14.5 13V14C14.5 14.01 14.5 14.01 14.5 14.02C14.5 15.11 14.49 16 12.5 16C10.52 16 10.5 15.12 10.5 14.03V13C10.5 12 10.5 12 11.5 12H13.5C14.5 12 14.5 12 14.5 13Z"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M22.15 11C19.84 12.68 17.2 13.68 14.5 14.02"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M3.11914 11.2695C5.36914 12.8095 7.90914 13.7395 10.4991 14.0295"
                                            stroke="#ECECEC"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}

                                <span className="text-soft-dark dark:text-primary-light">
                                    Practice
                                </span>
                            </NavLink>
                            <div
                                onClick={logUserOut}
                                className="flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark rounded-lg cursor-pointer"
                            >
                                <IoIosLogOut
                                    size={25}
                                    color={
                                        theme === "dark" ? "#ECECEC" : "#212121"
                                    }
                                />
                                <span className="text-soft-dark dark:text-primary-light">
                                    Logout
                                </span>
                            </div>
                        </ul>
                    </nav>
                </div>
                <div
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    aria-label="Theme Switcher"
                    className="cursor-pointer flex items-center gap-2 p-2 hover:shadow"
                >
                    {theme === "dark" ? (
                        <IoMoonOutline className="hover:text-gray-400 dark:text-[#F9F9F9] dark:hover:text-primary-light " />
                    ) : (
                        <MdOutlineWbSunny className="text-ternary-dark dark:text-[#F9F9F9] text-xl" />
                    )}
                    <span className="leading-[20px] text-sm text-[#0D0D0D] dark:text-primary-light">
                        Change to {theme === "dark" ? "Light" : "Dark"} mode
                    </span>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

SideBar.propTypes = {
    toggleSideBar: PropTypes.func,
};

export default SideBar;
