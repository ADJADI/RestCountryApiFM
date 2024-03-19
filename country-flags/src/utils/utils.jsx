export const formatPopulation = (population) => {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
