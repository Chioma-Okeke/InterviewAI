import { useContext } from "react";
import Button from "../reusables/Button";
import GoogleIcon from "../../assets/google.svg";
import FacebookIcon from "../../assets/facebook.svg";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
import { UserAuthentication } from "../../services/AuthServices";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function ThirdPartyAuthForm() {
    const { login } = useContext(AuthContext);
    const [theme, setTheme] = useThemeSwitcher();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/user/dashboard";

    async function handleClick(thirdParty) {
        const authServices = new UserAuthentication();
        try {
            let response;

            switch (thirdParty) {
                case "google":
                    response = await authServices.googleSignIn();
                    break;

                case "facebook":
                    response = await authServices.googleSignIn();
                    break;

                case "apple":
                    response = await authServices.googleSignIn();
                    break;

                default:
                    throw new Error("Unsupported third-party provider");
            }

            if (response.success === true) {
                toast.success("You have successfully logged in.");
                login(
                    response.data.tokens.accessToken,
                    response.data.tokens.refreshToken,
                    response.data.user._id
                );
                // if (res.data.user.newUser) {
                //     navigate("/auth/onboarding");
                // } else {
                navigate(from, { replace: true });
                // }
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Error when authenticating user"
            );
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <Button
                onClick={() => handleClick("google")}
                className=" flex gap-[18px] items-center w-full text-[#3B3B3B] dark:text-primary-light py-[18px] px-5 rounded-[15px] border border-[#C5C6CB] dark:border-ternary-light text-left h-[60px]"
            >
                <img src={GoogleIcon} alt="" />
                <span>Continue with Google</span>
            </Button>
            <Button
                onClick={() => handleClick("facebook")}
                className="flex gap-[18px] items-center w-full text-[#3B3B3B] dark:text-primary-light py-[18px] px-5 rounded-[15px] border border-[#C5C6CB] dark:border-ternary-light text-left h-[60px]"
            >
                <img src={FacebookIcon} alt="" />
                <span>Continue with Facebook</span>
            </Button>
            <Button
                onClick={() => handleClick("apple")}
                className="flex gap-[18px] items-center w-full text-[#3B3B3B] dark:text-primary-light py-[18px] px-5 rounded-[15px] border border-[#C5C6CB] dark:border-ternary-light text-left h-[60px]"
            >
                <svg
                    width="22"
                    height="28"
                    viewBox="0 0 22 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_141_557)">
                        <path
                            d="M21.3108 9.70401C19.5084 10.8178 18.3952 12.7272 18.3952 14.8487C18.3952 17.2353 19.8265 19.4099 22 20.3115C21.5759 21.6905 20.9398 22.9634 20.1446 24.1302C18.9783 25.7744 17.759 27.4716 15.9566 27.4716C14.1542 27.4716 13.6241 26.4109 11.5036 26.4109C9.43614 26.4109 8.69398 27.5246 6.99759 27.5246C5.3012 27.5246 4.13494 25.9866 2.80964 24.0772C1.06024 21.4253 0.0530121 18.3491 0 15.1138C0 9.86312 3.39277 7.05213 6.78554 7.05213C8.58795 7.05213 10.0723 8.21895 11.1855 8.21895C12.2458 8.21895 13.9422 6.99909 15.9566 6.99909C18.0771 6.94605 20.0916 7.95377 21.3108 9.70401ZM15.0024 4.77151C15.9036 3.71076 16.3807 2.38482 16.4337 1.00584C16.4337 0.846727 16.4337 0.634577 16.3807 0.475464C14.8434 0.634577 13.412 1.3771 12.4048 2.54393C11.5036 3.55165 10.9735 4.82455 10.9205 6.20353C10.9205 6.36264 10.9205 6.52175 10.9735 6.68086C11.0795 6.68086 11.2386 6.7339 11.3446 6.7339C12.7759 6.62783 14.1012 5.8853 15.0024 4.77151Z"
                            fill={theme === "dark" ? "white" : "black"}
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_141_557">
                            <rect
                                width="22"
                                height="27.0492"
                                fill="white"
                                transform="translate(0 0.475464)"
                            />
                        </clipPath>
                    </defs>
                </svg>
                <span>Continue with Apple</span>
            </Button>
        </div>
    );
}

export default ThirdPartyAuthForm;
