import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";
import CourseHeader from "../../courses/CourseHeader";
import CourseBody from "../../courses/CourseBody";
// import CourseFooter from "../../courses/CourseFooter";
import CourseContent from "../../courses/CourseContent";
import { Link, useLocation } from "react-router-dom";
// import QuizWelcome from "../../quiz/QuizWelcome";
// import QuestionSection from "../../quiz/QuestionSection";
// import QuizCompleted from "../../quiz/QuizCompleted";
import { UserServices } from "../../../services/UserServices";
import { AuthContext } from "../../../contexts/AuthContext";

function CoursesContainer({ stageName }) {
    const firstPage = window.innerWidth > 1024 ? "Module" : "Course Content";
    const { token } = useContext(AuthContext);
    const location = useLocation();
    // const { module } = useParams();
    const [currentDisplay, setCurrentDisplay] = useState(firstPage);

    const params = new URLSearchParams(location.search);
    const moduleId = params.get("moduleId");
    const totalParts = params.get("totalParts");
    const partNumber = 1;

    useEffect(() => {
        async function fetchData() {
            const userServices = new UserServices();
            try {
                const response = await userServices.getIndividualModule(
                    moduleId,
                    partNumber,
                    totalParts,
                    token
                );
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [moduleId, partNumber, totalParts]);

    function handleDisplayToggle(e) {
        setCurrentDisplay(e.target.innerText);
    }

    return (
        <div>
            {/* desktop screen */}
            <div className="lg:flex gap-8 justify-center hidden xl:max-w-[1024px] 2xl:max-w-[1440px] mx-auto">
                <div className="w-[60%] flex flex-col items-end gap-3 cursor-pointer lg:max-w-[683px]">
                    <Link
                        to={"/stages"}
                        className="text-primary-dark dark:text-[#C5C6CB] flex items-center gap-2"
                    >
                        <IoIosArrowBack />
                        <span>Back to Learning Pages</span>
                    </Link>
                    <div className="w-full">
                        <CourseHeader
                            handleDisplayToggle={handleDisplayToggle}
                            currentDisplay={currentDisplay}
                            stageName={stageName}
                        />
                        {/* <div className="mt-6 mb-8">
                            <CourseBody currentDisplay={currentDisplay} />
                        </div> */}
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
                <div className="w-[40%]">
                    <CourseContent />
                </div>
            </div>
            {/* mobile screen */}
            <div className="block lg:hidden">
                <div className="flex flex-col gap-3 cursor-pointer">
                    <Link
                        to={"/stages"}
                        className="text-primary-dark dark:text-[#C5C6CB] items-center gap-2 flex"
                    >
                        <IoIosArrowBack />
                        <span>Back to Learning Pages</span>
                    </Link>
                    <div>
                        <CourseHeader
                            handleDisplayToggle={handleDisplayToggle}
                            currentDisplay={currentDisplay}
                            stageName={stageName}
                        />
                        <div className="mt-10 mb-8 px-4">
                            <CourseBody currentDisplay={currentDisplay} />
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
                {/* <div className="w-[40%]">
                    <CourseContent />
                </div> */}
            </div>
        </div>
    );
}

CoursesContainer.propTypes = {
    stageName: PropTypes.string,
};

export default CoursesContainer;
