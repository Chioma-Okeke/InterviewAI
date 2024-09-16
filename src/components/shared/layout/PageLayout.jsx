import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

import SideBar from "../navBar/SideBar";
import AppHeader from "../AppHeader";
import { useState } from "react";
import { useSelector } from "react-redux";

function PageLayout({ children }) {
    const [showSideBar, setShowSideBar] = useState(false);
    const isSideBarVisible = useSelector((state) => state.nav.showNavBar);

    const sidebarWidth = window.innerWidth > 1280 ? "261px" : "";
    return (
        <main className="relative min-h-screen dark:bg-primary-dark bg-secondary-light">
            <AnimatePresence>
                {isSideBarVisible && (
                    <motion.div
                        key="sidebar"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.4 }}
                        className="fixed left-0 top-0 min-h-screen w-[309px] lg:w-[261px] dark:bg-secondary-dark bg-secondary-light z-30"
                    >
                        <SideBar />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.section
                initial={{ paddingLeft: 0 }}
                animate={{
                    paddingLeft: isSideBarVisible ? sidebarWidth : 0,
                }}
                transition={{ duration: 0.4 }}
                className="flex-1"
            >
                <div className=" flex flex-col dark:bg-primary-dark bg-secondary-light">
                    <AppHeader />
                    {children}
                </div>
            </motion.section>
        </main>
    );
}

PageLayout.propTypes = {
    children: PropTypes.node,
    showSideBar: PropTypes.bool,
    toggleSideBar: PropTypes.func,
};

export default PageLayout;
