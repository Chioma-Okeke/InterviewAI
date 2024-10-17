import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCallback, useContext, useEffect, useState } from "react";

import Button from "../reusables/Button";
import ExistingProfiles from "./ExistingProfiles";
import CreateInterviewCard from "./CreateInterviewCard";
import { AuthContext } from "../../contexts/AuthContext";
import { UserServices } from "../../services/UserServices";
import LoadingComponent from "../reusables/LoadingComponent";
import ConstructionIllustration from "../../assets/construction-concept-illustration.png";

function First() {
    const [tabIndex, setTabIndex] = useState(1);
    const [loading, setLoading] = useState(false);
    const [userProfiles, setUserProfiles] = useState([]);
    const { token } = useContext(AuthContext);

    const fetchData = useCallback(async () => {
        const userServices = new UserServices();
        setLoading(true);
        try {
            const response = await userServices.getJobProfiles(token);
            setUserProfiles(response);
        } catch (error) {
            toast.error(
                error.response?.data?.msg || "Error when fetching profiles"
            );
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        <LoadingComponent />;
    }

    return (
        <main className="text-primary-dark dark:text-primary-light pb-20">
            {loading ? (
                <LoadingComponent />
            ) : (
                <div className=" flex flex-col ">
                    <div className="relative flex items-center gap-[72px] w-fit mx-auto">
                        {/* The animated border */}
                        <div
                            className={`absolute bottom-0 h-[3px] bg-brand-color transition-all ease-linear duration-300`}
                            style={{
                                width: "115px", // Adjust these widths according to tab text width
                                left:
                                    tabIndex === 1
                                        ? "0px"
                                        : "calc(114px + 72px)", // Adjust the left position based on tabIndex
                            }}
                        ></div>

                        <p
                            onClick={() => setTabIndex(1)}
                            className={`transition-opacity duration-500 hover:opacity-100 ${
                                tabIndex === 1 ? "opacity-100" : "opacity-70"
                            } relative z-10 pb-2 leading-[20px] cursor-pointer`}
                        >
                            New Interview
                        </p>
                        <p
                            onClick={() => setTabIndex(2)}
                            className={`transition-opacity duration-500 hover:opacity-100 ${
                                tabIndex === 2 ? "opacity-100" : "opacity-70"
                            } relative z-10 pb-2 leading-[20px] cursor-pointer`}
                        >
                            Past Interview
                        </p>
                    </div>

                    {tabIndex === 1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.4 }}
                        >
                            <div className="mt-16">
                                {userProfiles?.length > 0 ? (
                                    <ExistingProfiles
                                        userProfiles={userProfiles}
                                        fetchData={fetchData}
                                    />
                                ) : (
                                    <CreateInterviewCard
                                        fetchData={fetchData}
                                    />
                                )}
                            </div>
                        </motion.div>
                    )}
                    {tabIndex === 2 && (
                        <motion.main
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.4 }}
                            className="relative lg:min-h-screen text-primary-dark dark:text-primary-light flex lg:items-center justify-center mb-10"
                        >
                            <div className="max-w-[382px] flex flex-col gap-8 lg:gap-10 mt-5">
                                <div className="px-[20.5px]">
                                    <LazyLoadImage
                                        src={ConstructionIllustration}
                                        alt="Listing Image"
                                        effect="blur"
                                        className="mx-auto"
                                        wrapperProps={{
                                            style: { transitionDelay: "1s" },
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 text-center">
                                    <h2 className="text-primary-dark dark:text-primary-light text-xl lg:text-[23px] ">
                                        Page is currently under construction
                                    </h2>
                                </div>
                                <Link
                                    to={"/user/dashboard"}
                                    className="w-fit mx-auto"
                                >
                                    <Button className="text-white bg-brand-color w-[182px] py-3 px-6 rounded-lg">
                                        Go to Homepage
                                    </Button>
                                </Link>
                            </div>
                        </motion.main>
                    )}
                </div>
            )}
        </main>
    );
}

export default First;
