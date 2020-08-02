import * as firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCEsmBiO1CDqRhS4NGTKRoCCG4shN9IRIU",
  authDomain: "charo-5107b.firebaseapp.com",
  databaseURL: "https://charo-5107b.firebaseio.com",
  projectId: "charo-5107b",
  storageBucket: "charo-5107b.appspot.com",
  messagingSenderId: "759332858661",
  appId: "1:759332858661:web:26fd1d82f4e83e477e48cc",
  measurementId: "G-PZP6QE99ZN",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export { db, auth };
