/* eslint-disable react/prop-types */
// import React from 'react'

function Button({ children, className, onClick, ...props }) {
    return (
        <button
            className={` ${className} text-center text-sm transition ease-out hover:shadow-md `}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
