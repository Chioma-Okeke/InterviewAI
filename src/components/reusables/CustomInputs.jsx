import React, { useState } from "react";
import PropTypes from "prop-types";
// import './CustomTextField.css';

const CustomTextField = ({
    label,
    placeholder,
    helperText,
    error,
    className,
    inputValue,
    inputType,
    isRequired,
    onChange,
    inputId,
    ariaLabelName,
    labelFor,
    inputName
}) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => {
        if (!inputValue) {
            setFocused(false);
        }
    };

    return (
        <div className={`custom-text-field ${error ? "error" : ""}`}>
            <label className={`${focused || !!inputValue ? "focused" : ""}`} htmlFor={labelFor}>
                {label}
                {isRequired && <span className="text-red-600 text-base">*</span>}
            </label>
            <input
                type={inputType}
                id={inputId}
                name={inputName}
                value={inputValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={focused ? placeholder : ""}
                className={className}
                aria-label={ariaLabelName}
                onChange={onChange}
            />
            {/* <span className="helper-text">{helperText}</span> */}
        </div>
    );
};

CustomTextField.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.bool,
};

export default CustomTextField;
