import { Link } from "react-router-dom";
import Image from "../assets/404Icon.svg";
import Button from "../components/reusables/Button";

function NotFoundPage() {
    return (
        <main className="relative lg:min-h-screen text-primary-dark dark:text-primary-light flex lg:items-center justify-center mb-10">
            <div className="max-w-[382px] flex flex-col gap-10 mt-[67px]">
                <div className="px-[20.5px]">
                    <img src={Image} alt="" />
                </div>
                <div className="flex flex-col gap-4 text-center">
                    <h2 className="text-primary-dark dark:text-primary-light text-[23px] ">
                        Hang Tight, We’re Working on It!
                    </h2>
                    <p className="text-sm text-primary-dark dark:text-[#C5C6CB]">
                        Looks like this conversation ended early. Let’s get you
                        back on track! Kindly{" "}
                        <span className="text-brand-color">
                            Contact Support
                        </span>{" "}
                        if you need help.
                    </p>
                </div>
                <Link to={"/user/dashboard"} className="w-fit mx-auto">
                    <Button className="text-white bg-brand-color w-[182px] py-3 px-6 rounded-lg">
                        Got to Homepage
                    </Button>
                </Link>
            </div>
        </main>
    );
}

export default NotFoundPage;
