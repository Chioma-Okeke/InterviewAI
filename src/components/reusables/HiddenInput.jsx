import React, { useState } from "react";
import PropTypes from "prop-types";
import { PiEyeClosed, PiEye } from "react-icons/pi";
// import './CustomTextField.css';

const HiddenInput = ({
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
    isPasswordField,
    formGroupClass,
}) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
                type={showPassword ? "text" : "password"}
                id={inputId}
                name={inputName}
                value={inputValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={focused ? placeholder : ""}
                className={`${className} ${
                    !showPassword ? "tracking-widest text-lg" : ""
                } bg-transparent pl-4 text-primary-dark dark:text-primary-light`}
                aria-label={ariaLabelName}
                onChange={onChange}
            />
            {isPasswordField && (
                <div className="absolute right-4 top-4">
                    {showPassword ? (
                        <PiEye
                            color="#C5C6CB"
                            size={20}
                            cursor={"pointer"}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPassword(false);
                            }}
                        />
                    ) : (
                        <PiEyeClosed
                            color="#C5C6CB"
                            size={20}
                            cursor={"pointer"}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPassword(true);
                            }}
                        />
                    )}
                </div>
            )}
            {helperText && <span className="helper-text text-red-500">{helperText}</span>}
        </div>
    );
};

HiddenInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.bool,
};

export default HiddenInput;
