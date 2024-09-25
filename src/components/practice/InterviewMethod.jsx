import React, { useState } from "react";
import listIcon from "../../assets/list.svg";
import micIcon from "../../assets/microphone.svg";
import videoIcon from "../../assets/video.svg";
import { SlOptionsVertical } from "react-icons/sl";
import Button from "../reusables/Button";

const interviewMethod = [
    {
        icon: listIcon,
        name: "Written",
    },
    {
        icon: micIcon,
        name: "Voice & Text",
    },
    {
        icon: videoIcon,
        name: "Live Record",
    },
];

function InterviewMethod() {
    const [selectedMethod, setSelectedMethod] = useState("");

    return (
        <main className="px-5 lg:px-8">
            <p className="text-primary-dark dark:text-ternary-light text-[18px] leading-[22.5px]">
                Kindly select the method of Interview that best suits you
            </p>
            <div
                className={`grid grid-cols-2 lg:grid-cols-3 gap-[52px] lg:gap-[72px] mt-14 lg:mt-[114px] mb-10 lg:mb-24 w-[362px] lg:w-[807px] mx-auto`}
            >
                {interviewMethod.map(({ name, icon }, index) => {
                    return (
                        <div
                            key={index}
                            className={`relative dark:bg-hover-dark w-[155px] h-[128px] lg:w-[221px] lg:h-[183px] rounded-[15px] border-2  flex items-center justify-center cursor-pointer hover:border-brand-color ${
                                selectedMethod
                                    ? "border-brand-color"
                                    : "border-hover-dark"
                            }`}
                        >
                            <div className="absolute top-0 right-0 pt-6 pr-4">
                                <SlOptionsVertical />
                            </div>
                            <div className="flex flex-col items-center gap-5">
                                <img src={icon} alt="" className="w-6 lg:w-12" />
                                <p className="lg:text-[18px] leading-[22.5px] text-sm">{name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-fit mx-auto">
                <Button
                    className={`bg-brand-color text-white rounded-lg py-2 px-10 transition-opacity duration-500 ${
                        selectedMethod ? "opacity-100" : "opacity-40"
                    }`}
                >
                    Next
                </Button>
            </div>
        </main>
    );
}

export default InterviewMethod;
