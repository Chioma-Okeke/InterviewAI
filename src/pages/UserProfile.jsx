import React from "react";
import { CgCalendarNext, CgProfile } from "react-icons/cg";
import { HiOutlineLocationMarker, HiPlus } from "react-icons/hi";
import Button from "../components/reusables/Button";
import FormInput from "../components/reusables/FormInput";
import Input from "../components/reusables/Input";
import EditIcon from "../assets/edit.svg";
import AddIcon from "../assets/add.svg";
import { MdNavigateNext } from "react-icons/md";

function UserProfile() {
    return (
        <main className="px-5 lg:px-8 pb-10 text-primary-dark dark:text-primary-light">
            <h1 className="text-xl leading-[25px] mb-6">My Profile</h1>
            <div className="w-full bg-[#1c1c1c] p-8 rounded-[20px]">
                <div className="flex items-center justify-between my-5">
                    <div className="flex items-center gap-6">
                        <div>
                            <CgProfile
                                size={70}
                                className="text-primary-dark dark:text-primary-light"
                            />
                        </div>
                        <div className="flex flex-col gap-[3px]">
                            <h3 className="text-[18px] leading-[22.5px]">
                                Chioma Okeke
                            </h3>
                            <p className="dark:text-[#C5C6CB] leading-5">
                                UI/UX Designer
                            </p>
                            <div className="flex items-center dark:text-ternary-light gap-[6.25px] leading-[17.5px]">
                                <HiOutlineLocationMarker />
                                <p>Lagos, Nigeria</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Button className="rounded-lg border border-brand-color py-2 px-3 text-white text-sm transition ease-in-out hover:bg-brand-color duration-500">
                            See Public View
                        </Button>
                        <Button className="rounded-lg bg-brand-color border border-brand-color py-2 px-3 text-white text-sm transition ease-in-out hover:bg-transparent duration-500">
                            Profile Settings
                        </Button>
                    </div>
                </div>
                <div className="border border-[#3B3B3B] flex">
                    <div className="px-8 py-6 border border-[#3B3B3B] w-[60%] bg-[#1c1c1c]">
                        <form action="" className="flex flex-col gap-6 ">
                            <div className="flex items-center gap-8">
                                <Input
                                    inputName="search"
                                    inputLabel="First Name"
                                    inputGroupClassNames="flex flex-col gap-3 w-[253px]"
                                    placeholderText="Enter first name"
                                    // inputValue={query}
                                    inputId="firstname"
                                    ariaLabelName="First Name"
                                    // onChange={(e) => setQuery(e.target.value)}
                                    // onFocus={handleFocus}
                                    // onBlur={handleBlur}
                                    className="pl-[18px] py-3 outline-none border border-hover-dark dark:bg-hover-dark focus:border-brand-color hover:border-brand-color"
                                    isRequired
                                />
                                <Input
                                    inputName="search"
                                    inputLabel="Last Name"
                                    inputGroupClassNames="flex flex-col gap-3 w-[253px]"
                                    placeholderText="Enter last name"
                                    // inputValue={query}
                                    inputId="lastName"
                                    ariaLabelName="Last Name"
                                    // onChange={(e) => setQuery(e.target.value)}
                                    // onFocus={handleFocus}
                                    // onBlur={handleBlur}
                                    className="pl-[18px] py-3 outline-none border border-hover-dark dark:bg-hover-dark focus:border-brand-color hover:border-brand-color"
                                    isRequired
                                />
                            </div>
                            <div>
                                <Input
                                    inputName="search"
                                    inputLabel="Portfolio Link"
                                    inputGroupClassNames="flex flex-col gap-3 w-full"
                                    placeholderText="Enter portfolio link"
                                    // inputValue={query}
                                    inputId="portfolioLink"
                                    ariaLabelName="Portfolio Link"
                                    // onChange={(e) => setQuery(e.target.value)}
                                    // onFocus={handleFocus}
                                    // onBlur={handleBlur}
                                    className="pl-[18px] py-3 outline-none border border-hover-dark dark:bg-hover-dark focus:border-brand-color hover:border-brand-color"
                                    isRequired
                                />
                            </div>
                            <div>
                                <Input
                                    inputName="search"
                                    inputLabel="Years of Experience"
                                    inputGroupClassNames="flex flex-col gap-3 w-full"
                                    placeholderText="Enter your years of experience"
                                    // inputValue={query}
                                    inputId="yearsOfExperience"
                                    ariaLabelName="Years of Experience"
                                    // onChange={(e) => setQuery(e.target.value)}
                                    // onFocus={handleFocus}
                                    // onBlur={handleBlur}
                                    className="pl-[18px] py-3 outline-none border border-hover-dark dark:bg-hover-dark focus:border-brand-color hover:border-brand-color"
                                    isRequired
                                />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-1 text-[18px] leading-[22.5px]">
                                        <p>Job Role/Position Applying For</p>
                                        <span className="text-red-500">*</span>
                                    </div>
                                    <div className="w-fit text-white bg-brand-color py-2 px-[10px] rounded-2xl">
                                        <p className="text-sm leading-[17.5px]">
                                            UI/UX Designer
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <img src={EditIcon} alt="" className="w-6 transition ease-in-out hover:scale-110 cursor-pointer duration-300"/>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-1 text-[18px] leading-[22.5px]">
                                        <p>Resume</p>
                                        <span className="text-red-500">*</span>
                                    </div>
                                    <div className="w-fit text-white bg-brand-color py-2 px-[10px] rounded-2xl">
                                        <p className="text-sm leading-[17.5px]">
                                            UI/UX Designer
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <img src={EditIcon} alt="" className="w-6 transition ease-in-out hover:scale-110 cursor-pointer duration-300"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-[40%] bg-[#1c1c1c] px-6 py-8 flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <p className="text-[18px]">Add Profile</p>
                                <div>
                                    <img src={AddIcon} alt="" className="transition ease-in-out hover:scale-110 cursor-pointer duration-300"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>UX Writer</p>
                                <div>
                                    <MdNavigateNext size={25}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <p>Skills</p>
                                <div>
                                    <img
                                        src={EditIcon}
                                        alt=""
                                        className="w-6 transition ease-in-out hover:scale-110 cursor-pointer duration-300"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 2xl:grid-cols-5 gap-x-5 gap-y-3">
                                <div className="w-fit text-white bg-brand-color py-2 px-[10px] rounded-2xl">
                                    <p className="text-sm leading-[17.5px] text-wrap">
                                        Wireframing
                                    </p>
                                </div>
                                <div className="w-fit text-white bg-brand-color py-2 px-[10px] rounded-2xl">
                                    <p className="text-sm leading-[17.5px] text-wrap">
                                        User Research
                                    </p>
                                </div>
                                <div className="w-fit text-white bg-brand-color py-2 px-[10px] rounded-2xl">
                                    <p className="text-sm leading-[17.5px] text-wrap">
                                        Web design
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between my-8">
                                <p className="text-[18px]">Video Introduction</p>
                                <div>
                                    <img src={AddIcon} alt="" className="transition ease-in-out hover:scale-110 cursor-pointer duration-300"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[18px]">Certificate</p>
                                <div>
                                    <img src={AddIcon} alt="" className="transition ease-in-out hover:scale-110 cursor-pointer duration-300"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UserProfile;
