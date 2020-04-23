// Read more
const unique = (array) => [...new Map(array.map((item) => [item.id, item])).values()];

const getManufacturesFilter = (cars) => {
  const filters = cars.map((item) => item.model.manufacture);

  return unique(filters);
};

const getModelsFilter = (cars) => {
  const filters = cars.map((item) => item.model);

  return unique(filters);
};

const getCarClassesFilter = (cars) => {
  const filters = cars.map((item) => item.model.carClass);

  return unique(filters);
};

const getAmortizationsFilters = (cars, filters, year = new Date().getFullYear()) => {
  const availableFilters = cars.map((car) => {
    const carYears = year - car.yearOfManufacture;

    return filters
      .find((rangeFilter) => rangeFilter.from <= carYears && rangeFilter.to > carYears);
  });

  return unique(availableFilters);
};

const setManufacturesFilter = (cars, manufacture) => cars
  .filter((item) => item.model.manufacture.id === manufacture.id);

const setModelsFilter = (cars, model) => cars
  .filter((item) => item.model.id === model.id);

const setCarClassFilter = (cars, carClass) => cars
  .filter((item) => item.model.carClass.id === carClass.id);

export {
  getModelsFilter,
  getManufacturesFilter,
  getAmortizationsFilters,
  getCarClassesFilter,
  setManufacturesFilter,
  setModelsFilter,
  setCarClassFilter,
};
