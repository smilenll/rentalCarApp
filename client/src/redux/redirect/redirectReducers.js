import REDIRECT from './redirectTypes';

const initialState = { redirectTo: null };

export default function RedirectReducers(state = initialState, action) {

  switch (action.type) {
    case REDIRECT:
      return {
        redirectTo: action.payload,
      };
    default:
      return state;
  }
}
