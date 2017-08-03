// REDUX MIDDLEWARE
// Middleware will intercept every single action that comes through, then it can either
// Modify that action or it can actually cancel that action by simply not calling
// Any of the next middleware

// applyMiddleware
import { applyMiddleware, createStore } from 'redux';

const reducer = (initialState=0, action) => {
  if(action.type === 'INC') {
    return initialState + 1;
  }
  else if (action.type === 'DEC') {
    return initialState - 1;
  }
  else if (action.type === 'E') {
    throw new Error('AHAHAHA!!!!!');
  }
  return initialState;
}
// These would all live in their own files
// Create a logger middleware - You probably wont need to create your own middleware
// Most middleware will be pulled in as an npm package and just throw it into applyMiddleware
// This is how to create a simple middleware, its just a chain of thunks
const logger = (store) => (next) => (action) => {
  // This is our middleware function that will fire every single time
  console.log('action fired', action);
  // action fired Object {type: "INC"}
  // action fired Object {type: "INC"}

  // You can actually change things in here like the action.type
  // This will make the action FIRE DEC everytime even though in conole it will
  // Still say INC
  // action.type = 'DEC';
  // To call the next middleware simply fire next
  next(action);
}

// Create a error middleware
const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch(e) {
    // Check if there is an error
    console.log('AHHHHH!', e);
  }
}



// So any middleware we want to add in we simply add into this function as arguments
// Add the logger and error middleware as an argument
const middleware = applyMiddleware(logger, error);
// To add middleware its really simple you just add a third argument to the
// createStore command
const store = createStore(reducer, 1, middleware);

store.subscribe(() => {
  console.log('store changed', store.getState());
})

store.dispatch({type: 'INC'});
store.dispatch({type: 'INC'});
store.dispatch({type: 'INC'});
store.dispatch({type: 'DEC'});
store.dispatch({type: 'E'});
store.dispatch({type: 'DEC'});
