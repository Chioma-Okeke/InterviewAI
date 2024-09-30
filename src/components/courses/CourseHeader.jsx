import PropTypes from "prop-types";

import NoteIcon from "../../assets/notes.svg";
import SearchIcon from "../../assets/search.svg";

const mobileCourseSections = ["Course Content", "Overview", "Q&A"];
const laptopCourseSections = ["Module", "Overview", "Q&A", "Notes"];

function CourseHeader({ handleDisplayToggle, currentDisplay, stageName }) {
    return (
        <div className="px-3 lg:pl-6 lg:pr-0 pt-4 flex flex-col bg-[#F9F9F9] dark:bg-[#171717] lg:min-w-[570px]">
            <div className="flex items-center gap-2 mb-4">
                <img src={NoteIcon} alt="" />
                <h1 className="text-[#4E4E4E] dark:text-primary-light text-xl lg:text-2xl">
                    {stageName?.toUpperCase()}
                </h1>
            </div>
            <div className="flex flex-start gap-[48px] lg:gap-[72px] w-fit text-primary-dark dark:text-primary-light opacity-70">
                <img
                    src={SearchIcon}
                    alt=""
                    className="text-[#4E4E4E] dark:text-primary-light"
                />
                <nav>
                    <ul className="lg:flex gap-[72px] hidden">
                        {laptopCourseSections.map((section, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`pb-3 text-[#4E4E4E] dark:text-primary-light ${currentDisplay === section ? "border-b-2 border-brand-color opacity-100" : "opacity-70"}`}
                                    onClick={handleDisplayToggle}
                                >
                                    {section}
                                </li>
                            );
                        })}
                    </ul>
                    <ul className="flex gap-[48px] text-sm lg:hidden">
                        {mobileCourseSections.map((section, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`pb-3 ${currentDisplay === section ? "border-b-2 border-brand-color" : ""}`}
                                    onClick={handleDisplayToggle}
                                >
                                    {section}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

CourseHeader.propTypes = {
    handleDisplayToggle: PropTypes.func,
    currentDisplay: PropTypes.string,
    stageName: PropTypes.string
};

export default CourseHeader;
