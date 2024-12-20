import React from "react";
import FormInput from "../reusables/FormInput";
import Button from "../reusables/Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import UserAuthentication from "../../services/AuthServices";
// import FetchClient from "../../ServiceClients/FetchClient";
import HiddenInput from "../reusables/HiddenInput";
// import { toast } from "react-toastify";

function ChangePasswordForm() {
    // const navigate = useNavigate()
    const [formData, setFormData] = React.useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    async function resetPassword (e) {
        e.preventDefault()
        // const authenticateUser = new UserAuthentication(FetchClient)
        // try {
        //     await authenticateUser.changePassword(formData)
        //     toast.success("Password reset successful")
        //     navigate("/signin")
        // } catch (err) {
        //     console.error(err)
        //     toast.error("There was an error while resetting password.")
        // }
    }

    return (
        <div>
            <form onSubmit={(e) => resetPassword(e)}>
                <FormInput
                    inputLabel="Email Address"
                    labelFor="email"
                    inputType="text"
                    inputId="email"
                    inputName="email"
                    placeholderText="Enter your email address"
                    ariaLabelName="Email"
                    inputValue={formData.email}
                    onChange={(e) => handleChange(e)}
                    className="w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5"
                />
                <FormInput
                    inputLabel="Code"
                    labelFor="code"
                    inputType="text"
                    inputId="code"
                    inputName="code"
                    placeholderText="Enter code sent to your email address"
                    ariaLabelName="Code"
                    inputValue={formData.code}
                    onChange={(e) => handleChange(e)}
                    className="w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5"
                />
                <HiddenInput
                    inputLabel="New Password"
                    labelFor="password"
                    inputType="password"
                    inputId="password"
                    inputName="password"
                    placeholderText="Enter your new password"
                    ariaLabelName="Password"
                    inputValue={formData.password}
                    onChange={(e) => handleChange(e)}
                    className="w-full p-2 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5"
                />
                <HiddenInput
                    inputLabel="Confirm Password"
                    labelFor="repeatedPassword"
                    inputType="password"
                    inputId="repeatedPassword"
                    inputName="repeatedPassword"
                    placeholderText="Confirm your new password"
                    ariaLabelName="Repeated Password"
                    inputValue={formData.repeatedPassword}
                    onChange={(e) => handleChange(e)}
                    className="w-full p-2 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5"
                />
                {/* <PhoneNumber />
        <HiddenInput /> */}
                <Button className="w-full md:text-base text-white font-semibold px-6 py-4 rounded-md bg-[#00dd00]">
                    Reset Password
                </Button>
            </form>
        </div>
    );
}

export default ChangePasswordForm;
