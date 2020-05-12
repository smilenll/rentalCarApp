import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import Contract from './contract';

let container = null;
const mockContract = {
  id: 7,
  firstName: 'Test',
  lastName: 'Test',
  age: 22,
  initialDateTime: new Date().toISOString(),
  expectedReturnDateTime: moment().add(1, 'M').toISOString(),
  car: {
    id: 7,
    model: {
      id: 15,
      name: 'Test',
      carClass: {
        id: 1,
        price: 20,
      },
    },
    yearOfManufacture: 2018,
  },
};
const mockAmortization = [{
  id: 1,
  name: 'Brand New',
  from: 0,
  to: 3,
  priceCoefficient: 1.2,
}];
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('thead');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
describe('Contract component should', () => {
  it('renders the contract', () => {
    act(() => {
      render(<Contract
        contract={mockContract}
        amortizationFilters={mockAmortization}
      />, container);
    });
    //Testing bug.
    expect(container.textContent).toBe(
      'TestTest Test12th May  2020, 14:1812th'
      + 'June  2020, 14:183221.60 $/days128.80 $/days28.80 $Return',
    );
  });

  it('renders button with text', () => {
    act(() => {
      render(
        <Contract
          contract={mockContract}
          amortizationFilters={mockAmortization}
        />, container,
      );
    });

    const button = document.querySelector('[data-testid=toggle]');
    expect(button.innerHTML).toBe('Return');

  });
  it('find and click ones Return button', () => {
    const onChange = jest.fn();

    act(() => {
      render(
        <Contract
          contract={mockContract}
          amortizationFilters={mockAmortization}
        />, container,
      );
    });
    const button = document.querySelector('[data-testid=toggle]');
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    // expect(onChange).toHaveBeenCalledTimes(1);
    expect(button.innerHTML).toBe('The car is back');
  });
});
