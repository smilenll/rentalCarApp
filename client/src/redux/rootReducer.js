import { combineReducers } from 'redux';
import ContractReducers from './contract/contractReducers';
import CarReducers from './car/carReducers';
import RentReducers from './rent/rentReducers';
import AmortizationReducers from './amortization/amortizationReducers';
import RedirectReducers from './redirect/redirectReducers';

export default combineReducers({
  ContractReducers,
  CarReducers,
  RentReducers,
  AmortizationReducers,
  RedirectReducers,
});
