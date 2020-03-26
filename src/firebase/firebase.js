import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD_H5670mYX-jWl2AtMqVXcn1K-dMRaGnE",
    authDomain: "movieomdb.firebaseapp.com",
    databaseURL: "https://movieomdb.firebaseio.com",
    projectId: "movieomdb",
    storageBucket: "movieomdb.appspot.com",
    messagingSenderId: "284515199700",
    appId: "1:284515199700:web:b248a31e7ad662a00de941",
    measurementId: "G-WKGNYYYN4B"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;