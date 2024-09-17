import { useState } from "react";
import { Link } from "react-router-dom";
import CareerInterestCard from "../../components/CareerInterestCard";
import Button from "../../components/reusables/Button";

const careerInterest = [
    "Software Development",
    "Game Development",
    "Cyber Security",
    "Artificial Intelligence",
    "Cloud Computing",
    "UI/UX Design",
    "Product Management",
    "Blockchain",
    "Web Development",
    "Networking",
];

function Learning() {
    const [selectedInterest, setSelectedInterest] = useState("Ui/UX");
    const data = { selectedInterest };
    return (
        <main className="px-5 lg:px-8 pb-8">
            <div>
                <p className="text-primary-dark dark:text-primary-light mb-3">
                    Select your career interest
                </p>
                <p className="text-primary-dark dark:text-ternary-light text-sm leading-[17.5px]">
                    You’re not to pick more than two career interest to
                    personalize your learning experience
                </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-[50px] gap-y-10 lg:gap-y-20 mt-12 lg:mt-40 mb-9 lg:mb-24">
                {careerInterest.map((interest, index) => {
                    return <CareerInterestCard key={index} title={interest} />;
                })}
            </div>
            <div className="flex items-center justify-end lg:justify-center">
                <Button className="bg-brand-color text-white py-[14px] px-12 lg:px-16 rounded-lg lg:w-[271px]">
                    Next
                </Button>
            </div>
            <Link
                to={`/stages`}
                state={{ data }}
                onClick={window.scrollTo(0, 0)}
                className="text-primary-dark dark:text-primary-light text-2xl font-medium"
            >
                stages
            </Link>
        </main>
    );
}

export default Learning;
