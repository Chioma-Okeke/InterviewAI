import LogoDark from "../../assets/logo-black-white.svg";
import LogoLight from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { CgProfile } from "react-icons/cg";
import { toggleNavBar } from "../../store/navSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../reusables/Button";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function AppHeader() {
    const dispatch = useDispatch();
    const isSideBarVisible = useSelector((state) => state.nav.showNavBar);
    const [theme, setTheme] = useThemeSwitcher();
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    function toggleSideBar() {
        dispatch(toggleNavBar());
    }

    const navigateToUserProfile = () => {
        navigate("/user/profile");
    };

    return (
        <header className="px-8 py-7">
            <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 lg:gap-8">
                    {!isSideBarVisible && (
                        <div
                            onClick={toggleSideBar}
                            className="cursor-pointer hover:scale-105"
                        >
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#212121"
                                }
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
                                stroke={
                                    theme === "dark" ? "#ECECEC" : "#212121"
                                }
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
                        className="flex items-center gap-2 flex-1 justify-center lg:justify-start"
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
                        <p className="text-primary-dark dark:text-primary-light text-[20px] leading-[25px]">
                            InterviewAI
                        </p>
                    </Link>
                </div>
                {isAuthenticated ? (
                    <div
                        className="hidden lg:block cursor-pointer"
                        onClick={navigateToUserProfile}
                    >
                        <CgProfile
                            size={40}
                            className="text-primary-dark dark:text-primary-light"
                        />
                    </div>
                ) : (
                    <div className="flex gap-4 items-center">
                        <Link to={"/auth/login"}>
                            <Button className="bg-white rounded-3xl w-[85px] leading-[20px] h-10">
                                Log in
                            </Button>
                        </Link>
                        <Link to={"/auth"}>
                            <Button className="hidden lg:block bg-transparent rounded-3xl px-[15px] h-10 leading-[20px] text-primary-dark dark:text-primary-light border-[0.2px] dark:border-[#6C757D]">
                                Create an account
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default AppHeader;
