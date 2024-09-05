/* eslint-disable react/prop-types */
import React from "react";

const FormInput = React.forwardRef(function FormInput(
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
        labelClasses,
    },
    ref
) {
    return (
        <div className={inputGroupClassNames}>
            {inputLabel && (
                <div className="flex items-start mb-1">
                    <label
                        className={`block text-[#101928] font-medium ${labelClasses}`}
                        htmlFor={labelFor}
                    >
                        {inputLabel}
                    </label>
                    {isRequired && <span className="text-red-600 text-base">*</span>}
                </div>
            )}
            <input
                onMouseEnter={onMouseEnter}
                className={className}
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
        </div>
    );
});

export default FormInput;
