import { useEffect, useRef, useState } from "react";
import CreateInterviewCard from "../../components/practice/CreateInterviewCard";
import ExistingProfiles from "../../components/practice/ExistingProfiles";

function Practice() {
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);
    const [tabIndex, setTabIndex] = useState(1);
    const [isProfileExisting, setIsProfileExisting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        let section = sectionRef.current;

        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <main className="text-primary-dark dark:text-primary-light pb-44">
            <div className=" flex flex-col gap-16">
                <div className="relative flex items-center gap-[72px] w-fit mx-auto">
                    {/* The animated border */}
                    <div
                        className={`absolute bottom-0 h-[3px] bg-brand-color transition-all ease-linear duration-300`}
                        style={{
                            width: "115px", // Adjust these widths according to tab text width
                            left: tabIndex === 1 ? "0px" : "calc(114px + 72px)", // Adjust the left position based on tabIndex
                        }}
                    ></div>

                    <p
                        onClick={() => setTabIndex(1)}
                        className={`transition-opacity duration-500 ${
                            tabIndex === 1 ? "opacity-100" : "opacity-70"
                        } relative z-10 pb-2 leading-[20px]`}
                    >
                        New Interview
                    </p>
                    <p
                        onClick={() => setTabIndex(2)}
                        className={`transition-opacity duration-500 ${
                            tabIndex === 2 ? "opacity-100" : "opacity-70"
                        } relative z-10 pb-2 leading-[20px]`}
                    >
                        Past Interview
                    </p>
                </div>

                {tabIndex === 1 && (
                    <div>
                        {!isProfileExisting ? (
                            <ExistingProfiles />
                        ) : (
                            <CreateInterviewCard />
                        )}
                    </div>
                )}
                {tabIndex === 2 && <p>hello</p>}
            </div>
        </main>
    );
}

export default Practice;
