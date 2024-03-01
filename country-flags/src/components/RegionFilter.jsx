import React from "react";
import PropTypes from "prop-types";

const RegionFilter = ({ regions, selectedRegion, onSelectRegion }) => {
  return (
    <div>
      <h2>Region Filter</h2>
      <select
        value={selectedRegion}
        onChange={(e) => onSelectRegion(e.target.value)}
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

RegionFilter.propTypes = {
  regions: PropTypes.array.isRequired,
  selectedRegion: PropTypes.string.isRequired,
  onSelectRegion: PropTypes.func.isRequired,
};

export default RegionFilter;
