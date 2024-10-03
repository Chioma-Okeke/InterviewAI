import React, { useContext } from "react";
import PropTypes from "prop-types";
import Button from "../../reusables/Button";
import { UserServices } from "../../../services/UserServices";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Overview({ parts }) {
    const { token, userData, updateLearningProfile } = useContext(AuthContext);

    const isExistingOnUserProfile = userData?.learningProfile.some(
        (module) => module?._id === parts.course._id
    );

    async function startCourse() {
        const userServices = new UserServices();
        try {
            const response = await userServices.addModuleToUserProfile(
                parts.course,
                token
            );
            if (response?.success) {
                updateLearningProfile({newModule: parts.course})
                toast.success("Module has been successfully added to profile.");
            } else {
                toast.error("Error while adding module to user profile.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while adding module to user profile.");
        }
    }

    return (
        <div>
            <p className="text-primary-dark dark:text-primary-light">
                {parts.courseDescription}
            </p>
            {!isExistingOnUserProfile && (
                <div className="flex justify-end mt-10">
                    <Button
                        onClick={startCourse}
                        className="text-white bg-brand-color rounded-lg p-3 border-[1.5px] border-brand-color hover:bg-transparent"
                    >
                        Start Module
                    </Button>
                </div>
            )}
        </div>
    );
}

Overview.propTypes -
    {
        parts: PropTypes.object,
    };

export default Overview;
