/* eslint-disable react/prop-types */
import React from "react";

const Input = React.forwardRef(function Input(
    {
        isRequired,
        inputValue,
        onMouseEnter,
        onBlur,
        onFocus,
        onMouseLeave,
        inputLabel,
        labelFor,
        inputType = "text",
        inputId,
        inputName,
        placeholderText,
        ariaLabelName,
        onChange,
        className,
        inputGroupClassNames,
        showPasswordRequirement,
        labelClasses,
    },
    ref
) {
    return (
        <div className={inputGroupClassNames}>
            {inputLabel && (
                <div className="flex items-start">
                    <label
                        className={`block text-primary-dark dark:text-primary-light text-[18px] leading-[22.5px] ${labelClasses}`}
                        htmlFor={labelFor}
                    >
                        {inputLabel}
                    </label>
                    {isRequired && (
                        <span className="text-red-600 text-sm ml-1"> *</span>
                    )}
                </div>
            )}
            <input
                onMouseEnter={onMouseEnter}
                className={`${className} rounded-[6px]`}
                ref={ref}
                type={inputType}
                id={inputId}
                value={inputValue}
                name={inputName}
                placeholder={placeholderText}
                aria-label={ariaLabelName}
                onChange={onChange}
                onMouseLeave={onMouseLeave}
                onBlur={onBlur}
                onFocus={onFocus}
                required
            />
            {inputType === "password" && showPasswordRequirement && (
                <p className="text-sm text-[#667185] mt-2">
                    minimum 8 characters and special character
                </p>
            )}
        </div>
    );
});

export default Input;
