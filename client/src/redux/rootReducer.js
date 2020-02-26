import { combineReducers } from 'redux';
import ContractReducers from './contract/contractReducers';
import CarReducers from './car/carReducers';
import RentReducers from './rent/rentReducers';

export default combineReducers({
  ContractReducers,
  CarReducers,
  RentReducers,
});
