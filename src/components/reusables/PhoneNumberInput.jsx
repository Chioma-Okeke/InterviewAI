import { useState } from "react";
import FormInput from "./FormInput";

const countryData = [
    { name: "United States", code: "+1", format: "(XXX) XXX-XXXX", shorthand: "US" },
    { name: "United Kingdom", code: "+44", format: "XXXX XXX XXXX", shorthand: "UK" },
    { name: "Nigeria", code: "+234", format: "XXXX XXX XXXX", shorthand: "NG" },
    { name: "India", code: "+91", format: "XXXXX-XXXXX", shorthand: "IN" },
];

function PhoneNumberInput() {

    const [selectedCountry, setSelectedCountry] = useState(countryData[0])
    const [phoneNumber, setPhoneNumber] = useState("")

    function handleCountryChange (e) {
        const selected = countryData.find((country) => country.name === e.target.value)
        setSelectedCountry(selected)
        setPhoneNumber("")
    }

    function handleChange (e) {
        const input = e.target.value
        const formattedInput = input.replace(/\D/g, "")
        const formattedPhoneNumber = formatPhoneNumber(formattedInput, selectedCountry.format)

        setPhoneNumber(formattedPhoneNumber)
    }

    function formatPhoneNumber (input, format) {
        let i = 0
        return format.replace(/X/g, () => input[i++] || "")
    }

    return (
        <div className={"flex items-center w-full border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5 divide-x-2"}>
            <select name="countries" id="country" className="w-1/4 focus:outline-none" onChange={handleCountryChange}>
                {/* <option selected value="null" >Choose country</option> */}
                {countryData.map((country) => {
                    return (
                        <option key={country.code} value={country.name}>
                            {country.shorthand} - ({country.code})
                        </option>
                    );
                })}
            </select>
            <FormInput
                inputType="text"
                inputId="phone"
                inputName="phone"
                placeholderText="Enter your phone number"
                ariaLabelName="Phone"
                inputValue={phoneNumber}
                onChange={handleChange}
                // isRequired={true}
                inputGroupClassNames="w-3/4"
                className="w-full p-4 focus:outline-none"
            />
        </div>
    );
}

export default PhoneNumberInput;
