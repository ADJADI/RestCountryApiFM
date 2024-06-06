export const FETCH_COUNTRIES = "FETCH_COUNTRIES";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const FILTER_COUNTRIES = "FILTER_COUNTRIES";
export const FETCH_REGIONS = "FETCH_REGIONS";

export const fetchCountries = (countries) => {
  return {
    type: FETCH_COUNTRIES,
    payload: countries,
  };
};

export const fetchRegions = (regions) => ({
  type: FETCH_REGIONS,
  payload: regions,
});

export const searchCountries = (searchTerm) => {
  return {
    type: SEARCH_COUNTRIES,
    payload: searchTerm,
  };
};

export const filterCountries = (region) => {
  return {
    type: FILTER_COUNTRIES,
    payload: region,
  };
};
