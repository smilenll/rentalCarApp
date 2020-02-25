import {
  FETCH_CONTRACTS_REQUEST,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_FAILURE,
} from './contractTypes';

const initialState = {
  loading: false,
  allContracts: [],
  error: '',
};

export default function ContractReducers(state = initialState, action) {

  switch (action.type) {
    case FETCH_CONTRACTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CONTRACTS_SUCCESS:
      return {
        loading: false,
        allContracts: action.payload,
        error: '',
      };
    case FETCH_CONTRACTS_FAILURE:
      return {
        loading: false,
        allContracts: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
