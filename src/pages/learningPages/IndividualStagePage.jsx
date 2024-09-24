import React, { useState, useEffect, useContext } from "react";
import CourseCard from "../../components/CourseCard";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScrollComponent from "../../components/reusables/InfiniteScrollComponent";
import { UserServices } from "../../services/UserServices";
import { AuthContext } from "../../contexts/AuthContext";
import { ring2 } from "ldrs";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IndividualStagePage() {
    const [theme, setTheme] = useThemeSwitcher();
    const { stagemodule } = useParams();
    const { token, isAuthenticated } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    ring2.register();

    // Fetch data on initial load and page change
    useEffect(() => {
        const fetchData = async (page) => {
            setLoading(true);
            const userServices = new UserServices();
            try {
                setData([])
                if (isAuthenticated) {
                    const response = await userServices.getModules(
                        page,
                        itemsPerPage,
                        token,
                        stagemodule // Use stage ID from route params
                    );
                    setData((prevData) => [...prevData, ...response]);
                    console.log(data, "data")
                    // setTotalPages(response.data.totalPages);
                    // if (page >= response.data.totalPages) {
                    //     setHasMore(false);
                    // }
                } else {
                    navigate("/auth/login");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response?.status === 401) {
                    toast.error(
                        "You need to be logged in to access learning modules."
                    );
                    setTimeout(() => {
                        navigate("/auth/login");
                    }, 2000)
                } else {
                    toast.error(
                        "Error when fetching data. Kindly reload page."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData(currentPage);
    }, [currentPage, stagemodule, token]);

    useEffect(() => {
        setData([]); // Clear data when component mounts
        setCurrentPage(1); // Reset to page 1
      }, []);

    // Scroll event handler
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            if (
                scrollTop + clientHeight >= scrollHeight - 5 &&
                !loading &&
                hasMore
            ) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    return (
        <main className="px-5 lg:px-8 pb-10 mb-10">
            <div className="relative min-h-screen">
                {!loading && <div>
                    {data.length > 0 ? (
                        <InfiniteScrollComponent data={data} />
                    ) : (
                        <p className="text-primary-dark dark:text-primary-light">
                            No learning Modules available
                        </p>
                    )}
                </div>}
                {loading && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <l-ring-2
                            size="40"
                            stroke="5"
                            stroke-length="0.25"
                            bg-opacity="0.1"
                            speed="0.8"
                            color={theme === "dark" ? "#ECECEC" : "#212121"}
                        ></l-ring-2>
                    </div>
                )}
                {!hasMore && (
                    <p className="text-primary-dark dark:text-primary-light">
                        No more data available.
                    </p>
                )}
            </div>
            <ToastContainer />
        </main>
    );
}

export default IndividualStagePage;
