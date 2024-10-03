import CourseCard from "../CourseCard";
import PropTypes from "prop-types";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const InfiniteScrollComponent = ({ data }) => {
    const [learningModules, setLearningModules] = useState([])

    return (
        <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-x-24 gap-y-16">
            {data.map((course, index) => (
                <CourseCard
                    key={index}
                    title={course?.title}
                    moduleId={course?._id}
                    totalParts={course?.totalParts}
                    imgSrc={course?.imgSrc}
                    stageNumber={course?.stageNumber}
                    stageName={course?.stageName}
                    course={course}
                    learningModules={learningModules}
                    setLearningModules={setLearningModules}
                />
            ))}
        </div>
    );
};

InfiniteScrollComponent.propTypes = {
    data: PropTypes.array,
};

export default InfiniteScrollComponent;
