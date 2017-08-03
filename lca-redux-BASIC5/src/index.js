import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Layout from './components/Layout';

// import store
import store from './store';

const app = document.getElementById('app');

// Two steps to tying this in
// Tying them together, wrap the top level component with react-reduxs Provider Component
// And Inject the store into the provider the provider requries and expects you to give
// it a store
// NOW ANY COMPONENT ANYWHERE DOWN THE CHAIN CAN IMPORT DATA FROM THE REDUX STORE,
// IT CAN ALSO DISPATCH STORE ACTIONS!!!
ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>
  , root);
