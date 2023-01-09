import React from "react";
import Select from "react-select";
import { customStyles } from "../../constants/customStyles";
import { languageOptions } from "../../constants/languageOptions";
import { useDispatch } from "react-redux"
import { setLanguage } from "../../redux/languageSlice";


const LanguagesDropdown = () => {

  const dispatch = useDispatch()

  const handleChange = (selectedOption: any) => {
    dispatch( setLanguage(selectedOption) )
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
