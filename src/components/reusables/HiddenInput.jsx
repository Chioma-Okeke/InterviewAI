/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const HiddenInput = React.forwardRef(function HiddenInput(
    {
        isRequired,
        inputValue,
        onMouseEnter,
        onBlur,
        onFocus,
        onMouseLeave,
        inputLabel,
        labelFor,
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
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={inputGroupClassNames}>
            {inputLabel && (
                <div className="flex items-start">
                    <label
                        className={`block text-[#101928] font-medium ${labelClasses}`}
                        htmlFor={labelFor}
                    >
                        {inputLabel}
                    </label>
                    {isRequired && (
                        <span className="text-red-600 text-sm">*</span>
                    )}
                </div>
            )}
            <div className={`flex items-center justify-between ${className}`}>
                <input
                    className="w-full p-2 focus:outline-none"
                    onMouseEnter={onMouseEnter}
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    id={inputId}
                    value={inputValue}
                    name={inputName}
                    placeholder={placeholderText}
                    aria-label={ariaLabelName}
                    onChange={onChange}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    required={isRequired}
                />
                <div>
                    {showPassword ? (
                        <IoIosEyeOff
                            size={25}
                            cursor={"pointer"}
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <IoIosEye
                            size={25}
                            cursor={"pointer"}
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                </div>
            </div>
            {showPasswordRequirement && (
                <p className="text-sm text-[#667185] mt-2">
                    minimum 8 characters and special character
                </p>
            )}
        </div>
    );
});

export default HiddenInput;
