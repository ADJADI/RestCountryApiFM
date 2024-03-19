import React from "react";
import PropTypes from "prop-types";
import DarkMagnifying from "../assets/logos/icons8-search-48 (1).png";
import LightMagnifying from "../assets/logos/icons8-search-48.png";
import useDarkMode from "../hooks/useDarkMode";

const SearchInput = ({ searchTerm, onSearchChange }) => {
  const [darkMode] = useDarkMode();
  return (
    <div
      className={`flex gap-5 h-12 items-center w-full md:w-[380px] rounded-md shadow-lg ${
        darkMode ? "bg-DarkBlue" : ""
      }`}
    >
      <button className="">
        {darkMode ? (
          <img
            src={LightMagnifying}
            alt="magnifying_glass_logo"
            className="h-4 w-4 opacity-50 ml-7"
          />
        ) : (
          <img
            src={DarkMagnifying}
            alt="magnifying_glass_logo"
            className="h-4 w-4 opacity-50 ml-7"
          />
        )}
      </button>
      <input
        className={`w-full h-full rounded-tr-md rounded-br-md text-xs focus:outline-none ${
          darkMode ? "bg-DarkBlue text-VeryLightGray" : ""
        }`}
        type="text"
        value={searchTerm}
        placeholder="Search for a country..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchInput;
