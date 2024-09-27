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
// import { toast } from "react-toastify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HiddenInput from "../reusables/HiddenInput";
import CustomTextField from "../reusables/CustomInputs";
import { UserServices } from "../../services/UserServices";

function OnBoardingForm({ buttonText, authGate }) {
    const [formData, setFormData] = useState({});
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const navigate = useNavigate();

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

        const userServices = new UserServices();

        try {
            const res = await userServices.updateUserProfile(formData);
            console.log(res, "response");
            if (res.success) {
                toast.success(res.msg);
                navigate("/user/dashboard");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.res?.data?.msg || "Error when authenticating user");
        }
    }
    // function isEmailValid(email) {
    //     return emailRegex.test(email);
    // }

    return (
        <div>
            <form onSubmit={(e) => handleLogin(e)}>
                <FormInput
                    label="Full Name"
                    labelFor="full Name"
                    inputId="full Name"
                    inputName="fullName"
                    placeholder="Enter your full name"
                    // helperText="This is a required field"
                    inputType="text"
                    className="border-[1.5px] border-ternary-light py-3 px-2 rounded-[15px] h-[60px] "
                    ariaLabelName="Full name"
                    inputValue={formData.fullName}
                    onChange={handleChange}
                    isRequired={true}
                    formGroupClass="mb-4"
                />
                <FormInput
                    label="Birthday"
                    labelFor="birthday"
                    inputId="birthday"
                    inputName="birthday"
                    placeholder="Enter your birthday"
                    helperText="This is a required field"
                    inputType="text"
                    className="border-[1.5px] border-ternary-light py-3 px-2 rounded-[15px] h-[60px] "
                    ariaLabelName="Birthday"
                    inputValue={formData.birthday}
                    onChange={handleChange}
                    isRequired={true}
                />
                <p className="text-primary-dark dark:text-ternary-light mt-8 mb-6 text-center text-xs">
                    By clicking “Agree”, you agree to our{" "}
                    <span className="text-brand-color underline">Terms</span>{" "}
                    and have read our{" "}
                    <span className="text-brand-color underline">
                        Privacy Policy
                    </span>
                </p>
                <Button className="w-full text-white py-[18px] px-5 rounded-[15px] bg-[#3D9963]">
                    Agree
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

OnBoardingForm.propTypes = {
    setShowModal: PropTypes.func,
};

export default OnBoardingForm;
