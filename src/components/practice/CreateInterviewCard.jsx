import { useState } from "react";
import imgSrc from "../../assets/image.png"
import ProfileSelectionModal from "../modals/ProfileSelectionModal";
import Button from "../reusables/Button";

function CreateInterviewCard({fetchData}) {

    const [isCreateRequested, setIsCreateRequested] = useState(false)

    return (
        <div className="w-[95%] lg:w-[650px] flex flex-col gap-8 pb-14 bg-hover-dark rounded-3xl mx-auto">
            <div
                className={`w-full h-[439px] bg-cover bg-center rounded-t-3xl`}
                style={{
                    backgroundImage: `url(${imgSrc})`,
                }}
            ></div>
            <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between px-6">
                <p className="text-sm leading-[22px] lg:w-[400px]">
                    Start practicing interviews to get ready for your future
                    opportunities{" "}
                </p>
                <Button onClick={() => setIsCreateRequested(true)} className="bg-brand-color text-white rounded-lg p-2 text-sm">
                    Create Interview
                </Button>
            </div>
            {isCreateRequested && <ProfileSelectionModal 
                                        fetchData={fetchData} setIsCreateRequested={setIsCreateRequested} />}
        </div>
    );
}

export default CreateInterviewCard;
