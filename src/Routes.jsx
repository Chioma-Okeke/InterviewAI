// import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChangePassword from "./pages/authPages/ChangePassword";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import LogIn from "./pages/authPages/Login";
import SignUp from "./pages/authPages/SignUp";
import VerifyEmail from "./pages/authPages/VerifyEmail";
import Learning from "./pages/learningPages/Learning";
import Stages from "./pages/learningPages/Stages";
import Practice from "./pages/practice-pages/Practice";
import CoursePage from "./pages/learningPages/CoursePage";

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
                <Route exact path="/verifyemail" element={<VerifyEmail />} />
                <Route exact path="/learning" element={<Learning />} />
                <Route exact path="/practice" element={<Practice />} />
                <Route exact path="/stages" element={<Stages />}>
                    <Route exact path="interestId" element={<Stages />} >
                        <Route path="stageName" element={<CoursePage/>}/>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}
