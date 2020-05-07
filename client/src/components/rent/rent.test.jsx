// import React from 'react';
// import { render, unmountComponentAtNode } from 'react-dom';
// import { act } from 'react-dom/test-utils';
// import configureStore from 'redux-mock-store';
// import Rent from './rent';
// import { Provider } from 'react-redux';
//
// let container = null;
// let store = null;
// let component = null;
// const middlewares = [];
// const mockStore = configureStore(middlewares);
//
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement('div');
//   document.body.appendChild(container);
//   store = mockStore({
//     myState: 'sample text',
//   });
//
//   component = TestRenderer.create(
//     <Provider store={store}>
//       <Rent />
//     </Provider>,
//   );
// });
//
// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });


// it('renders with or without a name', () => {
//   act(() => {
//     render(<Rent />, container);
//   });
//   expect(container.textContent).toBe('Hey, stranger');
// });
