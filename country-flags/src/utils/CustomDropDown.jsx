import React, { useState } from "react";
import PropTypes from "prop-types";
import useDarkMode from "../hooks/useDarkMode";
import LightDown from "../assets/logos/icons8-down-arrow-30.png";
import DarkDown from "../assets/logos/icons8-down-arrow-30 (1).png";

export default function CustomDropdown({
  options,
  selectedOption,
  onSelectOption,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode] = useDarkMode();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onSelectOption(option);
    toggleDropdown();
  };

  return (
    <div className="relative max-w-[190px] md:w-[190px] mb-5">
      <div
        className={`h-12 flex justify-between items-center text-sm rounded-md px-3 w-full shadow ${
          darkMode ? "bg-DarkBlue text-VeryLightGray" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption || "Filter by Region"}
        <img
          src={darkMode ? LightDown : DarkDown}
          alt="Down arrow"
          className="h-3 ml-2"
        />
      </div>
      {isOpen && (
        <div
          className={`absolute w-full top-14 left-0 z-10 py-4 rounded-md shadow-md ${
            darkMode ? "bg-DarkBlue text-VeryLightGray" : "bg-white"
          }`}
        >
          {options.map((option) => (
            <div
              key={option}
              className="px-4 mb-1 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CustomDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string,
  onSelectOption: PropTypes.func.isRequired,
};
