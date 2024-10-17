import PropTypes from "prop-types";
import Button from "../reusables/Button";
import { useContext, useEffect, useRef, useState } from "react";
import { UserServices } from "../../services/UserServices";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    updateDescription,
} from "../../store/interviewSlice";
import { IoIosArrowBack } from "react-icons/io";

const DescriptionModal = () => {
    const [theme, setTheme] = useThemeSwitcher();
    const [data, setData] = useState([]);
    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const descriptionRef = useRef(null);
    const location = useLocation();
    const { descriptionGenerationData } = location.state || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, {
            top: 0,
            behavior: "smooth"
        })
    }, [])

    useEffect(() => {
        async function fetchDescriptions() {
            const userService = new UserServices();
            setIsLoading(true);
            try {
                const response = await userService.generateDescriptions(
                    descriptionGenerationData,
                    token
                );
                setData(response.generatedJobDescriptions);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDescriptions();
    }, [descriptionGenerationData, token]);

    function saveDescription() {
        dispatch(updateDescription({ description: selected }));
        toast.success("Kindly click next to continue.");
        navigate("/user/practice/interviewmethods");
    }

    function cleanUpData(data) {
        return data
            .replace(/\\n+/g, " ") // Replace newline characters with a space
            .replace(/\*\*(.*?)\*\*/g, "**$1**") // Keep Markdown bold syntax
            .replace(/##/g, "## ") // Ensure Markdown headers have space
            .trim(); // Remove leading/trailing whitespace
    }

    return (
        <main className="px-5 lg:px-8 pb-10">
            <div className="">
                <Link
                    to={`/user/practice`}
                    className="text-ternary-light dark:text-[#C5C6CB] flex items-center gap-2 mb-4"
                >
                    <IoIosArrowBack />
                    <span className="text-xs lg:text-base">Back to Profiles Page</span>
                </Link>
                <p>
                    Below are AI generated job descriptions. kindly go through
                    them and select a Job description that best fits what you
                    want.
                </p>
                {isLoading ? (
                    <div className="w-fit mx-auto my-6">
                        <CircularProgress
                            color={theme === "dark" ? "#ECECEC" : "#212121"}
                            sx={{ alignSelf: "center", margin: "0 auto" }}
                        />
                    </div>
                ) : (
                    <div>
                        {data?.length > 0 ? (
                            <div className="flex flex-col items-center overflow-hidden">
                                <div className="flex items-start justify-center w-full max-h-[300px] overflow-hidden">
                                    {/* Show the current description */}
                                    <div
                                        ref={descriptionRef}
                                        className="p-4 border-b border-ternary-light rounded w-full max-h-[300px] overflow-y-auto scroller"
                                    >
                                        <ReactMarkdown>
                                            {cleanUpData(data[currentIndex])}
                                        </ReactMarkdown>
                                    </div>
                                </div>

                                <div className="flex justify-between w-full mt-8">
                                    <button
                                        onClick={() => {
                                            setCurrentIndex((prevIndex) =>
                                                prevIndex === 0
                                                    ? data.length - 1
                                                    : prevIndex - 1
                                            );
                                            if (descriptionRef.current) {
                                                descriptionRef.current.scrollTo(
                                                    {
                                                        top: 0,
                                                        behavior: "smooth",
                                                    }
                                                );
                                            }
                                        }}
                                        className="bg-brand-color text-white p-2 rounded hover:bg-opacity-80 transition"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelected(data[currentIndex])
                                        }
                                        className={` text-white border border-brand-color p-2 rounded hover:bg-opacity-80 transition ${
                                            selected
                                                ? "bg-transparent"
                                                : "bg-brand-color"
                                        }`}
                                    >
                                        Choose Description
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCurrentIndex((prevIndex) =>
                                                prevIndex === data.length - 1
                                                    ? 0
                                                    : prevIndex + 1
                                            );
                                            if (descriptionRef.current) {
                                                descriptionRef.current.scrollTo(
                                                    {
                                                        top: 0,
                                                        behavior: "smooth",
                                                    }
                                                );
                                            }
                                        }}
                                        className="bg-brand-color text-white p-2 rounded hover:bg-opacity-80 transition"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center">No data found</p>
                        )}
                    </div>
                )}
                <div className="flex items-center justify-center gap-5 mt-8">
                    <Button
                        onClick={saveDescription}
                        className="bg-brand-color text-white rounded-lg p-2 lg:w-[30%] transition-all duration-500 hover:bg-transparent border border-brand-color"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </main>
    );
};

DescriptionModal.propTypes = {
    setIsProfileSelected: PropTypes.func,
    descriptionGenerationData: PropTypes.array,
    setDescription: PropTypes.func,
};

export default DescriptionModal;
