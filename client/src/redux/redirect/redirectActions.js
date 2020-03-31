import REDIRECT from './redirectTypes';

export const redirect = (link) => ({ type: REDIRECT, payload: link });
