import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfileSelectionModal from "../modals/ProfileSelectionModal";
import { SlOptionsVertical } from "react-icons/sl";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { FaPlus } from "react-icons/fa";
import Button from "../reusables/Button";
import { useNavigate } from "react-router-dom";
import { UserServices } from "../../services/UserServices";
import DialogBox from "../reusables/DialogBox";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import DescriptionModal from "../modals/DescriptionModal";

const columnsClass = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "2xl:grid-cols-4",
    // Add more as needed
};

const ExistingProfiles = ({ userProfiles, fetchData }) => {
    const [isCreateRequested, setIsCreateRequested] = useState(false);
    const [isDeleteRequested, setIsDeleteRequested] = useState(false);
    const gridColumns = userProfiles.length + 1;
    const [theme, setTheme] = useThemeSwitcher();
    const navigate = useNavigate();
    const [selectedProfile, setSelectedProfile] = useState({});
    const [profileToDelete, setProfileToDelete] = useState("");
    const [description, setDescription] = useState("");
    const [isProfileSelected, setIsProfileSelected] = useState(false);
    const { token } = useContext(AuthContext);
    const [descriptionGenerationData, setDescriptionGenerationData] = useState(
        {}
    );

    const enableButton = Object.keys(selectedProfile).length > 0;

    const nextPage = useCallback(() => {
        navigate("/user/practice/interviewmethods", {
            state: { selectedProfile: selectedProfile },
        });
    }, [navigate, selectedProfile]);

    function openDescriptionModal() {
        const { jobRole, experienceLevel, resumeUrl } = selectedProfile;
        setDescriptionGenerationData({ jobRole, experienceLevel, resumeUrl });
        setIsProfileSelected(true);
    }

    useEffect(() => {
        console.log(selectedProfile, "selected");
    }, [selectedProfile]);

    useEffect(() => {
        console.log(profileToDelete, "profile to delete");
    }, [profileToDelete]);

    const selectProfile = (profile) => {
        setSelectedProfile(profile);
    };

    const handleCreateProfileClick = () => {
        setIsCreateRequested(true);
    };

    async function deleteJobProfile() {
        const userServices = new UserServices();
        console.log(token, "tok");
        try {
            const response = await userServices.deleteJobProfile(
                profileToDelete,
                token
            );
            console.log(response, "resp");
            toast.success("Job Profile successfully deleted.");
            fetchData();
        } catch (error) {
            toast.error(error.message);
        }
    }

    function openDelete(event) {
        event.stopPropagation();
        console.log(event);
        const profileId = event.currentTarget.id;
        setProfileToDelete(profileId);
        console.log(profileId);
        setIsDeleteRequested(true);
    }

    function closeDelete() {
        setIsDeleteRequested(false);
        setProfileToDelete();
    }

    return (
        <main className="px-5 lg:px-8">
            <p className="text-primary-dark dark:text-ternary-light text-[18px] leading-[22.5px]">
                Use any of your existing profile to generate Interview
            </p>
            <div
                className={`grid grid-cols-2 lg:grid-cols-3 ${
                    columnsClass[gridColumns]
                } ${
                    userProfiles.length >= 3
                        ? "gap-[52px] lg:gap-[72px]"
                        : "gap-20"
                } mt-14 lg:mt-[114px] mb-10 lg:mb-24 w-fit mx-auto`}
            >
                {userProfiles.map((profile) => {
                    return (
                        <div
                            key={profile._id} // Use a unique identifier if available
                            className={`relative dark:bg-hover-dark w-[155px] h-[128px] lg:w-[221px] lg:h-[183px] rounded-[15px] border-2 flex items-center justify-center cursor-pointer hover:border-brand-color ${
                                selectedProfile._id === profile._id
                                    ? "border-brand-color"
                                    : "border-hover-dark"
                            }`}
                            id={profile._id}
                            onClick={() => selectProfile(profile)}
                        >
                            <div
                                className="absolute top-0 right-0 pt-6 pr-4"
                                id={profile._id}
                                onClick={(event) => openDelete(event)}
                            >
                                <SlOptionsVertical
                                    color={
                                        theme === "dark" ? "#C5C6CB" : "#212121"
                                    }
                                    id={profile._id}
                                />
                            </div>
                            <p className="lg:text-[18px] leading-[22.5px] text-sm">
                                {profile.jobRole}
                            </p>
                        </div>
                    );
                })}
                <div
                    onClick={handleCreateProfileClick} // Set the function onClick
                    className="w-[155px] h-[128px] lg:w-[221px] lg:h-[183px] rounded-[15px] border-4 border-hover-dark flex items-center justify-center cursor-pointer hover:border-brand-color"
                >
                    <div className="bg-brand-color rounded-full hover:scale-110 p-2">
                        <FaPlus
                            color={theme === "dark" ? "#ECECEC" : "#212121"}
                        />
                    </div>
                </div>
            </div>
            <div className="w-fit mx-auto">
                <Button
                    className={`bg-brand-color text-white rounded-lg py-2 px-10 transition-opacity duration-500 ${
                        enableButton ? "opacity-100" : "opacity-40"
                    }`}
                    disable={!enableButton}
                    onClick={!description ? openDescriptionModal : nextPage}
                >
                    Next
                </Button>
            </div>
            {isProfileSelected && (
                <DescriptionModal
                    setIsProfileSelected={setIsProfileSelected}
                    descriptionGenerationData={descriptionGenerationData}
                    setDescription={setDescription}
                />
            )}
            {isCreateRequested && (
                <ProfileSelectionModal
                    fetchData={fetchData}
                    setIsCreateRequested={setIsCreateRequested}
                />
            )}
            {isDeleteRequested && (
                <DialogBox
                    message="Are you sure you wish to delete job profile"
                    okText="Delete"
                    cancelText="Cancel"
                    close={closeDelete}
                    handleSubmission={deleteJobProfile}
                />
            )}

            <ToastContainer />
        </main>
    );
};

ExistingProfiles.propTypes = {
    userProfiles: PropTypes.array.isRequired,
    setSelectedProfile: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default ExistingProfiles;
