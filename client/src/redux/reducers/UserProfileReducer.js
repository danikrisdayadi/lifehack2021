import { SET_USER_PROFILE, USER_PROFILE_LOADING } from '../actions/types';

const initialState = {
    userProfile: undefined,
    loading: false
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            };
        case USER_PROFILE_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

export default userProfileReducer;
