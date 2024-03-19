import React from "react";
import PropTypes from "prop-types";
import CustomDropDown from "../utils/CustomDropDown";

const RegionFilter = ({ regions, selectedRegion, onSelectRegion }) => {
  return (
    <CustomDropDown
      options={["", ...regions]}
      selectedOption={selectedRegion}
      onSelectOption={onSelectRegion}
    />
  );
};

RegionFilter.propTypes = {
  regions: PropTypes.array.isRequired,
  selectedRegion: PropTypes.string.isRequired,
  onSelectRegion: PropTypes.func.isRequired,
};

export default RegionFilter;
