import { ring2 } from "ldrs";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import CourseHeader from "../../courses/CourseHeader";
import CourseBody from "../../courses/CourseBody";
// import CourseFooter from "../../courses/CourseFooter";
import CourseContent from "../../courses/CourseContent";
// import QuizWelcome from "../../quiz/QuizWelcome";
// import QuestionSection from "../../quiz/QuestionSection";
// import QuizCompleted from "../../quiz/QuizCompleted";
import { UserServices } from "../../../services/UserServices";
import { AuthContext } from "../../../contexts/AuthContext";
import useThemeSwitcher from "../../../hooks/useThemeSwitcher";
import MobModule from "../../courses/courseSections/MobModule";

function CoursesContainer() {
    ring2.register();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const parts = location.state || {};
    const { stagemodule } = useParams();
    const [data, setData] = useState({});
    const moduleId = params.get("moduleId");
    const { userData } = useContext(AuthContext);
    const stageName = params.get("stageName");
    const totalParts = params.get("totalParts");
    const { token } = useContext(AuthContext);
    const firstPage = window.innerWidth > 1024 ? "Module" : "Course Content";
    const [theme, setTheme] = useThemeSwitcher();
    const [isLoading, setIsLoading] = useState(false);
    const [bodyContent, setBodyContent] = useState({});
    const [imageContent, setImageContent] = useState({});
    const [headerContent, setHeaderContent] = useState({});
    const [currentDisplay, setCurrentDisplay] = useState(firstPage);
    const showModule = useSelector((state) => state.module.showModule);
    const partNumber = useSelector((state) => state.partNumber.partNumber);

    const isExistingOnUserProfile = userData?.learningProfile.some(
        (module) => module?._id === parts.course._id
    );

    useEffect(() => {
        window.scrollTo(0, {
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const userServices = new UserServices();
            try {
                const response = await userServices.getIndividualModule(
                    moduleId,
                    partNumber,
                    totalParts,
                    token
                );
                setData(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [moduleId, partNumber, totalParts, token]);

    useEffect(() => {
        if (data?.content?.length > 0) {
            setImageContent(data?.content[0]);
        }

        if (data?.content?.length > 1) {
            setHeaderContent(data?.content[1]);
        }

        if (data?.content?.length > 2) {
            setBodyContent(data?.content[2]);
        }
    }, [data]);

    function handleDisplayToggle(e) {
        if (isExistingOnUserProfile) {
            setCurrentDisplay(e.target.innerText);
        }
    }

    function handleVisibility(page) {
        setCurrentDisplay(page);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
        >
            {/* desktop screen */}
            <div className="lg:flex gap-8 justify-center hidden xl:max-w-[1024px] 2xl:max-w-[1440px] mx-auto">
                <div className="w-[60%] flex flex-col gap-3 cursor-pointer lg:max-w-[683px]">
                    <Link
                        to={`/user/learning/stages/${stagemodule}`}
                        className="text-ternary-light dark:text-[#C5C6CB] flex items-center gap-2"
                    >
                        <IoIosArrowBack />
                        <span className="text-xs lg:text-base">
                            Back to Learning Pages
                        </span>
                    </Link>
                    <div className="w-full relative">
                        <CourseHeader
                            handleDisplayToggle={handleDisplayToggle}
                            currentDisplay={currentDisplay}
                            stageName={stageName}
                        />
                        {isLoading && (
                            <div className="w-fit mx-auto h-60 flex items-center">
                                <l-ring-2
                                    size="40"
                                    stroke="5"
                                    stroke-length="0.25"
                                    bg-opacity="0.1"
                                    speed="0.8"
                                    color={
                                        theme === "dark" ? "#ECECEC" : "#212121"
                                    }
                                ></l-ring-2>
                            </div>
                        )}
                        {data && !isLoading && (
                            <div className="mt-6 mb-8">
                                <CourseBody
                                    parts={parts}
                                    imageContent={imageContent}
                                    content={bodyContent}
                                    handleVisibility={handleVisibility}
                                    currentDisplay={currentDisplay}
                                />
                            </div>
                        )}
                        {/* {!isLoading && <div>
                        <QuizWelcome />
                        </div>} */}
                        {/* <div>
                            <QuizCompleted />
                        </div> */}
                        {/* {!isLoading && <div className="mt-11">
                            <QuestionSection />
                        </div>} */}
                        {/* <CourseFooter /> */}
                    </div>
                </div>
                <div className="w-[40%]">
                    <CourseContent parts={parts} content={headerContent} />
                </div>
            </div>
            {/* mobile screen */}
            <div className="block lg:hidden">
                {!showModule ? (
                    <div className="flex flex-col gap-3 cursor-pointer">
                        <Link
                            to={`/user/learning/stages/${stagemodule}`}
                            className="text-primary-dark dark:text-[#C5C6CB] items-center gap-2 flex"
                        >
                            <IoIosArrowBack />
                            <span className="text-xs lg:text-base">
                                Back to Learning Pages
                            </span>
                        </Link>
                        <div>
                            <CourseHeader
                                handleDisplayToggle={handleDisplayToggle}
                                currentDisplay={currentDisplay}
                                stageName={stageName}
                            />
                            <div className="mt-5 mb-8 px-4">
                                <CourseBody
                                    parts={parts}
                                    imageContent={imageContent}
                                    content={bodyContent}
                                    currentDisplay={currentDisplay}
                                />
                            </div>
                            {/* <div>
                        <QuizWelcome />
                    </div> */}
                            {/* <div>
                            <QuizCompleted />
                        </div> */}
                            {/* <div className="mt-11">
                        <QuestionSection />
                    </div> */}
                            {/* <CourseFooter /> */}
                        </div>
                    </div>
                ) : (
                    <div>
                        <MobModule
                            headerContent={headerContent}
                            content={bodyContent}
                        />
                    </div>
                )}
                {/* <div className="w-[40%]">
                    <CourseContent />
                </div> */}
            </div>
        </motion.div>
    );
}

CoursesContainer.propTypes = {
    stageName: PropTypes.string,
};

export default CoursesContainer;
