import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = () => {

  const handleChange = (selectedOption: any) => {
    console.log(selectedOption)
  }

  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={handleChange}
    />
  )
}

export default LanguagesDropdown;
