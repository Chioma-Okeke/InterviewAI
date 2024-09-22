// import React from 'react'

import { Link } from "react-router-dom";
// import GoogleButton from "../../components/reusable/GoogleButton";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import Container from "../../components/shared/layout/Container";
import { IoMdCloseCircle } from "react-icons/io";
// import SignUpForm from "../../components/authComponents/SignUpForm";
import AuthForm from "../../components/authComponents/AuthForm";
import Logo from "../../assets/logo.svg";
import LogoDark from "../../assets/logo-black-white.svg";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import ThirdPartyAuthForm from "../../components/authComponents/ThirdPartyAuthForm";

function SignUp() {
    const [theme, setTheme] = useThemeSwitcher();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
            className="w-full md:min-h-[100vh] pt-[60px] pb-[45px] sm:flex justify-center"
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
                            Create an account
                        </h2>
                    </div>
                    <div>
                        <AuthForm
                            authGate="registering"
                            buttonText="Create an account"
                        />
                        {/* <LogForm /> */}
                        <p className="text-[#3B3B3B] dark:text-ternary-light flex justify-center gap-1 w-full">
                            Already have an account?
                            <span className="text-[#3D9963]">
                                <Link to="/auth/login">Login</Link>
                            </span>
                        </p>
                    </div>
                    <div className="relative h-[22px] flex flex-col justify-center my-6">
                        <div className="border border-[#C5C6CB] dark:border-ternary-light"></div>
                        <span className="text-[#000000] dark:text-primary-light absolute left-1/2 -translate-x-1/2 bg-white dark:bg-primary-dark py-1 px-3">
                            OR
                        </span>
                    </div>
                </div>
                <ThirdPartyAuthForm />
            </div>
        </motion.div>
    );
}

export default SignUp;
