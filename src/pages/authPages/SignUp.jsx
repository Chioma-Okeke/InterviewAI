// import React from 'react'

import { Link } from "react-router-dom";
// import GoogleButton from "../../components/reusable/GoogleButton";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import Container from "../../components/shared/layout/Container";
import { IoMdCloseCircle } from "react-icons/io";
// import SignUpForm from "../../components/authComponents/SignUpForm";
import AuthForm from "../../components/authComponents/AuthForm";
import Logo from "../../assets/logo.svg"

function SignUp() {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
                className="w-full md:min-h-[100vh] pt-[60px] sm:flex justify-center"
            >
                <div className="sm:w-[50%] max-w-[384px] mx-auto">
                    <div>
                        <div className="flex items-center flex-col gap-11 mb-[72px]">
                            <img src={Logo} alt="" />
                            <h2 className="text-2xl text-center">
                                Create an account
                            </h2>
                        </div>
                        <div>
                            <AuthForm authGate="registering" buttonText="Create an account"/>
                            {/* <LogForm /> */}
                            <p className="text-[#3B3B3B] flex justify-center gap-1 w-full">
                                Already have an account?
                                <span className="text-[#3D9963]">
                                    <Link to="/login">Login</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Container>
    );
}

export default SignUp;
