import {
  FETCH_CARS_REQUEST,
  FETCH_CARS_SUCCESS,
  FETCH_CARS_FAILURE,
} from './carTypes';

const initialState = {
  loading: false,
  allCars: [],
  error: '',
};

export default function CarReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CARS_SUCCESS:
      return {
        loading: false,
        allCars: action.payload,
        error: '',
      };
    case FETCH_CARS_FAILURE:
      return {
        loading: false,
        allCars: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
