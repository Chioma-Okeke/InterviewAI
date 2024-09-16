import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import CourseHeader from "../../courses/CourseHeader";
import CourseBody from "../../courses/CourseBody";
import CourseFooter from "../../courses/CourseFooter";
import CourseContent from "../../courses/CourseContent";
import QuizWelcome from "../../quiz/QuizWelcome";
import QuestionSection from "../../quiz/QuestionSection";
import QuizCompleted from "../../quiz/QuizCompleted";

function CoursesContainer({ onClick }) {
    // const sidebarWidth = window.innerWidth > 768 ? "261px" : "";
    const [currentDisplay, setCurrentDisplay] = useState("");

    function handleDisplayToggle(e) {
        setCurrentDisplay(e.target.innerText)
    }

    return (
        <div>
            {/* desktop screen */}
            <div className="lg:flex gap-8 justify-center hidden">
                <div className="w-[60%] flex flex-col items-end gap-3 cursor-pointer">
                    <div
                        className="text-primary-dark dark:text-[#C5C6CB] flex items-center gap-2"
                        onClick={onClick}
                    >
                        <IoIosArrowBack />
                        <span>Back to Learning Pages</span>
                    </div>
                    <div className="w-full">
                        <CourseHeader
                            handleDisplayToggle={handleDisplayToggle}
                        />
                        <div className="mt-6 mb-8">
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
                <div className="w-[40%]">
                    <CourseContent />
                </div>
            </div>
            {/* mobile screen */}
            <div className="block lg:hidden">
                <div className="flex flex-col gap-3 cursor-pointer">
                    <div
                        className="text-primary-dark dark:text-[#C5C6CB] items-center gap-2 hidden lg:flex"
                        onClick={onClick}
                    >
                        <IoIosArrowBack />
                        <span>Back to Learning Pages</span>
                    </div>
                    <div>
                        <CourseHeader handleDisplayToggle={handleDisplayToggle}/>
                        <div className="mt-10 mb-8 px-4">
                            <CourseBody currentDisplay={currentDisplay}/>
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

export default CoursesContainer;
