import axios from 'axios';
import {
  FETCH_AMORTIZATION_FAILURE,
  FETCH_AMORTIZATION_REQUEST,
  FETCH_AMORTIZATION_SUCCESS
} from './amortizationTypes';
import { API_DOMAIN_NAME } from '../../configs/configs';

export const fetchAmortizationRequest = () => ({
  type: FETCH_AMORTIZATION_REQUEST,
});

export const fetchAmortizationSuccess = (amortizations) => ({
  type: FETCH_AMORTIZATION_SUCCESS,
  payload: amortizations,
});

export const fetchAmortizationFailure = (error) => ({
  type: FETCH_AMORTIZATION_FAILURE,
  payload: error,
});

export const getAmortizations = () => (dispatch) => {
  dispatch(fetchAmortizationRequest());
  axios.get(`${API_DOMAIN_NAME}/amortizations`)
    .then((response) => dispatch(fetchAmortizationSuccess(response)))
    .catch((error) => dispatch(fetchAmortizationFailure(error.message)));
};

export const postAmortization = (body) => (dispatch) => {
  dispatch(fetchAmortizationRequest());
  axios.post(`${API_DOMAIN_NAME}/amortizations`, body)
    .then(() => { dispatch(getAmortizations()); })
    .catch((error) => dispatch(fetchAmortizationFailure(error.message)));
};

export const deleteAmortization = (id) => (dispatch) => {
  dispatch(fetchAmortizationRequest());
  axios.delete(`${API_DOMAIN_NAME}/amortizations/${id}`)
    .then(() => { dispatch(getAmortizations()); })
    .catch((error) => dispatch(fetchAmortizationFailure(error.message)));
};
