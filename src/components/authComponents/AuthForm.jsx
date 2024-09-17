// import React from "react";
import { useContext, useEffect, useState } from "react";
import FormInput from "../reusables/FormInput";
import Button from "../reusables/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"
import { AuthContext } from "../../contexts/AuthContext";
import { UserAuthentication } from "../../services/AuthServices";
import FetchClient from "../../serviceClients/FetchClient";
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HiddenInput from "../reusables/HiddenInput";
import CustomTextField from "../reusables/CustomInputs";

function AuthForm({ buttonText, authGate }) {
    const [formData, setFormData] = useState({});
    const [showOtherFields, setShowOtherFields] = useState(false);
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const { login, setToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    console.log(buttonText, authGate);

    const from =
        location.state?.from?.pathname ||
        sessionStorage.getItem("redirectBackTo");

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    async function handleLogin(e) {
        e.preventDefault();
        console.log(formData, "data");

        const userAuthentication = new UserAuthentication(FetchClient);

        try {
            let res;
            if (authGate === "registering") {
                res = await userAuthentication.signUp(formData, {setToken, logout});
                console.log(res, "response");
                if (res.status === 201) {
                    toast.success("You have successfully signed up.");
                    navigate("/login");
                }
            } else {
                res = await userAuthentication.login(formData);
                // const data = await res.json()
                console.log(res, "response");
                if (res.status === 200) {
                    toast.success("You have successfully signed in.");
                    login(
                        res.data.tokens.accessToken,
                        res.data.tokens.refreshToken,
                        res.data.user._id
                    );
                    navigate(from);
                }
            }
        } catch (err) {
            console.error(err);
            toast.error(`There was a problem when ${authGate} in.`);
        }
    }

    useEffect(() => {
        console.log(sessionStorage.getItem("redirectBackTo"));
        // Clear the stored URL if the user navigates away from the sign-in page
        return () => {
            sessionStorage.removeItem("redirectBackTo");
        };
    }, []);

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
                    className="border-[1.5px] border-[#C5C6CB] py-3 px-2 rounded-[15px]"
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
                            className="border-[1.5px] border-[#C5C6CB] py-3 px-2 rounded-[15px]"
                            onChange={handleChange}
                            formGroupClass="mt-5"
                        />
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
                            className="border-[1.5px] border-[#C5C6CB] py-3 px-2 rounded-[15px]"
                            onChange={handleChange}
                            formGroupClass="mt-5"
                        />
                    </div>
                )}
                <Button className="w-full mt-8 mb-6 text-white py-[18px] px-5 rounded-[15px] bg-[#3D9963]">
                    {buttonText}
                </Button>

                {/* <span className="text-end italic font-medium text-sm float-end mb-5">
                    <Link to="/forgotpassword" className="hover:underline">
                        Forgot Password?
                    </Link>
                </span> */}
            </form>
            <ToastContainer />
        </div>
    );
}

AuthForm.propTypes = {
    setShowModal: PropTypes.func,
};

export default AuthForm;
