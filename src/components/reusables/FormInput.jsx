import { useState } from "react";
import PropTypes from "prop-types";
// import './CustomTextField.css';

const FormInput = ({
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
                        ? "hidden"
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
                className={`${className} ${inputValue ? "bg-hover-dark" : "bg-transparent"}  pl-4 text-primary-dark dark:text-primary-light`}
                aria-label={ariaLabelName}
                onChange={onChange}
            />
            {/* <span className="helper-text">{helperText}</span> */}
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.bool,
};

export default FormInput;
