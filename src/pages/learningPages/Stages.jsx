import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../../components/shared/layout/PageLayout";
import NoteIcon from "../../assets/notes.svg";
import FolderIcon from "../../assets/folder.svg";
import PencilIcon from "../../assets/pencil.svg";
import LogoOutLine from "../../assets/logooutline.svg";
import ServiceCard from "../../components/ServiceCard";
import CoursesContainer from "../../components/shared/layout/CoursesContainer";

const stages = [
    {
        Icon: NoteIcon,
        title: "Core Stage",
        description:
            "Understand job descriptions, create an impactful resume, and write a compelling cover letter to make your first impression count",
    },
    {
        Icon: PencilIcon,
        title: "Preparation Stage",
        description:
            "Refine your answers to common questions, research companies effectively, and build a strong interview presence to make a lasting impression",
    },
    {
        Icon: FolderIcon,
        title: "Application Stage",
        description:
            "Tailor your resume and cover letter for each job, apply with impact, and track your applications for better results",
    },
    {
        Icon: LogoOutLine,
        title: "Interview Stage",
        description:
            "Master answering tricky questions, showcasing your skills, and making a memorable impression to land the job",
    },
];

function Stages() {
    const location = useLocation();
    const { data } = location.state || {};
    const [stageSelected, setStageSelected] = useState(false);
    console.log(data, "passed");

    function handleStageSelection() {
        setStageSelected((prevState) => !prevState);
    }

    return (
        // <div>{data?.selectedInterest}</div>
        <PageLayout>
            {!stageSelected && (
                <main className="px-5 lg:px-8 pb-10">
                    <div>
                        <div>
                            <p className="text-primary-dark dark:text-primary-light">
                                Start Your Journey by Selecting a Stage That
                                Matches Your Current Needs
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
                                            onClick={handleStageSelection}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            )}
            <main className="lg:px-8 lg:pb-10">
                {stageSelected && (
                    <CoursesContainer onClick={handleStageSelection} />
                )}
            </main>
        </PageLayout>
    );
}

export default Stages;
