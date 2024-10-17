import React from "react";
// import { toast } from "react-toastify";
import FormInput from "../reusables/FormInput";
import Button from "../reusables/Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import UserAuthentication from "../../services/AuthServices";
// import FetchClient from "../../ServiceClients/FetchClient";

function ForgotPasswordForm() {
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
        //     await authenticateUser.resetPassword(formData)
        //     toast.success("You will receive an email shortly")
        //     navigate("/changepassword")
        // } catch (err) {
        //     console.error(err)
        //     toast.error("There was an error while resetting your password. Try again.")
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
                {/* <PhoneNumber />
        <HiddenInput /> */}
                <Button className="w-full md:text-base text-white font-semibold px-6 py-4 rounded-md bg-[#00dd00]">
                    Send Email
                </Button>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;
