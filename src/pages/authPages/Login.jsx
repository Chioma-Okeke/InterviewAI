// import React from 'react'

import { Link } from "react-router-dom";
// import PhoneImage from "../../assets/Phoneimages.png";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import Container from "../../components/shared/layout/Container";
import { IoMdCloseCircle } from "react-icons/io";
import LogInForm from "../../components/authComponents/LogInForm";

function LogIn() {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
                className="flex w-full md:min-h-[100vh] flex-col md:flex-row md:py-8"
            >
                <div className="hidden md:flex flex-col justify-center flex-1 bg-white">
                    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                    <Player
                        src="https://lottie.host/6b359e4c-8965-461d-bceb-362af88cf21f/Bu5B6ELdRu.json"
                        background="#FFFFFF"
                        speed="1"
                        style={{ width: "100%", height: "400px" }}
                        loop
                        controls
                        autoplay
                        direction="1"
                        mode="normal"
                    ></Player>
                    <p className="font-light text-md w-[70%] mx-auto">
                        Welcome back! Ready to continue your journey to landing
                        the perfect job? Log in to access your personalized job
                        hunt roadmap and practice tools, powered by AI to help
                        you succeed
                    </p>
                </div>
                <div className="flex-1 w-full flex flex-col justify-center">
                    <div className="p-5 lg:py-5 lg:px-20">
                        <div className="border-[#E4E7EC] border-2 border-solid rounded-xl p-5 lg:p-10 bg-white sm:w-[80%] mx-auto md:w-full">
                            <h2 className="font-semibold text-2xl lg:text-3xl leading-9 text-center mb-5">
                                Welcome back
                            </h2>
                            <LogInForm />
                            <p className="text-[#B3B1B1] text-sm text-center mt-5">
                                Don&apos;t have an account?{" "}
                                <span className="font-semibold underline text-[#00dd00]">
                                    <Link to="/signup">Sign up</Link>
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

export default LogIn;
