import { Link } from "react-router-dom";
// import GoogleButton from "../../components/reusable/GoogleButton";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
// import SignUpForm from "../../components/authComponents/SignUpForm";
import AuthForm from "../components/authComponents/AuthForm";
import Logo from "../assets/logo.svg";
import LogoDark from "../assets/logo-black-white.svg";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import OnBoardingForm from "../components/forms/OnBoardingForm";

function OnBoarding() {
    const [theme, setTheme] = useThemeSwitcher();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
            className="w-full md:min-h-[100vh] pt-[60px] sm:flex justify-center pb-5"
        >
            <div className="sm:w-[50%] max-w-[384px] mx-auto">
                <div>
                    <div className="flex items-center flex-col gap-11 mb-[72px]">
                        {theme === "dark" ? (
                            <img
                                src={LogoDark}
                                alt="Dark Logo"
                                className="w-[38.28px]"
                            />
                        ) : (
                            <img
                                src={Logo}
                                alt="Light Logo"
                                className="w-[38.28px]"
                            />
                        )}
                        <h2 className="text-2xl text-center text-primary-dark dark:text-primary-light">
                            We’d love to know you
                        </h2>
                    </div>
                    <div>
                        <OnBoardingForm />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default OnBoarding;
