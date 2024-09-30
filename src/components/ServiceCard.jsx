import PropTypes from "prop-types";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function ServiceCard({ Icon, title, description, link }) {
    const navigate = useNavigate();

    function handleRedirects() {
        navigate(link);
    }

    return (
        <div
            onClick={handleRedirects}
            className="sm:w-[398px] rounded-3xl border-2 border-[#E5E5E5] dark:border-ternary-dark hover:bg-[#F4F4F4] dark:hover:bg-hover-dark flex flex-col justify-between pb-6 cursor-pointer"
        >
            <div className="pb-2 px-6 pt-6 flex items-center gap-2 border-b border-[#E5E5E5] dark:border-[#505050]">
                <img src={Icon} alt="" />
                <p className="text-[#0D0D0D] dark:text-primary-light">
                    {title}
                </p>
            </div>
            <div className="p-6">
                <p className="text-ternary-light">
                    {description}
                </p>
            </div>
            <div
                className="dark:bg-[#444549] bg-[#444549] rounded-full p-1 ml-auto mr-7 w-fit hover:scale-105"
                onClick={handleRedirects}
            >
                <HiOutlineArrowRight
                    size={24}
                    className="text-primary-light"
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
    link: PropTypes.string,
};

export default ServiceCard;
