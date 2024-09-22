import { useState, useEffect, useContext } from "react";
import { UserServices } from "../../services/UserServices";
import { AuthContext } from "../../contexts/AuthContext";
import CourseCard from "../CourseCard";

const InfiniteScrollComponent = () => {
    const [data, setData] = useState([]); // Fetched data
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const [loading, setLoading] = useState(false); // Loading state
    const [hasMore, setHasMore] = useState(true); // To check if more data is available
    const { token } = useContext(AuthContext);

    const itemsPerPage = 10; // Number of items to fetch per page

    // Function to fetch paginated data
    const fetchData = async (page) => {
        setLoading(true);
        const userServices = new UserServices();
        try {
            const response = await userServices.x(
                page,
                itemsPerPage,
                token
            );

            const fetchedData = response.data.items;
            console.log(fetchData, "modules");
            setData((prevData) => [...prevData, ...fetchedData]); // Append new data to the existing data
            setTotalPages(response.data.totalPages); // Update total pages from the API

            // If we have loaded all the pages, set `hasMore` to false
            if (page >= response.data.totalPages) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    // Function to handle scrolling
    const handleScroll = () => {
        const scrollTop =
            (window.pageYOffset || document.documentElement.scrollTop) -
            (document.documentElement.clientTop || 0);
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

    // Fetch the first page on component mount
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    // Attach scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    return (
        <div className="grid lg:grid-cols-3 gap-x-24 gap-y-16">
            <CourseCard data={data}/>
        </div>
    );
};

export default InfiniteScrollComponent;
