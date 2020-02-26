import {
  FETCH_RENT_REQUEST,
  FETCH_RENT_SUCCESS,
  FETCH_RENT_FAILURE,
} from './rentTypes';

const initialState = {
  loading: false,
  allContracts: [],
  error: '',
};

export default function RentReducers(state = initialState, action) {

  switch (action.type) {
    case FETCH_RENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RENT_SUCCESS:
      return {
        loading: false,
        allContracts: action.payload,
        error: '',
      };
    case FETCH_RENT_FAILURE:
      return {
        loading: false,
        allContracts: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
