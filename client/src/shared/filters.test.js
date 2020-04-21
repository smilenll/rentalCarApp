import React from 'react';

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
      const input = [{
        id: 1,
        manufacture: {
          id: 1,
          name: 'VW',
        },
      }, {
        id: 2,
        manufacture: {
          id: 2,
          name: 'BMW',
        },
      }, {
        id: 3,
        manufacture: {
          id: 2,
          name: 'BMW',
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
          name: 'Passat',
          carClass: {
            id: 3,
            name: 'A',
          },
        },
      }, {
        id: 1,
        model: {
          id: 11,
          name: 'Passat',
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
            id: 1,
            name: 'A',
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
    test('it should return all unique Existing amortization filters', () => {
      const inputCars = [
        {
          id: 3,
          yearOfManufacture: 2016,
        },
        {
          id: 1,
          yearOfManufacture: 2016,
        },
        {
          id: 4,
          yearOfManufacture: 2010,
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
          name: 'Old',
          from: 3,
          to: 10,
        }, {
          id: 3,
          name: 'Old',
          from: 10,
          to: 100,
        },
      ];

      const output = [
        {
          id: 1,
          name: 'New',
          from: 0,
          to: 3,
        }, {
          id: 2,
          name: 'Old',
          from: 10,
          to: 100,
        },
      ];

      expect(getAmortizationsFilters(inputCars, inputFilters)).toEqual(output);
    });
  });
});
