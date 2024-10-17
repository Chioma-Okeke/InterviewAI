import { useEffect } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//layouts
import PageLayout from "./components/shared/layout/PageLayout";
import Container from "./components/shared/layout/Container";
import RootLayout from "./components/shared/layout/RootLayout";
import StagesLayout from "./components/shared/layout/StagesLayout";

//pages
import Home from "./pages/Home";
import Practice from "./pages/practice-pages/Practice";
import Stages from "./pages/learningPages/Stages";
import CoreStage from "./pages/learningPages/CoreStage";
import PreparationStage from "./pages/learningPages/PreparationStage";
import ApplicationStage from "./pages/learningPages/ApplicationStage";
import InterviewStage from "./pages/learningPages/InterviewStage";
import ChangePassword from "./pages/authPages/ChangePassword";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import LogIn from "./pages/authPages/Login";
import SignUp from "./pages/authPages/SignUp";
import VerifyEmail from "./pages/authPages/VerifyEmail";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/LandingPage";
import IndividualStagePage from "./pages/learningPages/IndividualStagePage";
import ErrorPage from "./components/shared/layout/ErrorPage";
import OnBoarding from "./pages/OnBoarding";
import ScrollToTop from "./components/shared/ScrollToTop";
import MyLearning from "./pages/MyLearning";
import CoursesContainer from "./components/shared/layout/CoursesContainer";
import UserProfile from "./pages/UserProfile";
import MobModule from "./components/courses/courseSections/MobModule";
import InterviewMethod from "./components/practice/InterviewMethod";
import InterviewLayout from "./components/shared/layout/InterviewLayout";
import TextInterview from "./components/interview/TextInterview";
import AudioInterview from "./components/interview/AudioInterview";
import VideoInterview from "./components/interview/VideoInterview";
import First from "./components/practice/First";
import ProtectedRoute from "./components/ProtectedRoute";
import DescriptionModal from "./components/modals/DescriptionModal";
import Results from "./components/interview/Results";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/"
                element={<RootLayout />}
                errorElement={<ErrorPage />}
            >
                <Route index element={<LandingPage />} />
                <Route path="user" element={<PageLayout />}>
                    <Route path="dashboard" element={<Home />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="practice" element={<Practice />}>
                            <Route index element={<First />} />
                            <Route
                                path="descriptionselection"
                                element={<DescriptionModal />}
                            />
                            <Route
                                path="interviewmethods"
                                element={<InterviewMethod />}
                            />
                            <Route
                                path="interviewdemo"
                                element={<InterviewLayout />}
                            >
                                <Route
                                    path="text"
                                    element={<TextInterview />}
                                />
                                <Route
                                    path="audio"
                                    element={<AudioInterview />}
                                />
                                <Route
                                    path="video"
                                    element={<VideoInterview />}
                                />
                            </Route>
                            <Route path="results" element={<Results/>}/>
                        </Route>
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path="mylearning" element={<MyLearning />} />
                    </Route>
                    <Route path="learning" element={<StagesLayout />}>
                        {/* <Route index element={<Learning />} /> */}
                        <Route path="stages" element={<StagesLayout />}>
                            <Route index element={<Stages />} />
                            <Route
                                path=":stagemodule"
                                element={<IndividualStagePage />}
                            >
                                <Route
                                    path=":module"
                                    element={<CoursesContainer />}
                                />
                                {/* <Route
                                        path=":mobmodule"
                                        element={<MobModule />}
                                    />
                                </Route> */}
                            </Route>
                        </Route>
                    </Route>
                    <Route path="profile" element={<UserProfile />} />
                </Route>
                <Route path="auth" element={<Container />}>
                    <Route index element={<SignUp />} />
                    <Route path="changepassword" element={<ChangePassword />} />
                    <Route path="forgotpassword" element={<ForgotPassword />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="verifyemail" element={<VerifyEmail />} />
                    <Route path="onboarding" element={<OnBoarding />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Route>
    )
);

function App() {
    const [theme, setTheme] = useThemeSwitcher();

    useEffect(() => {
        // const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="dark:bg-primary-dark bg-secondary-light">
            <AuthProvider>
                <div className="selection:bg-brand-color selection:text-white selection:font-medium ">
                    <RouterProvider router={router}>
                        <ScrollToTop />
                    </RouterProvider>
                </div>
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
}

export default App;
