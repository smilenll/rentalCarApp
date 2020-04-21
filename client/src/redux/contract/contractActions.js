import axios from 'axios';
import {
  FETCH_CONTRACTS_FAILURE,
  FETCH_CONTRACTS_REQUEST,
  FETCH_CONTRACTS_SUCCESS,
} from './contractTypes';
import { API_DOMAIN_NAME } from '../../configs/configs';

export const fetchContractsRequest = () => ({
  type: FETCH_CONTRACTS_REQUEST,
});

export const fetchContractsSuccess = (contracts) => ({
  type: FETCH_CONTRACTS_SUCCESS,
  payload: contracts,
});

export const fetchContractsFailure = (error) => ({
  type: FETCH_CONTRACTS_FAILURE,
  payload: error,
});

export const getContracts = () => (dispatch) => {
  dispatch(fetchContractsRequest());
  axios.get(`${API_DOMAIN_NAME}/contracts`)
    .then((response) => dispatch(fetchContractsSuccess(response)))
    .catch((error) => dispatch(fetchContractsFailure(error.message)));
};
