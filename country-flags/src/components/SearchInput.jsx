import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <h2>Search Input</h2>
      <input
        type="text"
        value={searchTerm}
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
