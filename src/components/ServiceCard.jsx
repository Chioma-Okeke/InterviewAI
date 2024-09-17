import PropTypes from "prop-types";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function ServiceCard({ Icon, title, description, link }) {
    const navigate = useNavigate()

    function handleRedirects () {
        navigate(link)
    }

    return (
        <div className="sm:w-[398px] rounded-3xl border bg-primary-light dark:bg-ternary-dark dark:border-ternary-dark border-ternary-dark dark:hover:bg-hover-dark flex flex-col justify-between pb-6 cursor-pointer">
            <div className="pb-2 px-6 pt-6 flex items-center gap-2 border-b dark:border-[#505050] border-primary-dark">
                <img src={Icon} alt="" />
                <p className="text-primary-dark dark:text-primary-light">
                    {title}
                </p>
            </div>
            <div className="p-6">
                <p className="text-primary-dark dark:text-primary-light">
                    {description}
                </p>
            </div>
            <div
                className="dark:bg-[#444549] bg-[#ECECEC] rounded-full p-1 ml-auto mr-7 w-fit hover:scale-105"
                onClick={handleRedirects}
            >
                <HiOutlineArrowRight
                    size={24}
                    className="dark:text-primary-light text-primary-dark"
                />
            </div>
        </div>
    );
}

ServiceCard.propTypes = {
    Icon: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    onclick: PropTypes.func,
    link: PropTypes.string
};

export default ServiceCard;
