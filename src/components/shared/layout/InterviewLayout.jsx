import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Timer from "../../reusables/Timer";
import Logo from "../../../assets/logo-black-white.svg";

function InterviewLayout() {
    const timerRef = useRef(null);

    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         timerRef.current?.classList.add("fixed ");
    //     });
    // }, []);

    return (
        <main className="relative pt-1">
            <div
                ref={timerRef}
                className="pb-4 border-b-[0.5px] border-[#585858] w-full z-30 sticky top-0 left-0 bg-hover-dark"
            >
                <div className="px-5 lg:px-8">
                    <Timer />
                </div>
            </div>
            <Outlet />
        </main>
    );
}

export default InterviewLayout;
