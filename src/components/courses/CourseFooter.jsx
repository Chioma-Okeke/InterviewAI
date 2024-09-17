import Button from "../reusables/Button";
import PrevIcon from "../../assets/previous.svg";

function CourseFooter() {
    return (
        <div className="flex items-center justify-end">
            <div className="flex items-center gap-8">
                <Button className="flex gap-1">
                    <img
                        src={PrevIcon}
                        alt=""
                        className="text-primary-dark dark:text-ternary-light w-[18px]"
                    />
                    <span className="text-primary-dark dark:text-ternary-light text-sm">
                        Previous Lesson
                    </span>
                </Button>
                <Button className="bg-brand-color p-2 rounded-lg text-white text-sm leading-[22px] w-[114px]">
                    Next
                </Button>
            </div>
        </div>
    );
}

export default CourseFooter;
