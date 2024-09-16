import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import FileIcon from "../../assets/file.svg";
import { AnimatePresence, motion } from "framer-motion";

function CourseContent() {
    const [isPartContentOpen, setIsPartContentOpen] = useState(false);

    return (
        <section className="lg:max-w-[399px] dark:bg-ternary-dark">
            <h1 className="text-lg leading-6 font-medium px-4 py-3 text-primary-dark dark:text-primary-light hidden lg:block">
                Course Content
            </h1>
            {/* course contents will go here */}
            <div>
                <div>
                    {/* part heading */}
                    <div className="flex justify-between px-4 py-3">
                        <div>
                            <h2 className="font-medium text-primary-dark dark:text-primary-light">
                                Part 1: Understanding the Role
                            </h2>
                            <span className="text-xs leading-6 text-primary-dark dark:text-ternary-light">
                                0/5 | 20min read
                            </span>
                        </div>
                        <div
                            className="cursor-pointer hover:scale-105"
                            onClick={() =>
                                setIsPartContentOpen((prevState) => !prevState)
                            }
                        >
                            <IoIosArrowUp
                                size={16}
                                className={`text-primary-dark dark:text-primary-light transition-transform duration-400 ${
                                    isPartContentOpen ? "rotate-180" : ""
                                }`}
                            />
                            {/* <IoIosArrowDown
                                size={16}
                                className="text-primary-dark dark:text-primary-light"
                            /> */}
                        </div>
                    </div>
                    {/* part lessons */}
                    <AnimatePresence>
                        {isPartContentOpen && (
                            <motion.div
                                initial={{ opacity: 0, maxHeight: 0 }}
                                animate={{ opacity: 1, maxHeight: 500 }}
                                exit={{ opacity: 0, maxHeight: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ul className="px-6">
                                    <li className="flex gap-[14px] py-2">
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="w-5 border-[1.5px] border-primary-dark dark:border-[#C5C6CB] bg-transparent"
                                            />
                                        </label>
                                        <div>
                                            <p className="text-sm leading-6 text-primary-dark dark:text-primary-light">
                                                1. Research the Company
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <img src={FileIcon} alt="" />
                                                <span className="text-xs leading-6 text-primary-dark dark:text-ternary-light">
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

export default CourseContent;
