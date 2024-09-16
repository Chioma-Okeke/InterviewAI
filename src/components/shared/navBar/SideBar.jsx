import { NavLink } from "react-router-dom";
import PropTypes from "prop-types"

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
    const dispatch = useDispatch()

    function handleSideBarToggle() {
            dispatch(toggleNavBar())
    }

    return (
            <section
                className=" py-10 pl-6 pr-6 h-screen"
            >
                <div
                    className="mb-12 cursor-pointer hover:scale-105 w-fit"
                    onClick={handleSideBarToggle}
                >
                    <img
                        src={bigScreenNavIcon}
                        alt="Nav open icon"
                        className="stroke-primary-dark dark:stroke-primary-light hidden lg:block"
                        style={{
                            stroke: theme === "dark" ? "#ECECEC" : "#212121",
                        }}
                    />
                    <img
                        src={MobNavIcon}
                        alt="Nav open icon"
                        className="stroke-primary-dark dark:stroke-primary-light block lg:hidden"
                    />
                </div>
                <nav>
                    <ul>
                        <NavLink to={"/"} className={({isActive}) => {
                            return (
                                "flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark " + (isActive ? "dark:bg-primary-dark" : "")
                            )
                        }}>
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
                        <NavLink to={"/learning"} className={({isActive}) => {
                            return (
                                "flex items-center gap-3 mb-4 p-2 dark:hover:bg-primary-dark " + (isActive ? "dark:bg-primary-dark" : "")
                            )
                        }}>
                            <img
                                src={BookIcon}
                                alt="Book icon"
                                className="stroke-primary-dark dark:stroke-primary-light"
                            />
                            <span className="text-primary-dark dark:text-primary-light">
                                Learning
                            </span>
                        </NavLink>
                        <NavLink to={"/practice"} className={({isActive}) => {
                            return (
                                "flex items-center gap-3 p-2 dark:hover:bg-primary-dark " + (isActive ? "dark:bg-primary-dark" : "")
                            )
                        }}>
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
    toggleSideBar: PropTypes.func
}

export default SideBar;
