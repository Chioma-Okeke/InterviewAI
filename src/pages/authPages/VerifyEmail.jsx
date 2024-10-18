import React from "react";
import { toast } from "react-toastify";
import Container from "../../components/shared/layout/Container";
import { motion } from "framer-motion";
import Logo from "../../assets/logo.svg";
import LogoDark from "../../assets/logo-black-white.svg";
import Envelop from "../../assets/verification-image.png";
import Button from "../../components/reusables/Button";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { UserAuthentication } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
    const [theme] = useThemeSwitcher();
    const navigate = useNavigate()

    async function verifyUser() {
        const userAuthentication = new UserAuthentication();
        try {
            const response = await userAuthentication.verifyEmail()
            if (response.status === "success") {
                toast.success(response.msg)
                navigate('/auth/login')
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || "Something went wrong")
        }
    }

    return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.6, delay: 0.2 }}
                className="w-full md:min-h-[100vh] pt-[60px] pb-5 sm:flex justify-center"
            >
                <div className="sm:w-[50%] max-w-[704px] mx-auto">
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
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col items-center gap-6 mb-[60px] text-primary-dark dark:text-primary-light">
                                <img
                                    src={Envelop}
                                    alt="Envelop Image"
                                    className="w-20"
                                />
                                <h2 className="text-2xl">
                                    Verify your email address
                                </h2>
                            </div>
                            <div className="text-center flex flex-col gap-2 text-primary-dark dark:text-primary-light">
                                <p className="hidden sm:block">
                                    You’ve entered israelogundiran5a@gmail.com
                                    as the email address for your account
                                </p>
                                <p>
                                    Please verify your email address by clicking
                                    the button below
                                </p>
                            </div>
                            <Button onClick={verifyUser} className="w-full mt-8 mb-6 text-white py-[18px] px-5 rounded-[15px] bg-[#3D9963] max-w-[300px] mx-auto">
                                Verify your email
                            </Button>
                            <p className="text-[#3B3B3B] dark:text-ternary-light text-sm flex justify-center gap-1 w-full mt-[118px]">
                                Didn’t receive the email?{" "}
                                <span className="text-[#3D9963]">
                                   Click to resend
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
    );
}

export default VerifyEmail;
