import React from "react";
import { MdArrowBack } from "react-icons/md";
import PropTypes from "prop-types";
import Button from "../../reusables/Button";
import PrevIcon from "../../../assets/previous.svg";
import { useDispatch } from "react-redux";
import { toggleModule } from "../../../store/moduleSlice";
import { AnimatePresence, motion } from "framer-motion";

function MobModule({ content, imageContent, headerContent }) {
    const dispatch = useDispatch();

    function backToModuleContent() {
        dispatch(toggleModule());
    }
    return (
        <AnimatePresence>
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.6 }}
                className="text-primary-dark dark:text-primary-light flex flex-col gap-6"
            >
                <header className="flex items-center p-4 bg-hover-dark">
                    <div onClick={backToModuleContent}>
                        <MdArrowBack size={24} />
                    </div>
                    <p className="flex-1 text-center">{headerContent.value}</p>
                </header>
                <div className="px-4">
                    <div className="flex flex-col gap-6 mb-10">
                        {imageContent && imageContent.value && (
                            <img src={imageContent.value} alt="" />
                        )}
                        <p className="text-primary-dark dark:text-primary-light text-sm text-justify lg:h-[220px] overflow-auto">
                            {content && content.value && <p>{content.value}</p>}
                        </p>
                    </div>
                    <div className="flex items-center justify-end">
                        <Button className="bg-brand-color p-2 rounded-lg text-white text-sm leading-[22px] w-[114px]">
                            Next Lesson
                        </Button>
                    </div>
                </div>
            </motion.main>
        </AnimatePresence>
    );
}

MobModule.propTypes = {
    content: PropTypes.object,
    imageContent: PropTypes.object,
    headerContent: PropTypes.object,
};

export default MobModule;
