// This is where all of the redux logic is living
import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers'; // index.js file

const middleware = applyMiddleware(promise(), thunk, logger);

// exporting a createStore an instantited store. so anyone who imports store
// basically gets that same instantited store everytime
// createStore is firing out one reducer, which is ALL of out combined reducers
// and giving it our middleware
export default createStore(reducer, middleware);
