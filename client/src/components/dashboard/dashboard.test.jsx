import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Dashboard from './dashboard';
import DashboardTable from './dashboard-table';

const mockStore = configureStore([]);

let store;
let component;
const ContractReducers = {
  loading: false,
  allContracts: {},
  error: '',
};
const AmortizationReducers = {

  loading: false,
  allAmortizationFilters: {},
  error: '',
};

beforeEach(() => {

});
describe('Dashboard component', () => {
  store = mockStore({
    ContractReducers,
    AmortizationReducers,
  });

  component = renderer.create(
    <Provider store={store}>
      <Dashboard />
    </Provider>,
  );


  it('should be render correct', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render contracts from Redux store', () => {
    const findContracts = component.root.findByType(DashboardTable).props.contracts;

    expect(findContracts).toBe(ContractReducers);
  });

  it('should supply amortizations to DashboardTable', () => {
    const findAmortizations = component.root.findByType(DashboardTable).props.amortizations;

    expect(findAmortizations).toBe(AmortizationReducers);
  });
});
