import React, { useRef, useState } from "react";
import CorrectIcon from "../../assets/tickIcon.svg";
import WrongIcon from "../../assets/xIcon.svg";
import {data } from "../../data/data.js"
import Button from "../reusables/Button.jsx";

function QuestionSection() {
    const [isAnswerRight, setIsAnswerRigth] = useState(false);
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0)

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let optionArray = [option1, option2, option3, option4];

    function checkAnswer(e, answer) {
        if (lock === false) {
            if (question.ans == answer) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prevState => prevState + 1)
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                optionArray[question.ans - 1].current.classList.add(
                    "correct"
                );
            }
        }
    }

    function nextQuestion () {
        if (lock === true) {
            setIndex(prevIndex => ++prevIndex)
            setQuestion(data[index])
            setLock(false)
            console.log(question, "question on next")
            optionArray.forEach((option) => {
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null
            })
        }
    }

    return (
        <div className="text-[#4E4E4E] dark:text-primary-light">
            <div className="flex flex-col gap-4 mb-8">
                <p className="leading-[22px] font-medium text-primary-dark dark:text-primary-light">
                    Question {index+1} / {data.length}
                </p>
                <p className="leading-[22px] text-primary-dark dark:text-primary-light">
                    {question.question}
                </p>
            </div>
            <div className="option_container">
                <ul className="flex flex-col gap-[18px]">
                    <li
                        ref={option1}
                        onClick={(e) => checkAnswer(e,1)}
                        className="flex items-center justify-between bg-[#F4F4F4] dark:bg-hover-dark border border-[#585858] px-4 py-[18px]"
                    >
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
                                {question.option1}
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? (
                                <img src={CorrectIcon} />
                            ) : (
                                <img src={WrongIcon} />
                            )}
                        </div>
                    </li>
                    <li
                        ref={option2}
                        onClick={(e) => checkAnswer(e,2)}
                        className="flex items-center justify-between bg-[#F4F4F4] dark:bg-hover-dark border border-[#585858] px-4 py-[18px]"
                    >
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
                                {question.option2}
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? (
                                <img src={CorrectIcon} />
                            ) : (
                                <img src={WrongIcon} />
                            )}
                        </div>
                    </li>
                    <li
                        ref={option3}
                        onClick={(e) => checkAnswer(e,3)}
                        className="flex items-center justify-between bg-[#F4F4F4] dark:bg-hover-dark border border-[#585858] px-4 py-[18px]"
                    >
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
                                {question.option3}
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? (
                                <img src={CorrectIcon} />
                            ) : (
                                <img src={WrongIcon} />
                            )}
                        </div>
                    </li>
                    <li
                        ref={option4}
                        onClick={(e) => checkAnswer(e,4)}
                        className="flex items-center justify-between  bg-[#F4F4F4] dark:bg-hover-dark border border-[#585858] px-4 py-[18px]"
                    >
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
                                {question.option4}
                            </label>
                        </div>
                        <div>
                            {isAnswerRight ? (
                                <img src={CorrectIcon} />
                            ) : (
                                <img src={WrongIcon} />
                            )}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="w-full flex justify-end">
                <Button className="bg-brand-color p-2 rounded-lg text-white text-sm leading-[22px] w-[114px] mt-5" onClick={nextQuestion}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default QuestionSection;
