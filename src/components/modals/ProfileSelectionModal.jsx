import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import Input from "../reusables/Input";
import Button from "../reusables/Button";
import EditIcon from "../../assets/edit.svg";
import AddFiles from "../reusables/AddFiles";
import { AuthContext } from "../../contexts/AuthContext";
import { UserServices } from "../../services/UserServices";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

const levelsOfExperience = [
    "Intern",
    "Junior",
    "Intermediate",
    "Senior",
    "Associate",
];

function ProfileSelectionModal({ setIsCreateRequested, fetchData }) {
    const [pdfs, setPdfs] = useState([]);
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({});
    const [theme, setTheme] = useThemeSwitcher();
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isSaveInProgress, setIsSaveInProgress] = useState(false);

    const handlePdfsChange = (newPdfs) => {
        const filteredPdfs = newPdfs.filter(
            (file) => file.file.type === "application/pdf"
        );
        if (filteredPdfs.length === 0) {
            console.error("No valid PDF files found.");
            return;
        }
        setPdfs(filteredPdfs);
        setFormData((prevState) => ({
            ...prevState,
            resume: filteredPdfs[0],
        }));
    };

    function selectYears() {
        setIsDropDownOpen((prevState) => !prevState);
    }

    function handleYearsSelected(e) {
        const option = e.target.innerHTML;
        setFormData((prevState) => {
            return {
                ...prevState,
                experienceLevel: option,
            };
        });
        setIsDropDownOpen(false);
    }

    function selectedRole(e) {
        const inputtedRole = e.target.value;
        setFormData((prevState) => {
            return {
                ...prevState,
                jobRole: inputtedRole,
            };
        });
    }

    async function handleSubmit() {
        const userServices = new UserServices();
        const formDataToSend = new FormData();
        setIsSaveInProgress(true);

        formDataToSend.append("jobRole", formData.jobRole);
        formDataToSend.append("experienceLevel", formData.experienceLevel);

        if (pdfs[0]?.file) {
            formDataToSend.append("resume", pdfs[0].file);
        }

        try {
            const response = await userServices.createJobProfile(
                formDataToSend,
                token
            );
            if (response?.success) {
                toast.success("Job Profile successfully created.");
                setIsCreateRequested(false);
                fetchData();
            } else {
                toast.error(response?.mgs);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            isSaveInProgress(false);
        }
    }

    return (
        <div>
            <AnimatePresence>
                <div className="">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className=" fixed inset-0 z-[80] transition-all duration-500 "
                    >
                        {/* Modal Backdrop */}
                        <div
                            className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-30 "
                            onClick={() => setIsCreateRequested(false)}
                        ></div>

                        {/* Modal Content */}
                        <main className="flex flex-col items-center justify-center h-full w-full relative ">
                            <div className="modal-wrapper flex items-center z-30 relative xl:w-[70%] justify-center w-full">
                                <div className="rounded-xl w-[90%] mx-auto md:w-[70%] xl:max-w-3xl lg:max-w-xl md:max-w-x shadow-lg relative px-4 lg:px-8 py-5 dark:bg-primary-dark bg-secondary-light text-primary-dark dark:text-primary-light">
                                    <div className="flex flex-col gap-6">
                                        <div className="relative flex flex-col gap-2">
                                            <label htmlFor="experienceLevel">
                                                Experience Level
                                            </label>
                                            <div
                                                onClick={selectYears}
                                                className="flex items-center justify-between py-2 px-4 outline-none border border-hover-dark dark:bg-hover-dark focus:border-brand-color hover:border-brand-color"
                                            >
                                                <Input
                                                    inputName="experienceLevel"
                                                    placeholderText="Select your experience level"
                                                    inputGroupClassNames="w-[90%]"
                                                    inputValue={
                                                        formData.experienceLevel
                                                    }
                                                    inputId="experienceLevel"
                                                    ariaLabelName="Experience Level"
                                                    className="bg-transparent w-full focus:outline-none"
                                                    disabled={true}
                                                    isRequired
                                                />
                                                <IoIosArrowDown
                                                    size={20}
                                                    cursor={"pointer"}
                                                    className={`transition-transform duration-500 ${
                                                        isDropDownOpen
                                                            ? "-rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </div>
                                            {isDropDownOpen && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: "-100%",
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: "-100%",
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className="absolute bottom-0 left-0 top-full w-full"
                                                >
                                                    <ul className="border border-hover-dark dark:bg-hover-dark w-full z-30 px-3 h-40 overflow-auto">
                                                        {levelsOfExperience.map(
                                                            (level, index) => {
                                                                return (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="p-2 hover:bg-primary-dark cursor-pointer"
                                                                        onClick={
                                                                            handleYearsSelected
                                                                        }
                                                                    >
                                                                        {level}
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-1 md:text-[18px] leading-[20px] md:leading-[22.5px]">
                                                    <p>
                                                        Job Role/Position
                                                        Applying For
                                                    </p>
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </div>
                                                <div>
                                                    {!formData.jobRole && (
                                                        <Input
                                                            inputName="jobRole"
                                                            placeholderText="Enter job role"
                                                            inputGroupClassNames="w-[90%]"
                                                            inputId="jobRole"
                                                            ariaLabelName="Years of Experience"
                                                            onBlur={
                                                                selectedRole
                                                            }
                                                            className="outline-none border border-hover-dark dark:bg-hover-dark focus:border-brand-color hover:border-brand-color w-full py-2 px-4"
                                                            isRequired
                                                        />
                                                    )}
                                                </div>
                                                {formData.jobRole && (
                                                    <div className="w-fit text-white bg-brand-color py-2 px-[10px] rounded-2xl">
                                                        <p className="text-sm leading-[17.5px]">
                                                            {formData.jobRole}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            {formData.jobRole && (
                                                <div
                                                    onClick={() =>
                                                        setFormData(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                jobRole: "",
                                                            })
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={EditIcon}
                                                        alt=""
                                                        className="w-5 md:w-6 transition ease-in-out hover:scale-110 cursor-pointer duration-300"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <AddFiles
                                            onFilesChange={handlePdfsChange}
                                        />
                                        <div className="w-fit ml-auto flex gap-4 items-center">
                                            <Button
                                                onClick={() =>
                                                    setIsCreateRequested(false)
                                                }
                                                className="rounded-lg border border-brand-color py-2 px-3 text-white text-sm transition ease-in-out hover:bg-brand-color duration-500 w-28"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleSubmit}
                                                className="rounded-lg bg-brand-color border border-brand-color py-2 px-3 text-white text-sm transition ease-in-out hover:bg-transparent duration-500 w-28"
                                            >
                                                {isSaveInProgress ? (
                                                    <CircularProgress
                                                        size={14}
                                                        color={
                                                            theme === "dark"
                                                                ? "#ECECEC"
                                                                : "#212121"
                                                        }
                                                    />
                                                ) : (
                                                    "Save Profile"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    );
}

ProfileSelectionModal.propTypes = {
    setIsCreateRequested: PropTypes.func,
    setUserProfiles: PropTypes.func,
    fetchData: PropTypes.func,
};

export default ProfileSelectionModal;
