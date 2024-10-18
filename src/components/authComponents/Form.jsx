import React, { useContext, useEffect, useState } from "react";
import Button from "../reusables/Button";
import { CircularProgress } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { UserAuthentication } from "../../services/AuthServices";
import FormInput from "../reusables/FormInput";
import { toast} from "react-toastify";
import HiddenInput from "../reusables/HiddenInput";
import CustomTextField from "../reusables/CustomInputs";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import DOMPurify from "dompurify"; // Import DOMPurify

function AuthForm({ buttonText, authGate }) {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showOtherFields, setShowOtherFields] = useState(false);
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const { login, setToken, logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/user/dashboard";
    const [errors, setErrors] = useState({}); // State for errors

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function validateForm() {
        const newErrors = {};
        if (!formData.email || !isEmailValid(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        }
        if (authGate === "registering" && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        return newErrors;
    }

    async function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true);
        setErrors({}); 
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }
        const userAuthentication = new UserAuthentication();
        try {
            let res;
            const sanitizedFormData = {
                email: DOMPurify.sanitize(formData.email),
                password: DOMPurify.sanitize(formData.password),
                confirmPassword: authGate === "registering" ? DOMPurify.sanitize(formData.confirmPassword) : undefined,
            };

            if (authGate === "registering") {
                res = await userAuthentication.signUp(sanitizedFormData, {
                    setToken,
                    logout,
                });
                if (res.status === "success") {
                    toast.success(res.msg);
                    navigate("/auth/verifyemail");
                }
            } else {
                res = await userAuthentication.login(sanitizedFormData);
                toast.success("You have successfully signed in.");
                login(
                    res.data.tokens.accessToken,
                    res.data.tokens.refreshToken,
                    res.data.user
                );
                if (res.data.user.newUser) {
                    navigate("/auth/onboarding");
                } else {
                    navigate(from, { replace: true });
                }
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
                    helperText={errors.email || "This is a required field"}
                    inputType="text"
                    className="border-[1.5px] border-[#C5C6CB] dark:border-ternary-light py-3 px-2 rounded-[15px] h-[60px]"
                    ariaLabelName="Email"
                    inputValue={formData.email}
                    onChange={handleChange}
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
                            helperText={errors.password || ""}
                            inputType="password"
                            ariaLabelName="Password"
                            inputValue={formData.password}
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
                                helperText={errors.confirmPassword || ""}
                                inputType="password"
                                ariaLabelName="Confirm Password"
                                inputValue={formData.confirmPassword}
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
        </div>
    );
}

AuthForm.propTypes = {
    setShowModal: PropTypes.func,
};

export default AuthForm;
