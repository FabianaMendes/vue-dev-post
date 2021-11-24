import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyCiSFFP32EzUy-2qsKpDVu9qf0KUUQbUZc",
  authDomain: "dev-post-63ab6.firebaseapp.com",
  projectId: "dev-post-63ab6",
  storageBucket: "dev-post-63ab6.appspot.com",
  messagingSenderId: "29873899645",
  appId: "1:29873899645:web:3ce5348e2457dd0cec4914",
  measurementId: "G-L2BZD4V9VV"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;