import React, { useState } from "react";
import Button from "../reusables/Button";
import { FaPlus } from "react-icons/fa6";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { SlOptionsVertical } from "react-icons/sl";

const profiles = [
    {
        name: "Ui/UX Designer",
    },
    {
        name: "UX Writer",
    },
];

const columnsClass = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    // Add more as needed
};

function ExistingProfiles() {
    const [theme, setTheme] = useThemeSwitcher();
    const gridColumns = profiles.length + 1;
    const [selectedProfile, setSelectedProfile] = useState("");

    return (
        <main className="px-5 lg:px-8">
            <p className="text-primary-dark dark:text-ternary-light text-[18px] leading-[22.5px]">
                use any of your existing profile to generate Interview
            </p>
            <div
                className={`grid grid-cols-2 ${columnsClass[gridColumns]} gap-[52px] lg:gap-[72px] mt-14 lg:mt-[114px] mb-10 lg:mb-24 w-[362px] lg:w-[807px] mx-auto`}
            >
                {profiles.map(({ name }, index) => {
                    return (
                        <div
                            key={index}
                            className={`relative dark:bg-hover-dark w-[155px] h-[128px] lg:w-[221px] lg:h-[183px] rounded-[15px] border-2  flex items-center justify-center cursor-pointer hover:border-brand-color ${
                                selectedProfile
                                    ? "border-brand-color"
                                    : "border-hover-dark"
                            }`}
                        >
                            <div className="absolute top-0 right-0 pt-6 pr-4">
                                <SlOptionsVertical color={theme === "dark" ? "#C5C6CB" : "#212121"}/>
                            </div>
                            <p className="lg:text-[18px] leading-[22.5px] text-sm">
                                {name}
                            </p>
                        </div>
                    );
                })}
                <div className=" w-[155px] h-[128px] lg:w-[221px] lg:h-[183px] rounded-[15px] border-4 border-hover-dark flex items-center justify-center cursor-pointer hover:border-brand-color">
                    <div className="bg-brand-color rounded-full hover:scale-110 p-2">
                        <FaPlus
                            color={theme === "dark" ? "#ECECEC" : "#212121"}
                        />
                    </div>
                </div>
            </div>
            <div className="w-fit mx-auto">
                <Button
                    className={`bg-brand-color text-white rounded-lg py-2 px-10 transition-opacity duration-500 ${
                        selectedProfile ? "opacity-100" : "opacity-40"
                    }`}
                >
                    Next
                </Button>
            </div>
        </main>
    );
}

export default ExistingProfiles;
