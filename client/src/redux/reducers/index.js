import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import userProfileReducer from './UserProfileReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    userProfile: userProfileReducer
});
