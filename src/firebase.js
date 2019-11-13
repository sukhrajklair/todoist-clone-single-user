import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBovVSq01t92oTZ6LXCsMDtHeLv5EkSBn8",
  authDomain: "todoist-colone.firebaseapp.com",
  databaseURL: "https://todoist-colone.firebaseio.com",
  projectId: "todoist-colone",
  storageBucket: "todoist-colone.appspot.com",
  messagingSenderId: "398530828524",
  appId: "1:398530828524:web:c45f3f3426b5c475bf2dc9"
});

export const db = firebase.firestore();