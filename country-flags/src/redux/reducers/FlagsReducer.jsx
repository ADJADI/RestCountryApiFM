import {
  FETCH_COUNTRIES,
  FETCH_REGIONS,
  SEARCH_COUNTRIES,
  FILTER_COUNTRIES,
} from "../actions/FlagsAction";

const initialState = {
  countries: [],
  regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
  filteredCountries: [],
  searchTerm: "",
  filteredRegion: "",
};

const FlagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      };
    case FETCH_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };
    case SEARCH_COUNTRIES:
      return {
        ...state,
        searchTerm: action.payload,
        filteredCountries: state.countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ),
      };
    case FILTER_COUNTRIES:
      return {
        ...state,
        filteredRegion: action.payload,
        filteredCountries:
          action.payload === ""
            ? state.countries
            : state.countries.filter(
                (country) => country.region === action.payload
              ),
      };
    default:
      return state;
  }
};

export default FlagsReducer;
