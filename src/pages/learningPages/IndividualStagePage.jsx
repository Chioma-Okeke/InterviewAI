import React from "react";
import CourseCard from "../../components/CourseCard";
import { useParams } from "react-router-dom";
import InfiniteScrollComponent from "../../components/reusables/InfiniteScrollComponent";

function IndividualStagePage() {
    const { stagemodule } = useParams();
    return (
        <main className="px-5 lg:px-8 pb-10 mb-10">
            <div>
                {/* <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard /> */}
                <InfiniteScrollComponent/>
            </div>
        </main>
    );
}

//loader function
// export const individualStageModule = async ({params}) => {
//     const stagemodule = params

//     const response =
// }

export default IndividualStagePage;
