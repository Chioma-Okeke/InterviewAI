import { Outlet } from "react-router-dom";

function Practice() {

    return (
        <main className="text-primary-dark dark:text-primary-light">
            <div>
                <Outlet />
            </div>
        </main>
    );
}

export default Practice;
