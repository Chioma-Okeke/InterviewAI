import React, { useState, useEffect, useContext } from "react";
import CourseCard from "../../components/CourseCard";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserServices } from "../../services/UserServices";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "../../components/reusables/LoadingComponent";

function IndividualStagePage() {
    const { stagemodule } = useParams();
    const { token, isAuthenticated } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Fetch data on initial load
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userServices = new UserServices();
            try {
                if (isAuthenticated) {
                    const response = await userServices.getModules(
                        token,
                        stagemodule,
                        `?_=${new Date().getTime()}` // Cache-busting
                    );

                    console.log(response, "data");
                    if (Array.isArray(response)) {
                        setData(response);
                    } else {
                        // Handle if response is not an array
                        setData([response]);
                    }
                } else {
                    navigate("/auth/login");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response?.status === 401) {
                    toast.error("You need to be logged in to access learning modules.");
                    setTimeout(() => {
                        navigate("/auth/login");
                    }, 2000);
                } else {
                    toast.error("Error when fetching data. Kindly reload page.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [stagemodule, token, isAuthenticated, navigate]);

    return (
        <main className="lg:px-8 pb-10 mb-10">
            {pathname === `/user/learning/stages/${stagemodule}` && (
                <div className="relative min-h-screen">
                    {!loading && (
                        <div>
                            {data.length > 0 ? (
                                data.map((module) => (
                                    <CourseCard key={module.id} module={module} />
                                ))
                            ) : (
                                <p className="text-primary-dark dark:text-primary-light">
                                    No learning modules available.
                                </p>
                            )}
                        </div>
                    )}
                    {loading && <LoadingComponent />}
                </div>
            )}
            <Outlet />
            <ToastContainer />
        </main>
    );
}

export default IndividualStagePage;
