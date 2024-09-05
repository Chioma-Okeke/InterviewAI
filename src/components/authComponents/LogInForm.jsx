// import React from "react";
import { useEffect, useState } from "react";
import FormInput from "../reusables/FormInput";
import Button from "../reusables/Button";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"
// import { AuthContext } from "../../context/AuthContext";
// import UserAuthentication from "../../services/AuthServices";
// import FetchClient from "../../ServiceClients/FetchClient";
// import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HiddenInput from "../reusables/HiddenInput";

function LogInForm({ setShowModal }) {
    const [formData, setFormData] = useState({});
    // const { login } = useContext(AuthContext);
    // const navigate = useNavigate();
    // const location = useLocation();

    // const from =
    //     location.state?.from?.pathname ||
    //     sessionStorage.getItem("redirectBackTo") ||
    //     "/listings";

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
        setShowModal(true);
        // const userAuthentication = new UserAuthentication(FetchClient);
        // try {
        //     const res = await userAuthentication.authenticateUser(formData);
        //     // const data = await res.json()
        //     console.log(res, "response");
        //     if (res.status === 201) {
        //         toast.success("You have successfully signed in.");
        //         navigate(from);
        //         login(res.data.token, res.data.user);
        //     }
        // } catch (err) {
        //     console.error(err);
        //     toast.error("There was a problem when logging in.");
        // }
    }

    useEffect(() => {
        console.log(sessionStorage.getItem("redirectBackTo"));
        // Clear the stored URL if the user navigates away from the sign-in page
        return () => {
            sessionStorage.removeItem("redirectBackTo");
        };
    }, []);

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                <HiddenInput
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
                    className="w-full p-2 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:shadow mb-5"
                />
                {/* <PhoneNumber />
        <HiddenInput /> */}
                <span className="text-end italic font-medium text-sm float-end mb-5">
                    <Link to="/forgotpassword" className="hover:underline">
                        Forgot Password?
                    </Link>
                </span>
                <Button className="w-full md:text-base text-white font-semibold px-6 py-4 rounded-md bg-[#00dd00]">
                    Sign in
                </Button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default LogInForm;
