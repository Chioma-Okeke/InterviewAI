import { useDispatch } from "react-redux";
import DummyImage from "../../../assets/image.png";
import PrevIcon from "../../../assets/previous.svg"
import Button from "../../reusables/Button";
import PropTypes from "prop-types";
import { decrementPartNumber, incrementPartNumber } from "../../../store/partNumberSlice";

function Module({content, imageContent}) {
    const dispatch  = useDispatch()

    function previousModule () {
        dispatch(decrementPartNumber())
    }
    
    function nextModule() {
        dispatch(incrementPartNumber())
    }

    return (
        <div>
            <div className="flex flex-col gap-4 ">
                {imageContent && imageContent.value && <img src={imageContent.value} alt="" />}
                <p className="text-primary-dark dark:text-primary-light text-sm text-justify lg:h-[220px] overflow-auto">
                {content && content.value && <p>{content.value}</p>}
                </p>
            </div>
            <div className="flex items-center justify-end">
                <div className="flex items-center gap-8">
                    <Button onClick={previousModule} className="flex gap-1">
                        <img
                            src={PrevIcon}
                            alt=""
                            className="text-primary-dark dark:text-ternary-light w-[18px]"
                        />
                        <span className="text-primary-dark dark:text-ternary-light text-sm">
                            Previous Lesson
                        </span>
                    </Button>
                    <Button onClick={nextModule} className="bg-brand-color p-2 rounded-lg text-white text-sm leading-[22px] w-[114px]">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

Module.propTypes = {
    content: PropTypes.object,
    imageContent: PropTypes.object,
}

export default Module;
