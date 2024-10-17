import React from "react";
import starBackground from "../../assets/background.svg";
import Button from "../reusables/Button";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <main className="text-primary-dark dark:text-primary-light">
            <div
                style={{ backgroundImage: `url(${starBackground})` }}
                className="bg-center bg-no-repeat bg-cover h-[448px] max-w-[1248px] mx-auto flex items-center justify-center"
            >
                <div className="w-[900px] mx-auto flex flex-col gap-12">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-[64px] leading-[80px] text-center">
                            Prepare ro Ace Your Next Job Interview
                        </h1>
                        <p className="text-center max-w-[613px] mx-auto text-[20px] leading-[28px]">
                            Get customized tips and practice questions to help
                            you feel confident and succeed in your next job
                            interview.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link to={"/auth"}>
                            <Button className="bg-brand-color rounded-3xl py-3 px-6 shadow-custom flex items-center gap-2 transition-all ease-in-out hover:scale-110 duration-500">
                                <span>Get started</span>
                                <GoArrowUpRight color="#ECECEC" size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HeroSection;
