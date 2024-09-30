import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import FileIcon from "../../assets/file.svg";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleModule } from "../../store/moduleSlice";

function CourseContent({ content }) {
    const [isPartContentOpen, setIsPartContentOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { stagemodule } = useParams();
    const { module } = useParams();
    const dispatch = useDispatch();

    function navigateToModule() {
        if (window.innerWidth < 1024) {
            dispatch(toggleModule());
        }
    }

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
                                    <li
                                        className="flex gap-[14px] py-2"
                                        onClick={navigateToModule}
                                    >
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="w-5 border-[1.5px] border-primary-dark dark:border-[#C5C6CB] bg-transparent"
                                            />
                                        </label>
                                        <div>
                                            <p className="text-sm leading-6 text-[#4E4E4E] dark:text-primary-light">
                                                1. {content.value}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <img src={FileIcon} alt="" />
                                                <span className="text-xs leading-6 text-ternary-light">
                                                    5min
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

CourseContent.propTypes = {
    content: PropTypes.object,
};

export default CourseContent;
