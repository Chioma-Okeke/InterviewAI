import React from "react";
import QuizIllustration from "../../assets/quiz-illustration2.png";
import Button from "../reusables/Button";
import { IoReloadOutline } from "react-icons/io5";

function QuizCompleted() {
    return (
        <div className="py-[48.79px]">
            <div className="flex flex-col items-center gap-10">
                <div>
                    <img
                        src={QuizIllustration}
                        alt=""
                        className="w-[280px]"
                        loading="lazy"
                    />
                </div>
                <div className="text-[#4E4E4E] dark:text-primary-light text-center">
                    <h2 className="text-2xl">Hurray!</h2>
                    <p>
                        Congrats on finishing the quiz and core stage! You’re
                        ready for the next step—let&apos;s keep going.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <Button className="flex rounded-lg bg-brand-color text-sm leading-[22px] gap-1 items-center p-2 text-white">
                        <IoReloadOutline size={18}/>
                        <span>Regenerate Quiz</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default QuizCompleted;
