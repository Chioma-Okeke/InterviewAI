import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import Button from "../reusables/Button";
import EditIcon from "../../assets/edit.svg";
import Input from "../reusables/Input";
import { IoIosArrowDown } from "react-icons/io";
import { useContext, useState } from "react";
import AddFiles from "../reusables/AddFiles";
import { UserServices } from "../../services/UserServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfileSelectionModal({ setIsCreateRequested, setUserProfiles }) {
    const [formData, setFormData] = useState({});
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [pdfs, setPdfs] = useState([]);
    const {token } = useContext(AuthContext)
    const navigate = useNavigate()

    const handlePdfsChange = (newPdfs) => {
        // Filter out only PDF files
        const filteredPdfs = newPdfs.filter(
            (file) => file.type === "application/pdf"
        );

        // Set the filtered PDFs in the state
        setPdfs(filteredPdfs);

        // Add PDFs to formData state
        setFormData((prevState) => ({
            ...prevState,
            resume: filteredPdfs,
        }));
    };

    function selectYears() {
        setIsDropDownOpen((prevState) => !prevState);
    }
    function handleYearsSelected(e) {
        const option = e.target.innerHTML;
        console.log(option, "selected option");
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
        console.log(inputtedRole, "role");
        setFormData((prevState) => {
            return {
                ...prevState,
                jobRole: inputtedRole,
            };
        });
    }

    async function handleSubmit() {
        const formDataToSend = new FormData();
        const userServices = new UserServices()

        // Append years of experience
        if (formData.experienceLevel) {
            formDataToSend.append("experienceLevel", formData.years);
        }

        // Append role
        if (formData.jobRole) {
            formDataToSend.append("jobRole", formData.role);
        }

        // Append PDF files
        if (formData.resume && formData.resume.length > 0) {
            formDataToSend.append("resume", formData.resume[0]); // Assuming there's only one resume
        }

        try {
            const response = await userServices.createJobProfile(formDataToSend, token)
            if (response.success) {
                toast.success("Job Profile successfully created.")
                setIsCreateRequested(false)
                navigate("/user/practice/interviewmethods")
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error when creating profile")
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
                                                Years of Experience
                                            </label>
                                            <div
                                                onClick={selectYears}
                                                className="flex items-center justify-between py-2 px-4 outline-none border border-hover-dark dark:bg-hover-dark focus:border-brand-color hover:border-brand-color"
                                            >
                                                <Input
                                                    inputName="experienceLevel"
                                                    placeholderText="Enter your years of experience"
                                                    inputGroupClassNames="w-[90%]"
                                                    inputValue={
                                                        formData.experienceLevel
                                                    }
                                                    inputId="experienceLevel"
                                                    ariaLabelName="Years of Experience"
                                                    // onChange={(e) => setQuery(e.target.value)}
                                                    // onFocus={handleFocus}
                                                    // onBlur={handleBlur}
                                                    className="bg-transparent w-full focus:outline-none"
                                                    isRequired
                                                />
                                                <IoIosArrowDown
                                                    size={20}
                                                    cursor={"pointer"}
                                                />
                                            </div>
                                            {isDropDownOpen && (
                                                <div className="absolute bottom-0 left-0 top-full w-full">
                                                    <ul className="border border-hover-dark dark:bg-hover-dark w-full z-30 px-3 h-40 overflow-auto">
                                                        <li
                                                            className="p-2 hover:bg-primary-dark cursor-pointer"
                                                            onClick={
                                                                handleYearsSelected
                                                            }
                                                        >
                                                            1 year
                                                        </li>
                                                        <li
                                                            className="p-2 hover:bg-primary-dark cursor-pointer"
                                                            onClick={
                                                                handleYearsSelected
                                                            }
                                                        >
                                                            2 years
                                                        </li>
                                                        <li
                                                            className="p-2 hover:bg-primary-dark cursor-pointer"
                                                            onClick={
                                                                handleYearsSelected
                                                            }
                                                        >
                                                            3 years
                                                        </li>
                                                        <li
                                                            className="p-2 hover:bg-primary-dark cursor-pointer"
                                                            onClick={
                                                                handleYearsSelected
                                                            }
                                                        >
                                                            4 years
                                                        </li>
                                                    </ul>
                                                </div>
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
                                                            // onChange={(e) => setQuery(e.target.value)}
                                                            // onFocus={handleFocus}
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
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-1 md:text-[18px] leading-[20px] md:leading-[22.5px]">
                                                    <p>Resume</p>
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </div>
                                                <AddFiles
                                                    onFilesChange={
                                                        handlePdfsChange
                                                    }
                                                />
                                                {/* <div>
                                                    {pdfs.map((pdf, index) => (
                                                        <div key={index}>
                                                            {pdf.file.name}
                                                        </div>
                                                    ))}
                                                </div> */}
                                            </div>
                                            <div>
                                                <img
                                                    src={EditIcon}
                                                    alt=""
                                                    className="w-5 md:w-6 transition ease-in-out hover:scale-110 cursor-pointer duration-300"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-fit ml-auto flex gap-4 items-center">
                                            <Button
                                                onClick={() =>
                                                    setIsCreateRequested(false)
                                                }
                                                className="rounded-lg border border-brand-color py-2 px-3 text-white text-sm transition ease-in-out hover:bg-brand-color duration-500"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleSubmit}
                                                className="rounded-lg bg-brand-color border border-brand-color py-2 px-3 text-white text-sm transition ease-in-out hover:bg-transparent duration-500"
                                            >
                                                Save Profile
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
};

export default ProfileSelectionModal;
