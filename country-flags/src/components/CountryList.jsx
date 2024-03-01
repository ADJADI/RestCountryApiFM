import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CountryList = ({ countries }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCountries, setDisplayedCountries] = useState(10); // Initial number of displayed countries
  const [additionalCountries, setAdditionalCountries] = useState(10);
  const sentinelRef = useRef(null);

  // Function to fetch more countries
  const fetchMoreCountries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const newCountries = data.slice(
        displayedCountries,
        displayedCountries + additionalCountries
      );
      setDisplayedCountries((prevCountries) => [
        ...prevCountries,
        ...newCountries,
      ]);
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
    <div className="">
      <h2>Country List</h2>
      <div className="">
        {countries.slice(0, displayedCountries).map((country, index) => (
          <div key={index} className="flex">
            <img src={country.flags.png} alt={country.flags.alt} />
            <h3 className="font-bold">{country.name.common}</h3>
            <div className="flex">
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
            </div>
          </div>
        ))}
        <li ref={sentinelRef}></li> {/* Sentinel element at the bottom */}
        {isLoading && <li>Loading more countries...</li>}{" "}
        {/* Loading indicator */}
      </div>
    </div>
  );
};

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired,
      }).isRequired,
      population: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      capital: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CountryList;
