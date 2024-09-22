/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

function Container({ children, className }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`max-w-[1560px] w-full mx-auto px-2 sm:px-5 ${className} dark:bg-primary-dark bg-secondary-light`}
        >
            <Outlet/>
        </motion.div>
    );
}

export default Container;
