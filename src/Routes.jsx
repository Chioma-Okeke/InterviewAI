// import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChangePassword from "./pages/authPages/ChangePassword";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import LogIn from "./pages/authPages/Login";
import SignUp from "./pages/authPages/SignUp";

export function PageRoutes() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                    exact
                    path="/changepassword"
                    element={<ChangePassword />}
                />
                <Route
                    exact
                    path="/forgotpassword"
                    element={<ForgotPassword />}
                />
                <Route exact path="/login" element={<LogIn />} />
                <Route exact path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}
