// Can do it this way where you export a function for each action
// import * as user from '../userActions'; <-- import all function
// import { fetchUser } from '../userActions'; <-- import specific functions

// like this and call action like
// user.fetchUser() || // user.setUserAge(23) etc OR
// fetchUser()

// Redux isnt opponionated on how you fire action, just make sure every action
// has a type, this is one way of doing it.

export function fetchUser() {
  return {
    // HERE WE ARE JUST FAKING THAT A USER IS FETCHED WITH DATA
    // this would be ajax or W/E
    type: 'FETCH_USER_FULFILLED',
    payload: {
      name: 'Will',
      age: 35
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age
  }
}
