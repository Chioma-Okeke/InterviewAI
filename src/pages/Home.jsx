// import React from 'react'
import Logo from "../assets/logo-black-white.svg";
import AppHeader from "../components/shared/AppHeader";
import PageLayout from "../components/shared/layout/PageLayout";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import LogoDark from "../assets/logo-black-white.svg";
import LogoLight from "../assets/logo.svg";
import BookIcon from "../assets/book.svg";
import SuitcaseIcon from "../assets/suitcase.svg";
import ServiceCard from "../components/ServiceCard";
import { useState } from "react";

console.log("hi");
const services = [
    {
        Icon: BookIcon,
        title: "Learning",
        description:
            "Elevate your job search skills and interview readiness with tailored lessons that equip you with the knowledge and tools needed to craft standout applications",
    },
    {
        Icon: SuitcaseIcon,
        title: "Practice",
        description:
            "Tackle customized practice questions and refine your responses with instant feedback, designed to boost your confidence and prepare you for the Job interview",
    },
];

function Home() {
    const [theme, setTheme] = useThemeSwitcher();

    return (
        <PageLayout>
            <main className="relative flex-1 flex lg:items-center lg:justify-center">
                <div className="flex items-center flex-col gap-[100px] lg:w-[868px] mx-auto">
                    <div className="hidden lg:block">
                        {theme === "dark" ? (
                            <img
                                src={LogoDark}
                                alt="Dark Logo"
                                className="w-[61px]"
                            />
                        ) : (
                            <img
                                src={LogoLight}
                                alt="Light Logo"
                                className="w-[61px]"
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-10 flex-col lg:flex-row lg:gap-[72px] mt-[44px] lg:mt-0">
                        {services.map((service, index) => {
                            return (
                                <ServiceCard
                                    key={index}
                                    Icon={service.Icon}
                                    title={service.title}
                                    description={service.description}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>
        </PageLayout>
    );
}

export default Home;
