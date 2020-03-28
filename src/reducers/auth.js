import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
} from "../actions/";

const initialState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    user: {},
    refreshMovies: false,
    signupErrMessage: '',
    signupError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.user,
                refreshMovies: !state.refreshMovies
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: {}
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true
            };
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false,
                refreshMovies: !state.refreshMovies


            };
        case SIGNUP_REQUEST: {
            return {
                ...state,
                isLoggingIn: true,
                signupError: false,
                signupErrMessage: ''
            }
        }
        case SIGNUP_SUCCESS: {
            return {
                ...state,
                refreshMovies: true,
                isAuthenticated: true,
                isLoggingIn: false,
                user: action.user,

            }
        }
        case SIGNUP_ERROR: {
            return {
                ...state,
                signupError: true,
                isLoggingIn: false,
                signupErrMessage: action.signupErrMessage
            }
        }
        default:
            return state;
    }
};