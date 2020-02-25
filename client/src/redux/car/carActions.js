import axios from 'axios';
import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE,
} from './carTypes';

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
  axios.get('http://localhost:4000/api/cars')
    .then((response) => dispatch(fetchCarsSuccess(response)))
    .catch((error) => dispatch(fetchCarsFailure(error.message)));
};
