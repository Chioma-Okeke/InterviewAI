// import React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "../reusables/Button";
import { CircularProgress } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { UserAuthentication } from "../../services/AuthServices";
import FormInput from "../reusables/FormInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HiddenInput from "../reusables/HiddenInput";
import CustomTextField from "../reusables/CustomInputs";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

function AuthForm({ buttonText, authGate }) {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showOtherFields, setShowOtherFields] = useState(false);
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const { login, setToken, logout, isAuthenticated } =
        useContext(AuthContext);
    const [theme, setTheme] = useThemeSwitcher();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/user/dashboard";

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    async function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true);
        const userAuthentication = new UserAuthentication();
        try {
            let res;
            if (authGate === "registering") {
                res = await userAuthentication.signUp(formData, {
                    setToken,
                    logout,
                });
                console.log(res, "response");
                if (res.status === "success") {
                    toast.success(res.msg);
                    navigate("/auth/verifyemail");
                }
            } else {
                res = await userAuthentication.login(formData);
                console.log(res);
                toast.success("You have successfully signed in.");
                login(
                    res.data.tokens.accessToken,
                    res.data.tokens.refreshToken,
                    res.data.user.userId
                );
                // if (res.data.user.newUser) {
                //     navigate("/auth/onboarding");
                // } else {
                navigate(from, { replace: true });
                // }
            }
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Error when authenticating user"
            );
        } finally {
            setIsLoading(false);
        }
    }

    function isEmailValid(email) {
        return emailRegex.test(email);
    }

    return (
        <div>
            <form onSubmit={(e) => handleLogin(e)}>
                <CustomTextField
                    label="Email address"
                    labelFor="email"
                    inputId="email"
                    inputName="email"
                    placeholder="Enter your username"
                    helperText="This is a required field"
                    inputType="text"
                    className="border-[1.5px] border-[#C5C6CB] dark:border-ternary-light py-3 px-2 rounded-[15px] h-[60px]"
                    ariaLabelName="Email"
                    inputValue={formData.email}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prevState) => ({
                            ...prevState,
                            [e.target.name]: value,
                        }));
                        if (isEmailValid(value)) {
                            setShowOtherFields(true);
                        }
                    }}
                    isRequired={true}
                />
                {showOtherFields && (
                    <div>
                        <HiddenInput
                            label="Password"
                            labelFor="password"
                            inputId="password"
                            inputName="password"
                            placeholder="Enter your password"
                            helperText="Invalid email address"
                            inputType="password"
                            ariaLabelName="Password"
                            inputValue={formData.password}
                            // error
                            isPasswordField={true}
                            isRequired={true}
                            className="border-[1.5px] border-[#C5C6CB] dark:border-ternary-light py-3 px-2 rounded-[15px] h-[60px]"
                            onChange={handleChange}
                            formGroupClass="mt-5"
                        />
                        {authGate === "registering" && (
                            <HiddenInput
                                label="Confirm password"
                                labelFor="confirmPassword"
                                inputId="confirmPassword"
                                inputName="confirmPassword"
                                placeholder="Confirm your password"
                                helperText="Invalid email address"
                                inputType="password"
                                ariaLabelName="Confirm Password"
                                inputValue={formData.confirmPassword}
                                // error
                                isPasswordField={true}
                                isRequired={true}
                                className="border-[1.5px] border-[#C5C6CB] dark:border-ternary-light py-3 px-2 rounded-[15px] h-[60px]"
                                onChange={handleChange}
                                formGroupClass="mt-5"
                            />
                        )}
                    </div>
                )}
                <Button className="w-full mt-8 mb-6 text-white py-[18px] px-5 rounded-[15px] bg-[#3D9963] h-[60px]">
                    {isLoading ? (
                        <CircularProgress color="#ffffff" size={20} />
                    ) : (
                        buttonText
                    )}
                </Button>
            </form>
            <ToastContainer />
        </div>
    );
}

AuthForm.propTypes = {
    setShowModal: PropTypes.func,
};

export default AuthForm;
