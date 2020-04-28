// Read more
const unique = (array) => [...new Map(array.map((item) => [item.id, item])).values()];

const findCarAmortizationFilter = (filters, car, year = new Date().getFullYear()) => {
  const carYears = year - car.yearOfManufacture;
  return filters
    .find((rangeFilter) => rangeFilter.from <= carYears && rangeFilter.to > carYears);
};

const getManufacturesFilter = (cars) => {
  const filters = cars.map((item) => item.model.manufacture);

  return unique(filters);
};

const setManufacturesFilter = (cars, manufacture) => cars
  .filter((item) => item.model.manufacture.id === manufacture.id);

const getModelsFilter = (cars) => {
  const filters = cars.map((item) => item.model);

  return unique(filters);
};

const setModelsFilter = (cars, model) => cars
  .filter((item) => item.model.id === model.id);

const getCarClassesFilter = (cars) => {
  const filters = cars.map((item) => item.model.carClass);

  return unique(filters);
};

const setCarClassFilter = (cars, carClass) => cars
  .filter((item) => item.model.carClass.id === carClass.id);

const getAmortizationsFilters = (cars, filters) => {
  const availableFilters = cars.reduce((acc, car) => {
    const foundFilter = findCarAmortizationFilter(filters, car);
    if (foundFilter) {
      acc.push(foundFilter);
      return acc;
    }
    return acc;
  }, []);

  return unique(availableFilters);
};

const setAmortizationsFilter = (cars, rangeFilter) => cars
  .filter((item) => {
    const carYears = new Date().getFullYear() - item.yearOfManufacture;
    return rangeFilter.from <= carYears
          && rangeFilter.to > carYears;
  });

export {
  getModelsFilter,
  getManufacturesFilter,
  getAmortizationsFilters,
  getCarClassesFilter,
  setManufacturesFilter,
  setModelsFilter,
  setCarClassFilter,
  setAmortizationsFilter,
  findCarAmortizationFilter,
};
