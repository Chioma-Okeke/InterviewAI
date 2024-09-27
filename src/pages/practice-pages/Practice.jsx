import { useContext, useEffect, useRef, useState } from "react";
import CreateInterviewCard from "../../components/practice/CreateInterviewCard";
import ExistingProfiles from "../../components/practice/ExistingProfiles";
import { UserServices } from "../../services/UserServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";
import { Outlet, useLocation } from "react-router-dom";

function Practice() {
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);
    const [tabIndex, setTabIndex] = useState(1);
    const [isProfileExisting, setIsProfileExisting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userProfiles, setUserProfiles] = useState([]);
    const { token } = useContext(AuthContext);
    const {pathname} = useLocation()
    const [selectedProfile, setSelectedProfile] = useState("");

    useEffect(() => {
        async function fetchData() {
            const userServices = new UserServices();
            setLoading(true);
            try {
                // const response = await userServices.getJobProfiles(token);
                // console.log(response, "data from job profile fetch");
                // setUserProfiles(response);
            } catch (error) {
                toast.error(
                    error.response?.data?.msg || "Error when fetching profiles"
                );
            }
        }

        fetchData();
    }, [token]);

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
                        {pathname !== "/user/practice/interviewmethods" ? <div>
                            {userProfiles?.length > 0 ? (
                                <ExistingProfiles userProfiles={userProfiles} />
                            ) : (
                                <CreateInterviewCard
                                    setUserProfiles={setUserProfiles}
                                />
                            )}
                        </div> :
                        <div>
                            <Outlet />
                        </div>}
                    </div>
                )}
                {tabIndex === 2 && <p>hello</p>}
            </div>
            <ToastContainer />
        </main>
    );
}

export default Practice;
