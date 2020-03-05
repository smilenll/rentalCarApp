import axios from 'axios';
import {
  FETCH_RENT_REQUEST,
  FETCH_RENT_SUCCESS,
  FETCH_RENT_FAILURE,
} from './rentTypes';
import { redirect } from '../redirect/redirectActions';

export const fetchRentRequest = () => ({
  type: FETCH_RENT_REQUEST,
});

export const fetchRentSuccess = (rent) => ({
  type: FETCH_RENT_SUCCESS,
  payload: rent,
});

export const fetchRentFailure = (error) => ({
  type: FETCH_RENT_FAILURE,
  payload: error,
});

export const postRent = (body) => (dispatch) => {
  dispatch(fetchRentRequest());
  axios.post('http://localhost:4000/api/contracts', body)
    .then((response) => {
      dispatch(fetchRentSuccess(response));
      dispatch(redirect('/'));
    })
    .catch((error) => dispatch(fetchRentFailure(error.message)));
};
