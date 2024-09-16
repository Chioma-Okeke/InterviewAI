import React from "react";
import PropTypes from "prop-types";

function CareerInterestCard({ title }) {
    return (
        <div className="py-6 px-3 dark:bg-ternary-dark">
            <p className="text-primary-dark dark:text-primary-light text-center text-xs">{title}</p>
        </div>
    );
}

CareerInterestCard.propTypes = {
    title: PropTypes.string,
};

export default CareerInterestCard;
