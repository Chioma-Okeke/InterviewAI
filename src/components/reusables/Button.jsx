/* eslint-disable react/prop-types */
// import React from 'react'

function Button({ children, className, onClick, disable, ...props }) {
    return (
        <button
            className={` ${className} transition ease-out hover:shadow-md `}
            onClick={onClick}
            {...props}
            disabled={disable}
        >
            {children}
        </button>
    );
}

export default Button;
