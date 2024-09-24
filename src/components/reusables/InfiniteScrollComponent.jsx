import { UserServices } from "../../services/UserServices";
import CourseCard from "../CourseCard";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const InfiniteScrollComponent = ({ data }) => {
    const { token } = useContext(AuthContext);

    async function addModuleToProfile() {
        const userServices = new UserServices();
        try {
            const response = await userServices.addModuleToUserProfile(
                data,
                token
            );
            console.log(response)
            toast.success("Module has been successfully added to profile.");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="grid lg:grid-cols-3 gap-x-24 gap-y-16">
            {data.map((course, index) => (
                <CourseCard
                    key={index}
                    title={course.title}
                    moduleId={course._id}
                    totalParts={course.totalParts}
                    imgSrc={course.imgSrc}
                    addModuleToProfile={addModuleToProfile}
                    stageNumber={course.stageNumber}
                />
            ))}
        </div>
    );
};

InfiniteScrollComponent.propTypes = {
    data: PropTypes.array,
};

export default InfiniteScrollComponent;
