import {
  FETCH_AMORTIZATION_FAILURE,
  FETCH_AMORTIZATION_REQUEST,
  FETCH_AMORTIZATION_SUCCESS,
} from './amortizationTypes';

const initialState = {
  loading: false,
  allAmortizationFilters: [],
  error: '',
};

export default function AmortizationReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_AMORTIZATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_AMORTIZATION_SUCCESS:
      return {
        loading: false,
        allAmortizationFilters: action.payload,
        error: '',
      };
    case FETCH_AMORTIZATION_FAILURE:
      return {
        loading: false,
        allAmortizationFilters: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
