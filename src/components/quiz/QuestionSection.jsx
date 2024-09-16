import React, { useState } from "react";
import CorrectIcon from "../../assets/tickIcon.svg"
import WrongIcon from "../../assets/xIcon.svg"

function QuestionSection() {
    const [isAnswerRight, setIsAnswerRigth] = useState(false)

    return (
        <div>
            <div className="flex flex-col gap-4 mb-8">
                <p className="leading-[22px] font-medium text-primary-dark dark:text-primary-light">
                    Question 1/5
                </p>
                <p className="leading-[22px] text-primary-dark dark:text-primary-light">
                    What is the best way to tailor your resume when applying for
                    a specific UI/UX design job?
                </p>
            </div>
            <div>
                <ul className="flex flex-col gap-[18px]">
                    <li className="flex items-center justify-between bg-hover-dark border border-[#585858] px-4 py-[18px]">
                        <div className="flex gap-4">
                            <input
                                type="radio"
                                id="option"
                                className="bg-none border-[1.5px] border-[#C5C6CB]"
                            />
                            <label
                                htmlFor="option"
                                className="w-[319px] leading-[22px] text-primary-dark dark:text-primary-light"
                            >
                                Use a generic resume that lists list all your
                                skills and experiences
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? <img src={CorrectIcon}/> : <img src={WrongIcon}/>}
                        </div>
                    </li>
                    <li className="flex items-center justify-between bg-hover-dark border border-[#585858] px-4 py-[18px]">
                        <div className="flex gap-4">
                            <input
                                type="radio"
                                id="option"
                                className="bg-none border-[1.5px] border-[#C5C6CB]"
                            />
                            <label
                                htmlFor="option"
                                className="w-[319px] leading-[22px] text-primary-dark dark:text-primary-light"
                            >
                                Use a generic resume that lists list all your
                                skills and experiences
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? <img src={CorrectIcon}/> : <img src={WrongIcon}/>}
                        </div>
                    </li>
                    <li className="flex items-center justify-between bg-hover-dark border border-[#585858] px-4 py-[18px]">
                        <div className="flex gap-4">
                            <input
                                type="radio"
                                id="option"
                                className="bg-none border-[1.5px] border-[#C5C6CB]"
                            />
                            <label
                                htmlFor="option"
                                className="w-[319px] leading-[22px] text-primary-dark dark:text-primary-light"
                            >
                                Use a generic resume that lists list all your
                                skills and experiences
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? <img src={CorrectIcon}/> : <img src={WrongIcon}/>}
                        </div>
                    </li>
                    <li className="flex items-center justify-between bg-hover-dark border border-[#585858] px-4 py-[18px]">
                        <div className="flex gap-4">
                            <input
                                type="radio"
                                id="option"
                                className="bg-none border-[1.5px] border-[#C5C6CB]"
                            />
                            <label
                                htmlFor="option"
                                className="w-[319px] leading-[22px] text-primary-dark dark:text-primary-light"
                            >
                                Use a generic resume that lists list all your
                                skills and experiences
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? <img src={CorrectIcon}/> : <img src={WrongIcon}/>}
                        </div>
                    </li>
                    <li className="flex items-center justify-between bg-hover-dark border border-[#585858] px-4 py-[18px]">
                        <div className="flex gap-4">
                            <input
                                type="radio"
                                id="option"
                                className="bg-none border-[1.5px] border-[#C5C6CB]"
                            />
                            <label
                                htmlFor="option"
                                className="w-[319px] leading-[22px] text-primary-dark dark:text-primary-light"
                            >
                                Use a generic resume that lists list all your
                                skills and experiences
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? <img src={CorrectIcon}/> : <img src={WrongIcon}/>}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default QuestionSection;
