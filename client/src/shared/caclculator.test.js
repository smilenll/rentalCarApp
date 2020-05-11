import React from 'react';
import {
  calculateTaxes,
  calculateBasePrice,
  calculateDiscounts,
  calculateReturnPrice,
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
      const carClass = { name: 'VW polo', price: 20 };
      const output = {
        price: 60,
        massage: `Car class ${carClass.name} for ${carClass.price}$/day for 3 days`,
      };

      expect(calculateBasePrice(carClass, 3)).toEqual(output);
    });
  });

  describe('calculateReturnPrice', () => {
    test('it should return the predicted bill', () => {
      const contractDays = 2;
      const actualDays = 2;
      const contract = {
        age: 26,
        car: {
          model: {
            carClass: {
              price: 20,
            },
          },
        },
      };

      const output = 40;

      expect(calculateReturnPrice(contract, contractDays, actualDays)).toEqual(output);
    });

    test('it should return the price with 20% penalty for 4 days', () => {
      const contractDays = 1;
      const actualDays = 3;
      const contract = {
        age: 26,
        car: {
          model: {
            carClass: {
              price: 20,
            },
          },
        },
      };

      const output = 68;

      expect(calculateReturnPrice(contract, contractDays, actualDays)).toEqual(output);
    });

    test('it should return the price with 50% penalty for 8 days', () => {
      const contractDays = 1;
      const actualDays = 9;
      const contract = {
        age: 26,
        car: {
          model: {
            carClass: {
              price: 20,
            },
          },
        },
      };

      const output = 260;

      expect(calculateReturnPrice(contract, contractDays, actualDays)).toEqual(output);
    });
  });
});
