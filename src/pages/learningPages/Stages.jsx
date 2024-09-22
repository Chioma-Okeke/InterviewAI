import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NoteIcon from "../../assets/notes.svg";
import FolderIcon from "../../assets/folder.svg";
import PencilIcon from "../../assets/pencil.svg";
import LogoOutLine from "../../assets/logooutline.svg";
import ServiceCard from "../../components/ServiceCard";
import CourseCard from "../../components/CourseCard";

const stages = [
    {
        Icon: NoteIcon,
        title: "Core Stage",
        link: "/user/learning/stages/core",
        description:
            "Understand job descriptions, create an impactful resume, and write a compelling cover letter to make your first impression count",
    },
    {
        Icon: PencilIcon,
        title: "Preparation Stage",
        link: "/stages/preparationstage",
        description:
            "Refine your answers to common questions, research companies effectively, and build a strong interview presence to make a lasting impression",
    },
    {
        Icon: FolderIcon,
        title: "Application Stage",
        link: "/stages/applicationstage",
        description:
            "Tailor your resume and cover letter for each job, apply with impact, and track your applications for better results",
    },
    {
        Icon: LogoOutLine,
        title: "Interview Stage",
        link: "/stages/interviewstage",
        description:
            "Master answering tricky questions, showcasing your skills, and making a memorable impression to land the job",
    },
];

function Stages() {
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data, "passed");

    return (
        // <div>{data?.selectedInterest}</div>
        <div>
            <main className="px-5 lg:px-8 pb-10">
                <div>
                    <div>
                        <p className="text-primary-dark dark:text-primary-light">
                            Start Your Journey by Selecting a Stage That Matches
                            Your Current Needs
                        </p>
                    </div>
                    <div className="flex items-center flex-col lg:w-[967px] mx-auto mt-14">
                        <div className="grid lg:grid-cols-2 gap-y-10 lg:gap-y-20 gap-x-[171px] w-full place-content-center">
                            {stages.map((stage, index) => {
                                return (
                                    <ServiceCard
                                        Icon={stage.Icon}
                                        title={stage.title}
                                        description={stage.description}
                                        key={index}
                                        link={stage.link}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
            <main className="lg:px-8 lg:pb-10">
                <Outlet />
            </main>
        </div>
    );
}

export default Stages;
