// THIS IS HOW YOU HANDLE ASYNC ACTIONS, VERY COOL STUFF promise middleware and thunk
// With redux tied into react, React is ONLY EVER a view representation of the
// state of the store, so as the store changes the view changes, but the view
// NEVER changes unless the store changes
// With redux, react is simply a view layer ONLY, you move absolutely all of the
// representation out of the components and into the store, so basically you
// NEVER use state again your always going to use props that come from the store.

import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import logger from 'redux-logger';

// You can use either of these redux thunk or promise to handle async actions
// I have commented out the thunk versions, the promise is cleaner. But thunk
// If more customisble by my thinking.
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';


// Add initial state
const initialState = {
  // If its fetching we can show a loader for example
  fetching: false,
  fetched: false,
  users: [],
  error: null,
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    // case 'FETCH_USERS_START': { <-- THUNK WAY
    case 'FETCH_USERS_PENDING': {
      return {...state, fetching: true}
      break;
    }
    // case 'FETCH_USERS_ERROR': { <-- THUNK WAY
    case 'FETCH_USERS_REJECTED' : {
      return {...state, fetching: false, error: action.payload}
      break;
    }
    // case 'RECEIVE_USERS': { <-- THUNK WAY
    case 'FETCH_USERS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      }
      break;
    }
  }
  return state
}

// Pass in logger to middleware - it console logs prev state action and next state
// Its very useful, you can add promise instead or in addition to thunk or just use thunk
const middleware = applyMiddleware(promise(), thunk, logger)
const store = createStore(reducer, middleware)

// THIS IS THE PROMISE WAY
store.dispatch({
  type: 'FETCH_USERS',
  // You return the promise as the payload, promise will notice that you dispatched
  // a payload as a promise type and will automatically send through some default
  // messages / dispatches for you, it will send FETCH_USERS_PENDING,
  // FETCH_USERS_FILLED whenever its finished and if theres an error it will do
  // FETCH_USERS_REJECTED ETC
  payload: axios.get('http://rest.learncode.academy/api/wstern/users')
})



// How to handle async actions - as far as redux and react are concerned Its
// just a handful of multiple syncronos actions. The Thunk middleware allows us to
// do this. Now multiple actions are happening with one action
// This is the way you do it with thunks, by dispatching a single function that
// recieves a dispatch first argument, you can only ever give it one argument.
// Look at more on Thunks
// THE THUNK WAYS
// store.dispatch((dispatch) => {
//   // FETCH USERS START could do something like show a loading bar of keep a reference
//   // To that you have actually started fetching users.
//   dispatch({type: 'FETCH_USERS_START'})
//   axios.get('http://rest.learncode.academy/api/wstern/users')
//     // then will give us a response
//     .then((response) => {
//       // When our response is recieved
//       dispatch({type: 'RECEIVE_USERS', payload: response.data})
//     })
//     // If error catch it
//     .catch((err) => {
//       dispatch({type: 'FETCH_USERS_ERROR', payload: err})
//     })
// })
