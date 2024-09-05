// import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../../components/shared/layout/Container";
import ForgotPasswordForm from "../../components/authComponents/ForgotPasswordForm";

function ForgotPassword() {
    return (
        <Container>
            {/* <LogoNav /> */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[50%] lg:w-[40%]"
            >
                <div className="border p-6 shadow-xl rounded-2xl">
                    <h1 className="font-bold text-2xl lg:text-3xl mb-1 text-center">
                        Forgot Password?
                    </h1>
                    <p className="text-[#475367] text-sm md:text-base w-full mx-auto text-center mb-5">
                        Don’t worry, resetting your password is easy. Just enter
                        your email address.
                    </p>
                    <ForgotPasswordForm />
                    <p className="text-[#B3B1B1] text-sm text-center mt-5">
                        Do you remember your password?{" "}
                        <span className="font-semibold underline text-[#00dd00]">
                            <Link to="/login">Try Logging in</Link>
                        </span>
                    </p>
                </div>
            </motion.section>
        </Container>
    );
}

export default ForgotPassword;