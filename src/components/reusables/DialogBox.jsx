// import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { Player } from "@lottiefiles/react-lottie-player";

import Button from "../reusables/Button";
import { CircularProgress } from "@mui/material";
// import { ModalContext } from "../../context/ModalContext";

function DialogBox({
    message,
    okText,
    cancelText,
    isDeleteInProgress,
    close,
    handleSubmission,
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
                            // onClick={handleDeleteListingsToggle}
                        ></div>

                        {/* Modal Content */}
                        <main className="flex flex-col items-center justify-center h-full w-full relative">
                            <div className="modal-wrapper flex items-center z-30 relative xl:w-[70%] justify-center">
                                <div className="max-w-md mx-5 md:w-[55%] xl:max-w-3xl lg:max-w-xl md:max-w-xl rounded-xl text-primary-dark dark:text-primary-light bg-secondary-light dark:bg-primary-dark shadow-lg relative pb-5">
                                    <div className="py-1 px-2 w-full ">
                                        <h1 className="font-semibold text-xl text-center flex-1">
                                            Delete in progress
                                        </h1>
                                    </div>
                                    <hr />
                                    {isDeleteInProgress ? (
                                        <CircularProgress/>
                                    ) : (
                                        <div>
                                            <div className="w-full">
                                                <p className="text-center p-3 sm:text-lg mb-2 md:my-4">
                                                    {message}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-center gap-10">
                                                <Button
                                                    onClick={close}
                                                    className="rounded-lg border border-brand-color py-2 px-3 text-white text-sm lg:text-base transition ease-in-out hover:bg-brand-color duration-500"
                                                >
                                                    {cancelText}
                                                </Button>
                                                <Button
                                                    onClick={handleSubmission}
                                                    className="rounded-lg bg-brand-color border border-brand-color py-2 px-3 text-sm lg:text-base text-white transition ease-in-out hover:bg-transparent duration-500"
                                                >
                                                    {okText}
                                                </Button>
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
