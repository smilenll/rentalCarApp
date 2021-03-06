import axios from 'axios';
import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE,
} from './carTypes';
import { redirect } from '../redirect/redirectActions';
import { API_DOMAIN_NAME } from '../../configs/configs';

export const fetchCarsRequest = () => ({
  type: FETCH_CARS_REQUEST,
});

export const fetchCarsSuccess = (cars) => ({
  type: FETCH_CARS_SUCCESS,
  payload: cars,
});

export const fetchCarsFailure = (error) => ({
  type: FETCH_CARS_FAILURE,
  payload: error,
});

export const getCars = () => (dispatch) => {
  dispatch(fetchCarsRequest());
  axios.get(`${API_DOMAIN_NAME}/cars`)
    .then((response) => {
      dispatch(redirect(null));
      dispatch(fetchCarsSuccess(response));
    })

    .catch((error) => dispatch(fetchCarsFailure(error.message)));
};
