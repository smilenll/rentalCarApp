// Read more
const unique = (array) => [...new Map(array.map((item) => [item.id, item])).values()];

export const getManufacturesFilter = (cars) => {
  const filters = cars.map((item) => item.model.manufacture);

  return unique(filters);
};

export const getModelsFilter = (cars) => {
  const filters = cars.map((item) => item.model);

  return unique(filters);
};

export const getCarClassesFilter = (cars) => {
  const filters = cars.map((item) => item.model.carClass);

  return unique(filters);
};

export const getAmortizationsFilters = (cars, filters, year = new Date().getFullYear()) => {
  const availableFilters = cars.map((car) => {
    const carYears = year - car.yearOfManufacture;

    return filters
      .find((rangeFilter) => rangeFilter.from <= carYears && rangeFilter.to > carYears);
  });

  return unique(availableFilters);
};
