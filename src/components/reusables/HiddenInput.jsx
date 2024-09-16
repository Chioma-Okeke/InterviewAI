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
    formGroupClass
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
        <div className={`custom-text-field ${error ? "error" : ""} ${formGroupClass}`}>
            <label
                className={`${focused || !!inputValue ? "focused" : ""}`}
                htmlFor={labelFor}
            >
                {label}
                {isRequired && (
                    <span className="text-red-600 text-base">*</span>
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
                className={`${className} ${!showPassword ? "tracking-widest text-lg" : ""}`}
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
            <span className="helper-text">{helperText}</span>
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
