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

export {
  getModelsFilter,
  getManufacturesFilter,
  getAmortizationsFilters,
  getCarClassesFilter,
};
