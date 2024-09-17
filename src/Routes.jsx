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
import PageLayout from "./components/shared/layout/PageLayout";
import CoursesContainer from "./components/shared/layout/CoursesContainer";
import NotFoundPage from "./pages/NotFoundPage";
import StagesLayout from "./components/shared/layout/StagesLayout";
import CoreStage from "./pages/learningPages/CoreStage";
import PreparationStage from "./pages/learningPages/PreparationStage";
import ApplicationStage from "./pages/learningPages/ApplicationStage";
import InterviewStage from "./pages/learningPages/InterviewStage";

export function PageRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="learning" element={<Learning />} />
                    <Route path="practice" element={<Practice />} />
                    <Route path="stages" element={<StagesLayout />}>
                        <Route index element={<Stages />} />
                        <Route
                            path="corestage"
                            element={<CoreStage />}
                        />
                        <Route
                            path="preparationstage"
                            element={<PreparationStage />}
                        />
                        <Route
                            path="applicationstage"
                            element={<ApplicationStage />}
                        />
                        <Route
                            path="interviewstage"
                            element={<InterviewStage />}
                        />
                    </Route>
                </Route>
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verifyemail" element={<VerifyEmail />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}
