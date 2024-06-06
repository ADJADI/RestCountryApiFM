import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatPopulation } from "../utils/utils";
import useDarkMode from "../hooks/useDarkMode";

const CountryList = ({ countries, isMenuOpen, toggleMenu }) => {
  const [darkMode] = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCountries, setDisplayedCountries] = useState(10); // Initial number of displayed countries
  const [additionalCountries] = useState(10);
  const sentinelRef = useRef(null);

  const fetchMoreCountries = () => {
    setIsLoading(true);
    try {
      if (countries && countries.length > 0) {
        // Check if countries array exists and is not empty
        const newCountries = countries.slice(
          displayedCountries,
          displayedCountries + additionalCountries
        );
        setDisplayedCountries((prevCountries) => [
          ...prevCountries,
          ...newCountries,
        ]);
      } else {
        console.error("Countries array is undefined, null, or empty");
      }
    } catch (error) {
      console.error("Error fetching more countries:", error);
    }
    setIsLoading(false);
  };

  // Intersection Observer callback function
  const handleIntersection = (entries) => {
    const sentinel = entries[0];
    if (sentinel.isIntersecting && !isLoading) {
      setDisplayedCountries(
        (prevDisplayedCountries) => prevDisplayedCountries + additionalCountries
      );
    }
  };

  // Create the Intersection Observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // Cleanup function
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center justify-center text-[14px]">
      {!isMenuOpen && (
        <div
          className="cursor-pointer  flex flex-col gap-10 items-center sm:grid sm:grid-cols-2 md:grid-cols-2 md:gap-16 lg:grid-cols-3 xl:grid-cols-4"
          onClick={toggleMenu}
        >
          {countries.slice(0, displayedCountries).map((country, index) => (
            <div
              key={index}
              className="flex flex-col w-full min-w-auto md:w-72 rounded-md shadow-xl gap-3"
            >
              <Link
                to={`/country/${country.name.common}`}
                key={country.name.common}
                state={{ countryData: country }}
              >
                <img
                  src={country.flags.png}
                  alt={country.flags.alt}
                  className="h-[160px] w-full object-cover rounded-t-md"
                />
                <div
                  className={`flex flex-col rounded-b-md h-[190px] p-5 gap-4 ${
                    darkMode ? "bg-DarkBlue text-VeryLightGray" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold">
                    {country.name.common}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <span className="flex gap-1 items-center">
                      <p className="font-semibold">Population:</p>
                      <span className="text-sm opacity-70">
                        {formatPopulation(country.population)}
                      </span>
                    </span>
                    <span className="flex gap-1 items-center">
                      <p className="font-semibold">Region:</p>
                      <span className="text-sm opacity-70">
                        {country.region}
                      </span>
                    </span>
                    <span className="flex gap-1 items-center">
                      <p className="font-semibold">Capital:</p>
                      <span className="text-sm opacity-70">
                        {country.capital}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <li ref={sentinelRef}></li> {/* Sentinel element at the bottom */}
          {isLoading && <li>Loading more countries...</li>}{" "}
          {/* Loading indicator */}
        </div>
      )}
    </div>
  );
};

CountryList.propTypes = {
  isMenuOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired,
      }).isRequired,
      population: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      capital: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    })
  ),
};

export default CountryList;
