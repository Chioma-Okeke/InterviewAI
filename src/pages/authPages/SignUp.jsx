// import React from 'react'

import { Link } from "react-router-dom";
// import GoogleButton from "../../components/reusable/GoogleButton";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import Container from "../../components/shared/layout/Container";
import { IoMdCloseCircle } from "react-icons/io";
import SignUpForm from "../../components/authComponents/SignUpForm";

function SignUp() {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
                className="flex w-full md:min-h-[100vh] flex-col md:flex-row md:py-8"
            >
                <div className="hidden md:flex flex-col justify-center flex-1 bg-white rounded-3xl">
                    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                    <Player
                        src="https://lottie.host/6b359e4c-8965-461d-bceb-362af88cf21f/Bu5B6ELdRu.json"
                        background="#FFFFFF"
                        speed="1"
                        style={{ width: "100%", height: "500px" }}
                        loop
                        controls
                        autoplay
                        direction="1"
                        mode="normal"
                    ></Player>
                    <p className="font-light text-md w-[90%] lg:w-[70%] mx-auto">
                        Unlock your personalized path to career success. Join
                        InterviewAI to master the art of job hunting with
                        AI-powered guidance tailored just for you. today—your
                        next great find is just around the corner!
                    </p>
                </div>
                <div className="flex-1 w-full flex flex-col justify-center">
                    <div className="p-5 lg:py-5 lg:px-20">
                        <div className="border-[#E4E7EC] border-2 border-solid rounded-xl p-5 lg:p-10 bg-white sm:w-[80%] mx-auto md:w-full">
                            <h2 className="font-semibold text-2xl lg:text-[28px] leading-9 text-center 
                            ">
                                Create a new account
                            </h2>
                            <p className="text-base text-center text-[#475367] mb-5">
                                It&apos;s quick and easy.
                            </p>
                            <SignUpForm />
                            <p className="text-[#B3B1B1] text-sm text-center mt-5">
                                Already have an account?{" "}
                                <span className="font-semibold underline text-[#00dd00]">
                                    <Link to="/login">Sign in</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <Link to={"/"} className="flex justify-end">
                    <IoMdCloseCircle
                        size={40}
                        cursor={"pointer"}
                        className="bg-white rounded-full transition ease-in-out hover:scale-110 duration-300"
                    />
                </Link>
            </motion.div>
        </Container>
    );
}

export default SignUp;
