import firebase from "firebase/app";
require('firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyDPmT8m4gC8OfZDf4cL6bauolyxa4omXpQ",
    authDomain: "freeflexr.firebaseapp.com",
    projectId: "freeflexr",
    storageBucket: "freeflexr.appspot.com",
    messagingSenderId: "263402996731",
    appId: "1:263402996731:web:dfe99de377ab2e87d2c15e",
    measurementId: "G-W0H9H3V2CV"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();