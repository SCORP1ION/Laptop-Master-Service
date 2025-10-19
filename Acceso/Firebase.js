import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const settings = {timestampInSanpshots: true, merge: true};

const config = {
  apiKey: "AIzaSyAseqhxT8FMSzBYFiyrlrsB4-Uw5NQnXZA",
  authDomain: "servicelm.firebaseapp.com",
  databaseURL: "https://servicelm-default-rtdb.firebaseio.com",
  projectId: "servicelm",
  storageBucket: "servicelm.firebasestorage.app",
  messagingSenderId: "777378638584",
  appId: "1:777378638584:web:5e972f901a79a19b7d290d",
  measurementId: "G-WJ1K2VKRM6"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

const conexion = firebase.firestore()
const auth = firebase.auth() 
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export default conexion;

export  {
  firebase,
  auth,
  googleAuthProvider
}
