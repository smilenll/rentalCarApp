import React from 'react';
import {
  calculateTaxes, calculateBasePrice, calculateDiscounts
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

  describe('calculateReturnPrice', () => {
    test('it should return the predicted bill', () => {
      const contractDays = 3;
      const actualDays = 3;
      const price = 60;

      const output = 60;

      expect(calculateReturnPrice(contractDays, actualDays, price)).toEqual(output);
    });

    test('it should return the price with 20% penalty for 2 days', () => {
      const contractDays = 3;
      const actualDays = 5;
      const price = 60;

      const output = 108;

      expect(calculateReturnPrice(contractDays, actualDays, price)).toEqual(output);
    });

    test('it should return the price with 20% penalty for 2 days', () => {
      const contractDays = 3;
      const actualDays = 5;
      const price = 60;

      const output = 108;

      expect(calculateReturnPrice(contractDays, actualDays, price)).toEqual(output);
    });

    test('it should return the price with 20% penalty for 2 days', () => {
      const contractDays = 3;
      const actualDays = 5;
      const price = 60;

      const output = 108;

      expect(calculateReturnPrice(contractDays, actualDays, price)).toEqual(output);
    });

    test('it should return the price with 50% penalty for 5 days', () => {
      const contractDays = 3;
      const actualDays = 9;
      const price = 60;

      const output = 240;

      expect(calculateReturnPrice(contractDays, actualDays, price)).toEqual(output);
    });
  });
});
