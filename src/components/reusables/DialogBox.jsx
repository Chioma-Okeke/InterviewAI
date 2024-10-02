// import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { Player } from "@lottiefiles/react-lottie-player";

import Button from "../reusables/Button";
import { CircularProgress } from "@mui/material";
// import { ModalContext } from "../../context/ModalContext";

function DialogBox({
    message,
    subHeading,
    okText,
    cancelText,
    isDeleteInProgress,
    close,
    handleSubmission,
    okTextClassName,
    imgSrc
}) {

    return (
        <div>
            <AnimatePresence>
                <div className="">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className=" fixed inset-0 z-[80] transition-all duration-500"
                    >
                        {/* Modal Backdrop */}
                        <div
                            className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-30"
                            onClick={close}
                        ></div>

                        {/* Modal Content */}
                        <main className="flex flex-col items-center justify-center h-full w-full relative">
                            <div className="modal-wrapper flex items-center z-30 relative xl:w-[70%] justify-center">
                                <div className="w-[90%] lg:w-[469px] rounded-[20px] text-primary-dark dark:text-primary-light bg-secondary-light dark:bg-primary-dark shadow-lg relative p-4 md:p-8">
                                    {imgSrc && <img src={imgSrc} alt="" className="mx-auto mb-12" />}
                                    {isDeleteInProgress ? (
                                        <CircularProgress/>
                                    ) : (
                                        <div className="flex flex-col justify-center">
                                            {subHeading &&<div className="w-full">
                                                <p className="text-center text-lg mb-4">
                                                    {subHeading}
                                                </p>
                                            </div>}
                                            {message && <div className="w-full">
                                                <p className="text-center text-sm lg:tex-base mb-8 ">
                                                    {message}
                                                </p>
                                            </div>}
                                            <div className="w-fit flex flex-col md:flex-row items-center justify-between gap-6  mx-auto ">
                                                {cancelText && <Button
                                                    onClick={close}
                                                    className="rounded-lg  md:w-[143px] bg-brand-color border border-brand-color p-2 text-sm lg:text-base text-white transition ease-in-out hover:bg-transparent duration-500"
                                                >
                                                    {cancelText}
                                                </Button>}
                                                {okText && <Button
                                                    onClick={handleSubmission}
                                                    className={`rounded-lg border md:min-w-[143px] border-brand-color p-2 text-white text-sm lg:text-base transition ease-in-out hover:bg-brand-color duration-500 ${okTextClassName}`}
                                                >
                                                    {okText}
                                                </Button>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    );
}

DialogBox.propTypes = {
    isDeleteInProgress: PropTypes.bool,
    message: PropTypes.string,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    close: PropTypes.func,
    handleSubmission: PropTypes.func

};

export default DialogBox;
