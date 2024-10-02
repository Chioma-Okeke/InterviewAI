import { Link } from "react-router-dom";
import ConstructionIllustration from "../../assets/construction-concept-illustration.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../reusables/Button"
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect } from "react";

function Results() {

    useEffect(() => {
        window.scrollTo(0, {
            top: 0,
            behavior: "smooth"
        })
    }, [])

    return (
        <main className="relative lg:min-h-screen text-primary-dark dark:text-primary-light flex  justify-center mb-10">
            <div className="max-w-[382px] flex flex-col gap-10">
                <div className="px-[20.5px]">
                <LazyLoadImage
                    src={ConstructionIllustration}
                    alt="Listing Image"
                    effect="blur"
                    className="mx-auto w-full"
                    wrapperProps={{
                        style: {transitionDelay: "1s"},
                    }}
                />
                </div>
                <div className="flex flex-col gap-4 text-center">
                                    <h2 className="text-primary-dark dark:text-primary-light text-xl lg:text-[23px] ">
                                        Page is currently under construction
                                    </h2>
                                </div>
                <Link to={"/user/dashboard"} className="w-fit mx-auto">
                    <Button className="text-white bg-brand-color w-[182px] py-3 px-6 rounded-lg">
                        Go to Homepage
                    </Button>
                </Link>
            </div>
        </main>
    );
}

export default Results;
