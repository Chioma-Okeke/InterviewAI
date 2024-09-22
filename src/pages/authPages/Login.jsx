// import React from 'react'

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "../../assets/logo.svg";
import LogoDark from "../../assets/logo-black-white.svg";
import AuthForm from "../../components/authComponents/AuthForm";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import ThirdPartyAuthForm from "../../components/authComponents/ThirdPartyAuthForm";

function LogIn() {
    const [theme, setTheme] = useThemeSwitcher();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
            className="w-full md:min-h-[100vh] pt-[60px] sm:flex justify-center"
        >
            <div className="sm:w-[50%] max-w-[384px] mx-auto">
                <div className="mb-6">
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
                            Welcome to InterviewAI
                        </h2>
                    </div>
                    <div>
                        <AuthForm authGate="signing" buttonText="Login" />
                        {/* <LogForm /> */}
                        <p className="text-[#3B3B3B] dark:text-ternary-light flex justify-center gap-1 w-full">
                            Don&apos;t have an account?{" "}
                            <span className="text-[#3D9963]">
                                <Link to="/auth">Sign up</Link>
                            </span>
                        </p>
                    </div>
                    <div className="relative h-[22px] flex flex-col justify-center my-6">
                        <div className="border-[1.2px] border-[#C5C6CB] dark:border-ternary-light"></div>
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

export default LogIn;
