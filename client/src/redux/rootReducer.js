import { combineReducers } from 'redux';
import ContractReducers from './contract/contractReducers';
import CarReducers from './car/carReducers';

export default combineReducers({
  ContractReducers,
  CarReducers,
});
