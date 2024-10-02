import { useContext, useState } from "react";
import FormInput from "../reusables/FormInput";
import Button from "../reusables/Button";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";;
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserServices } from "../../services/UserServices";

function OnBoardingForm() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const {token} = useContext(AuthContext)

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
            const res = await userServices.updateUserProfile(formData, token);
            if (res.success) {
                toast.success(res.msg);
                navigate("/user/dashboard");
            }
        } catch (err) {
            toast.error(err.res?.data?.msg || "Error when authenticating user");
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleLogin(e)}>
                <FormInput
                    label="First Name"
                    labelFor="firstName"
                    inputId="firstName"
                    inputName="firstName"
                    placeholder="Enter your first name"
                    inputType="text"
                    className="border-[1.5px] border-ternary-light py-3 px-2 rounded-[15px] h-[60px] "
                    ariaLabelName="First name"
                    inputValue={formData.firstName}
                    onChange={handleChange}
                    isRequired={true}
                    formGroupClass="mb-4"
                />
                <FormInput
                    label="Last Name"
                    labelFor="lastName"
                    inputId="lastName"
                    inputName="lastName"
                    placeholder="Enter your last name"
                    helperText="This is a required field"
                    inputType="text"
                    className="border-[1.5px] border-ternary-light py-3 px-2 rounded-[15px] h-[60px] "
                    ariaLabelName="Last name"
                    inputValue={formData.lastName}
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
            </form>
            <ToastContainer />
        </div>
    );
}

OnBoardingForm.propTypes = {
    setShowModal: PropTypes.func,
};

export default OnBoardingForm;
