import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import FileIcon from "../../assets/file.svg";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleModule } from "../../store/moduleSlice";
import { UserServices } from "../../services/UserServices";
import { AuthContext } from "../../contexts/AuthContext";
import { incrementPartNumber } from "../../store/partNumberSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CourseContent({ content, parts }) {
    const [isPartContentOpen, setIsPartContentOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { stagemodule } = useParams();
    const { module } = useParams();
    const dispatch = useDispatch();
    console.log(parts, "module parts in co");
    const { token } = useContext(AuthContext);

    function navigateToModule() {
        if (window.innerWidth < 1024) {
            dispatch(toggleModule());
        }
    }

    async function handlePartChange(partId, partTitle) {
        const userServices = new UserServices();
        const formDatToSend = new FormData();
        if (partId) {
            formDatToSend.append("_id", partId);
        }
        if (partTitle) {
            formDatToSend.append("partTitle", partTitle);
        }
        try {
            const response = await userServices.markPartAsCompleted(
                formDatToSend,
                token
            );
            if (response.success) {
                dispatch(incrementPartNumber());
            } else {
                toast.error("Error refreshing data. Kindly refresh page.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        window.scrollTo(0, {
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    });

    return (
        <section className="lg:max-w-[399px] bg-[#F4F4F4] dark:bg-ternary-dark">
            {/* course contents will go here */}
            <div>
                <div>
                    <AnimatePresence>
                        {content && content.value && (
                            <motion.div
                                initial={{ opacity: 0, maxHeight: 0 }}
                                animate={{ opacity: 1, maxHeight: 500 }}
                                exit={{ opacity: 0, maxHeight: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-lg leading-6 font-medium px-4 py-3 border-b border-[#E5E5E5] dark:border-ternary-light text-primary-dark dark:text-primary-light hidden lg:block">
                                    Course Content
                                </h1>
                                <ul className="px-6">
                                    {parts.parts?.map((part, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="flex gap-[14px] py-2"
                                                onClick={navigateToModule}
                                            >
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            part.hasBeenCompleted
                                                        }
                                                        className="w-5 border-[1.5px] border-primary-dark dark:border-[#C5C6CB] bg-transparent"
                                                        onChange={() =>
                                                            handlePartChange(
                                                                part._id,
                                                                part.title
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <div>
                                                    <p className="text-sm leading-6 text-[#4E4E4E] dark:text-primary-light">
                                                        1. {part.title}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={FileIcon}
                                                            alt=""
                                                        />
                                                        <span className="text-xs leading-6 text-ternary-light">
                                                            5min
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

CourseContent.propTypes = {
    content: PropTypes.object,
    parts: PropTypes.array,
};

export default CourseContent;
