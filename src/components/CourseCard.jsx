import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import saveIcon from "../assets/save.svg";
import ProgressBar from "./reusables/ProgressBar";
import { UserServices } from "../services/UserServices";
import { AuthContext } from "../contexts/AuthContext";
// import image from "../assets/image.png";

function CourseCard({
    title,
    moduleId,
    totalParts,
    imgSrc,
    stageNumber,
    course,
    learningModules,
    setLearningModules,
}) {
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(50);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    async function openIndividualModule() {
        navigate(
            `/user/learning/stages/${stageNumber}/${title}?moduleId=${moduleId}&totalParts=${totalParts}`
        );
        const userServices = new UserServices();
        setLearningModules((prevState) => [...prevState, course]);
        try {
            const response = await userServices.addModuleToUserProfile(
                course,
                token
            );
            console.log(response);
            if (response?.success) {
                toast.success("Module has been successfully added to profile.");
            } else {
                toast.error("Error while adding module to user profile.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while adding module to user profile.");
        }
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
        <div
            onClick={openIndividualModule}
            className="w-[398px] lg:w-[279.76px] rounded-[23.94px] lg:rounded-2xl bg-hover-dark pb-[27.93px] lg:pb-[19.2px]"
        >
            <div
                ref={sectionRef}
                style={{ backgroundImage: isInView ? `url(${imgSrc})` : "" }}
                className={`bg-cover bg-center bg-secondary-light dark:bg-hover-dark h-[129.71px] w-full rounded-t-2xl transition-opacity duration-500 ${
                    isInView ? "opacity-100" : "opacity-0"
                }`}
            ></div>
            <div className="text-primary-dark dark:text-primary-light">
                <div className="flex items-center justify-between pb-[6.02px] pt-[18px] px-[18px] border-b-[1.4px] border-[#505050]">
                    <span className="text-primary-dark dark:text-[#C5C6CB] text-xs leading-[15.43px]">
                        COURSE
                    </span>
                    <img src={saveIcon} alt="" />
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
                    <div className="dark:bg-[#444549] bg-primary-light rounded-full p-1 w-fit hover:scale-110">
                        <HiOutlineArrowRight className="dark:text-primary-light text-primary-dark w-4 h-4 cursor-pointer hover:scale-110" />
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
