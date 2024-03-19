import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../redux/actions/FlagsAction";

const useCountries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.flags.countries);

  useEffect(() => {
    // Check if countries data already exists in Redux store
    if (countries.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          if (!response.ok) {
            throw new Error("Failed to fetch countries");
          }
          const data = await response.json();
          dispatch(fetchCountries(data)); // Dispatch action to update Redux store with fetched countries
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      };
      fetchData(); // Call the fetchData function when the component mounts
    }
  }, [dispatch, countries]); // Dependency on dispatch and countries data

  // Return any additional data or functions if needed
  return countries;
};

export default useCountries;
