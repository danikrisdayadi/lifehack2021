import isEmpty from 'is-empty';
import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_USER_STATUS
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {
        _id: '',
        username: '',
        email: '',
        iat: 0,
        exp: 0
    },
    status: 'Pending',
    loading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;
