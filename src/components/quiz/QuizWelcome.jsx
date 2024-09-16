import React from "react";
import Button from "../reusables/Button";
import QuizIllustration from "../../assets/quiz-illustration.png"

function QuizWelcome() {
    return (
        <div className="py-[48.79px]">
            <div className="flex flex-col items-center gap-10">
                <div>
                    <img src={QuizIllustration} alt="" className="w-[280px]"/>
                </div>
                <div className="text-primary-dark dark:text-primary-light text-center">
                    <h2 className="text-2xl">Ready for Quiz</h2>
                    <p>
                        Test yourself on the skills in this course to solidify
                        the mastery of what you already know
                    </p>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <Button className="rounded-lg bg-brand-color text-sm leading-[22px] py-2 w-[114px] text-white">
                        Start Quiz
                    </Button>
                    <Button className="rounded-lg text-sm leading-[22px] py-2 w-[114px] text-primary-dark dark:text-ternary-light border-2 border-primary-dark dark:border-ternary-dark">
                        Skip Quiz
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default QuizWelcome;
