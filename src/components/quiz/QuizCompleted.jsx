import React from "react";
import QuizIllustration from "../../assets/quiz-illustration2.png"
import Button from "../reusables/Button";

function QuizCompleted() {
    return (
        <div className="py-[48.79px]">
            <div className="flex flex-col items-center gap-10">
                <div>
                    <img src={QuizIllustration} alt="" className="w-[280px]" loading="lazy"/>
                </div>
                <div className="text-primary-dark dark:text-primary-light text-center">
                    <h2 className="text-2xl">Hurray!</h2>
                    <p>
                        Congrats on finishing the quiz and core stage! You’re
                        ready for the next step—let&apos;s keep going.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <Button className="rounded-lg bg-brand-color text-sm leading-[22px] w-[140px] p-2 text-white">
                        Begin Preparation
                    </Button>
                    <Button className="rounded-lg text-sm leading-[22px] w-[140px] p-2 text-primary-dark dark:text-white border-2 border-brand-color">
                        Retake Quiz
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default QuizCompleted;
