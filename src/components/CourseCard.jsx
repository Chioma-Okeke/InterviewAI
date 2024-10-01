import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import saveIcon from "../assets/save.svg";
import ProgressBar from "./reusables/ProgressBar";
import { UserServices } from "../services/UserServices";
import { AuthContext } from "../contexts/AuthContext";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
// import image from "../assets/image.png";

function CourseCard({
    title,
    moduleId,
    totalParts,
    imgSrc,
    stageNumber,
    stageName,
    course,
}) {
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(50);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [theme, setTheme] = useThemeSwitcher();

    async function openIndividualModule() {
        const userServices = new UserServices();
        console.log(course, "course details");
        navigate(
            `/user/learning/stages/${stageNumber}/${title}?stageName=${stageName}&moduleId=${moduleId}&totalParts=${totalParts}`,
            { state: { parts: course.partsMetaData } }
        );
        // try {
        //     const response = await userServices.addModuleToUserProfile(
        //         course,
        //         token
        //     );
        //     console.log(response, "course on save");
        //     if (response?.success) {
        //         toast.success("Module has been successfully added to profile.");
        //         navigate(
        //             `/user/learning/stages/${stageNumber}/${title}?stageName=${stageName}&moduleId=${moduleId}&totalParts=${totalParts}`,
        //             { state: { parts: course.partMetaData } }
        //         );
        //     } else {
        //         toast.error("Error while adding module to user profile.");
        //     }
        // } catch (error) {
        //     console.error(error);
        //     toast.error("Error while adding module to user profile.");
        // }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        let section = sectionRef.current;

        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <div className="cursor-pointer">
            <div
                onClick={openIndividualModule}
                className="w-[398px] lg:w-[279.76px] rounded-[23.94px] lg:rounded-2xl bg-[#F4F4F4] dark:bg-hover-dark pb-[27.93px] lg:pb-[19.2px] mx-auto border border-[#E5E5E5] dark:border-0"
            >
                <div
                    ref={sectionRef}
                    style={{
                        backgroundImage: isInView ? `url(${imgSrc})` : "",
                    }}
                    className={`bg-cover bg-center bg-secondary-light dark:bg-hover-dark h-[129.71px] w-full rounded-t-2xl transition-opacity duration-500 ${
                        isInView ? "opacity-100" : "opacity-0"
                    }`}
                ></div>
                <div className="text-[#b1b1b1]">
                    <div className="flex items-center justify-between pb-[6.02px] pt-[18px] px-[18px] border-b-[1.4px] border-[#E5E5E5] dark:border-[#505050]">
                        <span className="text-[#0D0D0D] dark:text-[#C5C6CB] text-xs leading-[15.43px]">
                            COURSE
                        </span>
                        {theme === "dark" ? (
                            <img src={saveIcon} alt="" />
                        ) : (
                            <svg
                                width="17"
                                height="18"
                                viewBox="0 0 17 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.41789 15.9685H10.6249C14.1307 15.9685 15.533 14.5662 15.533 11.0604V6.85344C15.533 3.34763 14.1307 1.94531 10.6249 1.94531H6.41789C2.91209 1.94531 1.50977 3.34763 1.50977 6.85344V11.0604C1.50977 14.5662 2.91209 15.9685 6.41789 15.9685Z"
                                    stroke="#888888"
                                    strokeWidth="1.05174"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.0272 2.25391V9.25149C12.0272 10.6328 11.0386 11.1727 9.82559 10.4435L8.90006 9.88955C8.68971 9.76334 8.35315 9.76334 8.1428 9.88955L7.21727 10.4435C6.00426 11.1657 5.01562 10.6328 5.01562 9.25149V2.25391"
                                    stroke="#888888"
                                    strokeWidth="1.05174"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.41789 15.9685H10.6249C14.1307 15.9685 15.533 14.5662 15.533 11.0604V6.85344C15.533 3.34763 14.1307 1.94531 10.6249 1.94531H6.41789C2.91209 1.94531 1.50977 3.34763 1.50977 6.85344V11.0604C1.50977 14.5662 2.91209 15.9685 6.41789 15.9685Z"
                                    stroke="#888888"
                                    strokeWidth="1.05174"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.0272 2.25391V9.25149C12.0272 10.6328 11.0386 11.1727 9.82559 10.4435L8.90006 9.88955C8.68971 9.76334 8.35315 9.76334 8.1428 9.88955L7.21727 10.4435C6.00426 11.1657 5.01562 10.6328 5.01562 9.25149V2.25391"
                                    stroke="#888888"
                                    strokeWidth="1.05174"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                    <div className="px-[18px] pt-[6px] pb-[14.2px]">
                        <p className="text-sm leading-[16.83px]">{title}</p>
                    </div>
                    <div className="px-[18px] flex items-center justify-between">
                        <div className="flex flex-col flex-1">
                            <span className="text-[10px] leading-[14.02px]">
                                {progress}% Completed
                            </span>
                            <ProgressBar progress={progress} />
                        </div>
                        <div className="dark:bg-[#444549] bg-[#444549] rounded-full p-1 w-fit hover:scale-110">
                            <HiOutlineArrowRight className="text-primary-light w-4 h-4 cursor-pointer hover:scale-110" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CourseCard.propTypes = {
    title: PropTypes.string,
    moduleId: PropTypes.string,
    totalParts: PropTypes.number,
    imgSrc: PropTypes.string,
    addModuleToProfile: PropTypes.func,
    stageNumber: PropTypes.number,
    course: PropTypes.object,
};

export default CourseCard;
