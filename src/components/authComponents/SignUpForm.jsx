// import React from "react";
import { useState } from "react";
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from "../reusables/FormInput";
import Button from "../reusables/Button";

function SignupForm() {
    const [formData, setFormData] = useState({});

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

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData, "data");
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormInput
                    inputLabel="First Name"
                    labelFor="firstName"
                    inputType="text"
                    inputId="firstName"
                    inputName="firstName"
                    placeholderText="Enter your first name"
                    ariaLabelName="First Name"
                    inputValue={formData.name}
                    onChange={(e) => handleChange(e)}
                    isRequired={true}
                    className="w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5"
                />
                <FormInput
                    inputLabel="Last Name"
                    labelFor="lastName"
                    inputType="text"
                    inputId="lastName"
                    inputName="lastName"
                    placeholderText="Enter your last name"
                    ariaLabelName="Name"
                    inputValue={formData.name}
                    onChange={(e) => handleChange(e)}
                    isRequired={true}
                    className="w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5"
                />
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
                    isRequired={true}
                    className="w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5"
                />
                <FormInput
                    inputLabel="Password"
                    labelFor="password"
                    inputType="password"
                    inputId="password"
                    inputName="password"
                    placeholderText="Enter your password"
                    ariaLabelName="Password"
                    inputValue={formData.password}
                    onChange={(e) => handleChange(e)}
                    isRequired={true}
                    showPasswordRequirement={true}
                    className="w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow"
                />
                {/* <PhoneNumber />
        <HiddenInput /> */}
                <Button className="w-full md:text-base text-white font-semibold px-6 py-4 rounded-md mt-5 bg-[#00dd00]">
                    Sign up
                </Button>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default SignupForm;
