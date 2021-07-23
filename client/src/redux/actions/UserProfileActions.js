import axios from 'axios';

// Set logged in user
export const setUserProfile = (profile) => {
    const action = {
        type: 'SET_USER_PROFILE',
        payload: profile
    };
    return action;
};

// User loading
export const setUserProfileLoading = (status) => {
    const action = {
        type: 'USER_PROFILE_LOADING',
        payload: status
    };
    return action;
};

export const loadUserProfile = (username) => (dispatch) => {
    dispatch(setUserProfileLoading(true));
    axios
        .get(
            // eslint-disable-next-line no-underscore-dangle
            `/api/users/profiles/${username}`
        )
        .then((userProfileRes) => {
            dispatch(setUserProfile(userProfileRes.data));
            dispatch(setUserProfileLoading(false));
        })
        .catch((e) => {
            console.log('Couldnt load user profile');
        });
};
