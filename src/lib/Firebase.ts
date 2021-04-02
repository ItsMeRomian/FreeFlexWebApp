import firebase from "firebase/app";
require('firebase/firestore')
console.log(process.env.VUE_APP_FIREBASEAPIKEY)
var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASEAPIKEY,
    authDomain: "freeflexr-22893.firebaseapp.com",
    projectId: "freeflexr-22893",
    storageBucket: "freeflexr-22893.appspot.com",
    messagingSenderId: process.env.VUE_APP_FIREBASEMESSAGINGSENDERID,
    appId: process.env.VUE_APP_FIREBASEAPPID,
    measurementId: process.env.VUE_APP_FIREBASEMAESUREMENTID
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();