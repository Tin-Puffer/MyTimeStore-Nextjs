// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjQd-mQ6V29TdiDbAnnEVRhNMg2HRw9Vo",
  authDomain: "mytimestore-44e3b.firebaseapp.com",
  projectId: "mytimestore-44e3b",
  storageBucket: "mytimestore-44e3b.appspot.com",
  messagingSenderId: "279409111659",
  appId: "1:279409111659:web:cd3f595d226a929ba9f72e",
  measurementId: "G-M0B1XTRDLC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db };
