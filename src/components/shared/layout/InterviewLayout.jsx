import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Timer from "../../reusables/Timer";
import Logo from "../../../assets/logo-black-white.svg";
import DialogBox from "../../reusables/DialogBox";

function InterviewLayout() {
    const timerRef = useRef(null);
    const [showRulesDialog, setShowRulesDialog] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowRulesDialog(false)
        }, 3000);
    }, []);

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
            {showRulesDialog && <DialogBox message="This interview will last for 6 minutes." />}
        </main>
    );
}

export default InterviewLayout;
