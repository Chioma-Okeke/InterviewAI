import imgSrc from "../../assets/image.png"
import Button from "../reusables/Button";

function CreateInterviewCard() {
    return (
        <div className="w-[650px] flex flex-col gap-8 pb-14 bg-hover-dark rounded-3xl mx-auto">
            <div
                className={`w-full h-[439px] bg-cover bg-center `}
                style={{
                    backgroundImage: `url(${imgSrc})`,
                }}
            ></div>
            <div className="flex items-center justify-between px-6">
                <p className="text-sm leading-[22px] w-[464px]">
                    Start practicing interviews to get ready for your future
                    opportunities{" "}
                </p>
                <Button className="bg-brand-color text-white rounded-lg p-2 text-sm">
                    Create Interview
                </Button>
            </div>
        </div>
    );
}

export default CreateInterviewCard;
