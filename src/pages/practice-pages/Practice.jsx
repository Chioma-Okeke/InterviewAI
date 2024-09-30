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
    const { pathname } = useLocation();
    const [selectedProfile, setSelectedProfile] = useState({});

    useEffect(() => {
        async function fetchData() {
            const userServices = new UserServices();
            setLoading(true);
            try {
                const response = await userServices.getJobProfiles(token);
                console.log(response, "data from job profile fetch");
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
        <main className="text-primary-dark dark:text-primary-light">
            <div>
                <Outlet />
            </div>
            <ToastContainer />
        </main>
    );
}

export default Practice;
