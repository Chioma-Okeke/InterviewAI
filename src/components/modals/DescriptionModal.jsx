import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import Button from "../reusables/Button";
import EditIcon from "../../assets/edit.svg";
import Input from "../reusables/Input";
import { IoIosArrowDown } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import AddFiles from "../reusables/AddFiles";
import { UserServices } from "../../services/UserServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";

const levelsOfExperience = [
    "Intern",
    "Junior",
    "Intermediate",
    "Senior",
    "Associate",
];

function DescriptionModal({
    setIsProfileSelected,
    descriptionGenerationData,
    setDescription,
}) {
    const [theme, setTheme] = useThemeSwitcher();
    const [data, setData] = useState([]);
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected ]= useState("")

    console.log(descriptionGenerationData, "collected");

    useEffect(() => {
        async function fetchDescriptions() {
            const userService = new UserServices();
            setIsLoading(true);
            try {
                const response = await userService.generateDescriptions(
                    descriptionGenerationData,
                    token
                );
                setData(response.data)
                console.log(response, "res");
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDescriptions();
    }, []);

    function saveDescription () {
        setDescription(selected)
        setIsProfileSelected(false)
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
                            onClick={() => setIsProfileSelected(false)}
                        ></div>

                        {/* Modal Content */}
                        <main className="flex flex-col items-center justify-center h-full w-full relative ">
                            <div className="modal-wrapper flex items-center z-30 relative xl:w-[70%] justify-center w-full">
                                <div className="flex flex-col gap-8 rounded-xl w-[90%] mx-auto md:w-[70%] xl:max-w-3xl lg:max-w-xl md:max-w-x shadow-lg relative px-4 lg:px-8 py-5 dark:bg-primary-dark bg-secondary-light text-primary-dark dark:text-primary-light">
                                    <p>
                                        Select a Job description that best fits
                                        what you want.
                                    </p>
                                    {isLoading ? (
                                        <CircularProgress
                                            color={
                                                theme === "dark"
                                                    ? "#ECECEC"
                                                    : "#212121"
                                            }
                                            sx={{alignSelf: "center"}}
                                        />
                                    ) : (
                                        <div>
                                            {data.length > 0 ?<div className="grid grid-cols-3 gap-5">
                                            {data?.map((description, index) => {
                                                return (
                                                    <p onClick={() => setSelected(description)} key={index}>
                                                        {description}
                                                    </p>
                                                )
                                            })}
                                            </div> : <p className="text-center">No data found</p>}
                                        </div>
                                    )}
                                    <div className="flex items-center justify-center gap-5">
                                        <Button onClick={() => setIsProfileSelected(false)} className="border border-brand-color text-white rounded-lg p-2 w-[30%] transition-all duration-500 hover:bg-brand-color">
                                            close
                                        </Button>
                                        <Button onClick={saveDescription} className="bg-brand-color text-white rounded-lg p-2 w-[30%] transition-all duration-500 hover:bg-transparent border border-brand-color">
                                            Save
                                        </Button>
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

DescriptionModal.propTypes = {
    setIsCreateRequested: PropTypes.func,
    setUserProfiles: PropTypes.func,
};

export default DescriptionModal;
