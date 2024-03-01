import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../redux/actions/FlagsAction";

const useCountries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [dispatch]);

  // Optionally, you can return any additional data or functions if needed
};

export default useCountries;
