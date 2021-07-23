/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    CLEAN_UP_ERRORS
} from './types';
import { loadUserProfile } from './UserProfileActions';

// Set logged in user
export const setCurrentUser = (decodedToken) => {
    const action = {
        type: SET_CURRENT_USER,
        payload: decodedToken
    };
    return action;
};

// User loading
export const setUserLoading = (status) => {
    const action = {
        type: USER_LOADING,
        payload: status
    };
    return action;
};

// Login - get user token
export const loginUser = (userData, history, isSocial) => (dispatch) => {
    // Indicate beginnning of request
    dispatch(setUserLoading(true));

    const endpoint = isSocial ? 'sociallogin' : 'login';

    axios
        .post(`/api/users/${endpoint}`, userData)
        .then((res) => {
            const { token } = res.data;

            // Set token to localStorage
            localStorage.setItem('jwtToken', token);

            // Set token to Auth header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwtDecode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));

            // Load user profile after logging in
            loadUserProfile(decoded._id)(dispatch);
        })
        .then(() => {
            history.push('/landscapes');
        })
        .catch((err) => {
            // End of request
            dispatch(setUserLoading(false));

            // Get error information
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.errors,
                    source: 'login'
                });
            } else {
                // If server error redirect to error page
                history.push('/500-error');
            }
        });
};

// Register User
export const registerUser = (userData, history) => (dispatch) => {
    // Indicate beginnning of request
    dispatch(setUserLoading(true));

    axios
        .post('/api/users/register', userData)
        .then(() => loginUser(userData, history, false)(dispatch))
        .catch((err) => {
            dispatch(setUserLoading(false));

            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.errors,
                    source: 'register'
                });
            } else {
                history.push('/500-error');
            }
        });
};

// Log user out
export const logoutUser = () => (dispatch) => {
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

    // Remove token from local storage
    localStorage.removeItem('jwtToken');

    // Remove auth header for future requests
    setAuthToken(false);
    dispatch({
        type: CLEAN_UP_ERRORS
    });
};
