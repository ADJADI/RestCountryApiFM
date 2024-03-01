import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers/FlagsReducer";
import useCountries from "./hooks/useCountries";
import CountryList from "./components/CountryList";
import RegionFilter from "./components/RegionFilter";
import SearchInput from "./components/SearchInput";
import Navbar from "./common/Navbar";

const store = createStore(rootReducer);

const App = ({ countries, regions }) => {
  const LazyCountryList = lazy(() => import("./components/CountryList"));
  // Fetch countries hook (if needed)
  useCountries();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  // Filter countries based on search term and selected region
  const filteredCountries = countries.filter(
    (country) =>
      typeof country.name.common === "string" &&
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

  return (
    <div className="">
      <Navbar />
      <h1 className="">Country Explorer</h1>
      <SearchInput
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <RegionFilter
        regions={regions}
        selectedRegion={selectedRegion}
        onSelectRegion={handleRegionChange}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyCountryList countries={filteredCountries} />
      </Suspense>
    </div>
  );
};

App.propTypes = {
  countries: PropTypes.array.isRequired,
  regions: PropTypes.array.isRequired, // Ensure regions is marked as required
};

const mapStateToProps = (state) => ({
  countries: state.countries,
  regions: state.regions,
});

export default connect(mapStateToProps)(App);
