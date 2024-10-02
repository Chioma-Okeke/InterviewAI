import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { toast, ToastContainer } from "react-toastify";
import { useCallback, useContext, useEffect, useState } from "react";

import Button from "../reusables/Button";
import DialogBox from "../reusables/DialogBox";
import { AuthContext } from "../../contexts/AuthContext";
import { UserServices } from "../../services/UserServices";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { updateProfileData } from "../../store/interviewSlice";
import ProfileSelectionModal from "../modals/ProfileSelectionModal";

const columnsClass = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "2xl:grid-cols-4",
};

const ExistingProfiles = ({ userProfiles, fetchData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [theme] = useThemeSwitcher();
    const { token } = useContext(AuthContext);
    const gridColumns = userProfiles.length + 1;
    const [selectedProfile, setSelectedProfile] = useState({});
    const [profileToDelete, setProfileToDelete] = useState("");
    const [isCreateRequested, setIsCreateRequested] = useState(false);
    const [isDeleteRequested, setIsDeleteRequested] = useState(false);
    const [descriptionGenerationData, setDescriptionGenerationData] = useState(
        {}
    );
    const enableButton = Object.keys(selectedProfile).length > 0;

    const nextPage = useCallback(() => {
        navigate("/user/practice/descriptionselection", {
            state: { descriptionGenerationData: descriptionGenerationData },
        });
    }, [descriptionGenerationData, navigate]);

    useEffect(() => {
        window.scrollTo(0, {
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const selectProfile = (profile) => {
        const { jobRole, experienceLevel, resumeUrl } = profile;
        setSelectedProfile(profile);
        setDescriptionGenerationData({ jobRole, experienceLevel, resumeUrl });
        dispatch(
            updateProfileData({
                resumeUrl: resumeUrl,
                experienceLevel: experienceLevel,
                jobRole: jobRole,
                firstName: "Chioma",
            })
        );
    };

    const handleCreateProfileClick = () => {
        setIsCreateRequested(true);
    };

    async function deleteJobProfile() {
        const userServices = new UserServices();
        try {
            const response = await userServices.deleteJobProfile(
                profileToDelete,
                token
            );
            toast.success("Job Profile successfully deleted.");
            fetchData();
        } catch (error) {
            toast.error(error.message);
        }
    }

    function openDelete(event) {
        event.stopPropagation();
        const profileId = event.currentTarget.id;
        setProfileToDelete(profileId);
        setIsDeleteRequested(true);
    }

    function closeDelete() {
        setIsDeleteRequested(false);
        setProfileToDelete();
    }

    return (
        <main className="px-5 lg:px-8">
            {" "}
            <div>
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
                                    className="absolute top-0 right-0 pt-3 pr-3 lg:pt-6 lg:pr-4"
                                    id={profile._id}
                                    onClick={(event) => openDelete(event)}
                                >
                                    <SlOptionsVertical
                                        color={
                                            theme === "dark"
                                                ? "#C5C6CB"
                                                : "#212121"
                                        }
                                        id={profile._id}
                                    />
                                </div>
                                <p className="lg:text-[18px] leading-[22.5px] text-sm text-center">
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
                        onClick={nextPage}
                    >
                        Next
                    </Button>
                </div>
            </div>
            {isCreateRequested && (
                <ProfileSelectionModal
                    fetchData={fetchData}
                    setIsCreateRequested={setIsCreateRequested}
                />
            )}
            {isDeleteRequested && (
                <DialogBox
                    title="Delete in progress"
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
    fetchData: PropTypes.func.isRequired,
};

export default ExistingProfiles;
