import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { formatPopulation } from "../utils/utils";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import useDarkMode from "../hooks/useDarkMode";
import useCountries from "../hooks/useCountries";

export default function CountryDetailPage({ isMenuOpen }) {
  const [darkMode] = useDarkMode();
  const { countryCode } = useParams();
  const nation = useCountries();
  const [countryData, setCountryData] = useState(null);

  countries.registerLocale(en);

  useEffect(() => {
    const selectedCountry = nation.find(
      (country) => country.name.common === countryCode
    );
    if (selectedCountry) {
      setCountryData(selectedCountry);
    }
  }, [countryCode, countryData]);

  if (!countryData) {
    return <div>Loading...</div>;
  }

  const languageKeys = Object.keys(countryData.name.nativeName);
  const currenciesKeys = Object.keys(countryData.currencies);

  const convertAlpha3ToFullName = (alpha3Codes) => {
    if (!alpha3Codes) return []; // Check if alpha3Codes is undefined
    return alpha3Codes.map((alpha3) => {
      return countries.getName(alpha3, "en");
    });
  };
  const borderNames = convertAlpha3ToFullName(countryData.borders) || [];

  const renderBorderCountries = () => {
    if (borderNames.length === 0) {
      return (
        <span
          className={`shadow-md px-8 py-3 rounded-md ${
            darkMode ? "bg-DarkBlue" : ""
          }`}
        >
          No borders
        </span>
      );
    } else {
      return (
        <ul className="text-center items-center rounded-md text-sm gap-2 grid grid-cols-3">
          {borderNames.map((name, index) => {
            const borderCountry = nation.find(
              (country) => country.name.common === name
            );
            return (
              <li
                key={name}
                className={`px-4 py-2 flex justify-center items-center h-full shadow-md rounded-md ${
                  darkMode ? "bg-DarkBlue" : ""
                }`}
              >
                <Link to={`/country/${name}`}>
                  {borderCountry ? borderCountry.name.common : "error"}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }
  };
  return (
    <div className="flex items-center justify-center h-full text-[12px]">
      {isMenuOpen && (
        <div
          className={`flex flex-col items min-h-screen w-full py-10 md:min-h-0 md:py-20 md:h-[400px] md:px-10 md:flex-row md:items-center lg:justify-center lg:gap-32 ${
            darkMode ? "text-VeryLightGray" : ""
          }`}
          key={countryData.alpha3Code}
        >
          <div className="p-5">
            <img
              src={countryData.flags.png}
              alt={countryData.flags.alt}
              className="object-contain w-full shadow-md sm:object-cover sm:h-[400px] md:object-contain md:h-auto md:max-w-[800px] md:shadow-md "
            />
          </div>
          <div className="flex flex-col gap-10 w-full p-5 md:w-full lg:w-1/2 ">
            <h3 className="text-2xl font-bold">{countryData.name.common}</h3>

            <div className="md:flex md:justify-between ">
              <div className="flex flex-col gap-3">
                <span className="flex gap-1">
                  <p className="font-semibold">Native name:</p>
                  {
                    countryData.name.nativeName[
                      languageKeys[0] || languageKeys[1]
                    ].common
                  }
                </span>
                <span className="flex gap-1">
                  <p className="font-semibold">Population:</p>
                  {formatPopulation(countryData.population)}
                </span>
                <span className="flex gap-1">
                  <p className="font-semibold">Region:</p>
                  {countryData.region}
                </span>
                <span className="flex gap-1">
                  <p className="font-semibold">Sub Region:</p>
                  {countryData.subregion}
                </span>
                <span className="flex gap-1">
                  <p className="font-semibold">Capital:</p>
                  {countryData.capital}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="flex gap-1">
                  <p className="font-semibold">Top Level Domain:</p>
                  {countryData.tld}
                </span>
                <span className="flex gap-1">
                  <p className="font-semibold">Currencies:</p>
                  {countryData.currencies[currenciesKeys[0]].name}
                </span>
                <span className="flex gap-1">
                  <p className="font-semibold">Languages:</p>
                  <ul className="flex">
                    {Object.entries(countryData.languages).map(
                      ([key, value]) => (
                        <li key={key}>{value},</li>
                      )
                    )}
                  </ul>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <h3 className="font-semibold text-lg">Border Countries : </h3>
              <div className="">{renderBorderCountries()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CountryDetailPage.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
