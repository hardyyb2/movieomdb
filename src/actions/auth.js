import { myFirebase } from "../firebase/firebase";
import { db } from '../firebase/firebase'

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const FETCH_FAVORITES = "FETCH_FAVORITES"

//login
const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};
const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

//logout

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
    };
};

const receiveLogout = user => {
    return {
        type: LOGOUT_SUCCESS,

    };
};
const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

//verify
const verifyRequest = user => {
    return {
        type: VERIFY_REQUEST,
        user
    };
};
const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

//const start SIGNUP
const signUpSuccess = (user) => {
    return {
        type: SIGNUP_SUCCESS,
        user
    }
}
const requestSignup = () => {
    return {
        type: SIGNUP_REQUEST
    }
}


//fetch favorites


export const getFavorites = (user) => dispatch => {
    console.log(user.user.uid)
    db.collection(`users`)
        .doc(user.user.uid)
        .get()
        .then(doc => {
            Promise.resolve(localStorage.setItem('movieFavorites', JSON.stringify(doc.data().favoriteMovies)))
                .then(re =>

                    dispatch(receiveLogin(user))
                )
        }).catch(err => {
            console.log('couldnt fetch favorites' + err.message)
        })
}

export const setFavorites = (userId) => dispatch => {
    const favs = JSON.parse(localStorage.getItem('movieFavorites'))
    db.collection(`users`)
        .doc(userId)
        .set(
            {
                favoriteMovies: favs
            },
            { merge: true }
        )
        .then(() => {
            myFirebase
                .auth()
                .signOut()
                .then(() => {

                    localStorage.clear()
                    dispatch(receiveLogout())
                })
                .catch(error => {
                    //Do something with the error if you want!
                    dispatch(logoutError());
                });
        })
        .catch(err => {
            console.log(`db not updated` + err.message)
        })
}

export const setUpFavMoviesArray = (user) => dispatch => {
    db.collection(`users`)
        .doc(user.user.uid)
        .set(
            {
                favoriteMovies: []
            },
            { merge: true }
        )
        .then(() => {
            localStorage.setItem('movieFavorites', JSON.stringify([]))
            dispatch(signUpSuccess(user))
        }).catch(err => {
            console.log('signup errr' + err.message)
        })
}

//functions

export const signupUser = (email, password) => dispatch => {
    dispatch(requestSignup())
    myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(setUpFavMoviesArray(user))
        }
        )
        .catch(err => {
            console.log('couldnt sign up')
        })
}


export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(getFavorites(user))
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(loginError());
        });
};

export const logoutUser = (user) => dispatch => {
    let userId
    if (!!user.uid) {
        userId = user.uid
    } else {
        userId = user.user.uid
    }
    dispatch(requestLogout());

    dispatch(setFavorites(userId))

};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
            dispatch(receiveLogin(user));
        }
        dispatch(verifySuccess());
    });
};