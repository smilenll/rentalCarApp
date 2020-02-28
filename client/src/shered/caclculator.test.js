import React from 'react';
import {
  calculateTaxes, calculateBasePrice, calculateDiscounts, calcDays,
} from './calculator';

describe('Calculator', () => {
  describe('calculateDiscounts', () => {
    test('it should return discount object', () => {
      const output = {
        price: 0.85,
        massage: '15% Discount for 2 to 6 days',
      };

      expect(calculateDiscounts(3)).toEqual(output);
    });

    test('it should return false object', () => {

      expect(calculateDiscounts(2)).toEqual(false);
    });
  });

  describe('calculateTaxes', () => {
    test('it should return tax object', () => {
      const output = {
        price: 1.20,
        massage: 'Yong fee increase price buy 20%',
      };

      expect(calculateTaxes(18)).toEqual(output);
    });

    test('it should return false', () => {

      expect(calculateTaxes(25)).toEqual(false);
    });
  });

  describe('calculateBasePrice', () => {
    test('it should return tax object', () => {
      const car = { carClass: { name: 'VW polo', price: 20 } };
      const output = {
        price: 60,
        massage: `Car class ${car.carClass.name} for ${car.carClass.price}$/day for 3 days`,
      };

      expect(calculateBasePrice(car, 3)).toEqual(output);
    });
  });
});

