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
    inputName,
    formGroupClass,
}) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => {
        if (!inputValue) {
            setFocused(false);
        }
    };

    return (
        <div
            className={`custom-text-field ${
                error ? "error" : ""
            } ${formGroupClass}`}
        >
            <label
                className={`${
                    focused || !!inputValue
                        ? "focused dark:bg-primary-dark text-brand-color"
                        : "text-primary-dark dark:text-ternary-light"
                }   pl-4`}
                htmlFor={labelFor}
            >
                {label}
                {isRequired && focused && (
                    <span className="text-brand-color text-base">*</span>
                )}
            </label>
            <input
                type={inputType}
                id={inputId}
                name={inputName}
                value={inputValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={focused ? placeholder : ""}
                className={`${className} bg-transparent pl-4 text-primary-dark dark:text-primary-light`}
                aria-label={ariaLabelName}
                onChange={onChange}
            />
            {helperText && (
                <span className="helper-text text-red-500">{helperText}</span>
            )}
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
