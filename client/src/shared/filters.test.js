import {
  getManufacturesFilter,
  getModelsFilter,
  getCarClassesFilter,
  getAmortizationsFilters,
} from './filters';

describe('Filters', () => {
  describe('getModel', () => {
    test('it should return all unique Existing car models', () => {
      const input = [{
        id: 1,
        model: {
          id: 1,
          name: 'Passat',
        },
      }, {
        id: 2,
        model: {
          id: 2,
          name: 'Golf',
        },
      }, {
        id: 3,
        model: {
          id: 1,
          name: 'Passat',
        },
      }];

      const output = [
        {
          id: 1,
          name: 'Passat',
        }, {
          id: 2,
          name: 'Golf',
        },
      ];

      expect(getModelsFilter(input)).toEqual(output);
    });
  });

  describe('getManufactures', () => {
    test('it should return all unique Existing car manufactures', () => {
      const input = [
        {
          id: 1,
          model: {
            id: 1,
            name: 'Passat',
            manufacture: {
              id: 1,
              name: 'VW',
            },
          },
        }, {
          id: 5,
          model: {
            id: 1,
            name: 'Passat',
            manufacture: {
              id: 1,
              name: 'VW',
            },
          },
        }, {
          id: 5,
          model: {
            id: 1,
            name: 'Passat',
            manufacture: {
              id: 2,
              name: 'BMW',
            },
          },
        }];

      const output = [
        {
          id: 1,
          name: 'VW',
        }, {
          id: 2,
          name: 'BMW',
        },
      ];

      expect(getManufacturesFilter(input)).toEqual(output);
    });
  });

  describe('getCarClasses', () => {
    test('it should return all unique Existing car classes', () => {
      const input = [{
        id: 1,
        model: {
          id: 11,
          name: 'Polo',
          carClass: {
            id: 1,
            name: 'A',
          },
        },
      }, {
        id: 1,
        model: {
          id: 11,
          name: 'Polo',
          carClass: {
            id: 1,
            name: 'A',
          },
        },
      }, {
        id: 1,
        model: {
          id: 11,
          name: 'Passat',
          carClass: {
            id: 3,
            name: 'C',
          },
        },
      },
      ];

      const output = [
        {
          id: 1,
          name: 'A',
        }, {
          id: 3,
          name: 'C',
        },
      ];

      expect(getCarClassesFilter(input)).toEqual(output);
    });
  });

  describe('getAmortizationsFilters', () => {
    test('it should return all unique Existing amortization filter', () => {
      const inputCars = [
        {
          id: 3,
          yearOfManufacture: 2020,
        },
        {
          id: 2,
          yearOfManufacture: 2020,
        },
        {
          id: 1,
          yearOfManufacture: 2016,
        },
        {
          id: 4,
          yearOfManufacture: 2011,
        },
      ];

      const inputFilters = [
        {
          id: 1,
          name: 'Brand new',
          from: 0,
          to: 3,
        }, {
          id: 2,
          name: 'New',
          from: 3,
          to: 5,
        },
        {
          id: 3,
          name: 'Old',
          from: 5,
          to: 10,
        },
      ];

      const output = [
        {
          id: 1, name: 'Brand new', from: 0, to: 3,
        },
        {
          id: 2, name: 'New', from: 3, to: 5,
        },
        {
          id: 3, name: 'Old', from: 5, to: 10,
        },
      ];

      expect(getAmortizationsFilters(inputCars, inputFilters, 2020)).toEqual(output);
    });
  });
});
