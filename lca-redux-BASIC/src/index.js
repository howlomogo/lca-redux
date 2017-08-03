// Not even using React here.
// This is as basic as it gets for redux but this is a basic overlay

import { createStore } from 'redux';

// The reducer recives two things a state and an action
// and whatever it returns is the new state for the store
// So we make changes to the state based off of what the action tells us to do
const reducer = function(state, action) {
  if(action.type === 'INC') {
    // New state
    return state + action.payload;
  }
  if(action.type === 'DEC') {
    return state - action.payload;
  }
  // otherwise
  return state;
}

// Normally this owuld be an object
const store = createStore(reducer, 0);


// Listen to the store, when anything happens to the store we run this
store.subscribe(() => {
  // Console log the stores current state
  console.log('store changed', store.getState());
})

// type has be be type. payload can be changed however it is common practise to
// Leave it as payload
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "INC", payload: 189})
store.dispatch({type: "INC", payload: 400})
store.dispatch({type: "INC", payload: 1})
store.dispatch({type: "DEC", payload: 89})
