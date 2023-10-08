import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAdITF4-M5mlwnFOdiMUC-rJIjBLpl1xNk",
  authDomain: "disney-219ff.firebaseapp.com",
  projectId: "disney-219ff",
  storageBucket: "disney-219ff.appspot.com",
  messagingSenderId: "887183028436",
  appId: "1:887183028436:web:9821aa25a7d2a3b05e4b41",
  measurementId: "G-FSTJTK7MQP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
