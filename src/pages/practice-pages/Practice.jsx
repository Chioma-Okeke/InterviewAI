import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Practice() {

    return (
        <main className="text-primary-dark dark:text-primary-light">
            <div>
                <Outlet />
            </div>
            <ToastContainer />
        </main>
    );
}

export default Practice;
