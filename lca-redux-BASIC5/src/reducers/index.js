import { combineReducers } from 'redux';

// importing reducers
import tweets from './tweetsReducer';
import user from './userReducer';

// and combining them and thats what im exporting!
export default combineReducers({
  tweets,
  user
})
