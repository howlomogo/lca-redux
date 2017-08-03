import { combineReducers, createStore } from 'redux';

// Create Multiple Reducers, pretend these are in there own files

//---------------------------SEPERATE FILE------------------------------------//
// state param will be the const store user object so it will only be able to act
// on that user object, whatever it returns get set as the new value for the
// user piece of the state. As notice in const reducers user: userReducer!
// You set your default state values here it is an empty object {}
// You always have to return something in these functions
// This userReducer is not aware of the tweets portion of the data, it cant change
// the Tweets portion of the data
const userReducer = (state={}, action) => {
  // You can do it this way and return new state
  // const newState = {...state};
  switch(action.type) {
    case 'CHANGE_NAME': {
      // This is ok as it completely overwrites the state
      // This pulls in all the values from state and replaces name
      state = {...state, name: action.payload}

      // THIS IS BAD, WE ARE MUTATING THE STATE OBJECT - DO NOT DO THIS!!!
      // state.name = action.payload; <---- BAD
      break;
    }
    case 'CHANGE_AGE': {
      state = {...state, age: action.payload}

      // THIS IS BAD, WE ARE MUTATING THE STATE OBJECT - DO NOT DO THIS!!!
      // state.age = action.payload; <---- BAD
      break;
    }
  }

  // So here we will be at least returning empty brackets if nothing is passed in
  // The first time
  // return newState;
  return state;
};
//----------------------------------------------------------------------------//

//---------------------------SEPERATE FILE------------------------------------//

// Or
// const default values etc
// The tweetsReducer COULD ACT ON THE CHANGE_NAME event one action could trigger
// Multiple side effects that are all completely decoupled from each other
// This can be done fine to act on certain actions
const tweetsReducer = (state=[], action) => {
  return state;
};

//----------------------------------------------------------------------------//


//---------------------------SEPERATE FILE------------------------------------//
// Where you bootstrap your store this would all be in one file
// Combine Redcuers - Pretend theres another file here for this.
// Pass this an object, the object will basically say what piece of data are we
// Modifying and which reducer function is going to handle that.
const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
})

// You dont set your default values in here anymore, you set them in the reducers
const store = createStore(reducers, {

});
//----------------------------------------------------------------------------//


// Listen to the store, when anything happens to the store we run this
store.subscribe(() => {
  // Console log the stores current state
  console.log('store changed', store.getState());
})

// type has be be type. payload can be changed however it is common practise to
// Leave it as payload
store.dispatch({type: "CHANGE_NAME", payload: 'Matt'})
store.dispatch({type: "CHANGE_AGE", payload: 31})
store.dispatch({type: "CHANGE_AGE", payload: 32})
