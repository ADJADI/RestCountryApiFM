import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import useCountries from "./hooks/useCountries";
import CountryList from "./components/CountryList";
import RegionFilter from "./components/RegionFilter";
import SearchInput from "./components/SearchInput";
import Navbar from "./common/Navbar";
import MainStyle from "./styles/index.css";
import CountryDetailPage from "./components/CountryDetailPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import iconBackLight from "./assets/logos/icons8-back-arrow-48 (1).png";
import iconBackDark from "./assets/logos/icons8-back-arrow-48.png";
import DarkModeContainer from "./utils/DarkModeContainer";
import useDarkMode from "./hooks/useDarkMode";

const App = ({ countries, regions }) => {
  const [darkMode] = useDarkMode();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useCountries();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Filter countries based on search term and selected region
  const filteredCountries = countries.filter(
    (country) =>
      typeof country.name.common === "string" &&
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion === "" ||
        country.region === selectedRegion ||
        selectedRegion === "All Regions")
  );

  return (
    <div className="">
      <Navbar />
      <div className={`min-h-screen ${darkMode ? "bg-VeryDarkBlue" : ""}`}>
        {!isMenuOpen ? (
          <div className="py-5 flex flex-col gap-10 justify-between px-6 md:px-12 md:py-10 md:gap-0 md:flex-row">
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
            <RegionFilter
              regions={regions}
              selectedRegion={selectedRegion}
              onSelectRegion={handleRegionChange}
            />
          </div>
        ) : (
          <button
            className={`shadow-lg drop-shadow-2xl text-VeryLightGray mx-5 mt-10 h-8 w-28 rounded-sm md:mx-10 md:mt-20 ${
              darkMode ? "bg-DarkBlue " : "text-black"
            }`}
            onClick={handleGoBack}
          >
            <a href="/">
              <div className="flex items-center gap-2 w-full justify-center">
                <img
                  src={darkMode ? iconBackLight : iconBackDark}
                  alt=""
                  className="h-5"
                />
                <span className="">Back</span>
              </div>
            </a>
          </button>
        )}
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <CountryList
                  countries={filteredCountries}
                  isMenuOpen={isMenuOpen}
                  toggleMenu={toggleMenu}
                />
              }
            />
            <Route
              path="/country/:countryCode/"
              element={
                <CountryDetailPage
                  navigate={navigate}
                  isMenuOpen={isMenuOpen}
                  countries={countries}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  countries: PropTypes.array.isRequired,
  regions: PropTypes.array.isRequired, // Ensure regions is marked as required
};

const mapStateToProps = (state) => ({
  countries: state.flags.countries,
  regions: state.flags.regions,
});

export default connect(mapStateToProps)(App);
