// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfigBlog = {
  apiKey: "AIzaSyCIH5RMT3GVxrQqVa-YRzq9PPYXpPUa3og",
  authDomain: "mytimestore-64ca6.firebaseapp.com",
  projectId: "mytimestore-64ca6",
  storageBucket: "mytimestore-64ca6.appspot.com",
  messagingSenderId: "43218910968",
  appId: "1:43218910968:web:a7538f2a5a69c48f21c50d",
  measurementId: "G-EZL6RGGKPV"
};
const appBlog = initializeApp(firebaseConfigBlog,"blog");
const dbBlog = getFirestore(appBlog);
const firebaseConfigBlogDetail = {
  apiKey: "AIzaSyDZYGAvKuhfG6_y12JfbIomzkpG1QDUax0",
  authDomain: "blogmytime.firebaseapp.com",
  projectId: "blogmytime",
  storageBucket: "blogmytime.appspot.com",
  messagingSenderId: "326435536928",
  appId: "1:326435536928:web:774e70e2b6c4f4d7393c45"
};
const appBlogDetail = initializeApp(firebaseConfigBlogDetail,"blogDetail");
const dbBlogDetail = getFirestore(appBlogDetail);
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
const app = initializeApp(firebaseConfig,"main");
const db = getFirestore(app);
const auth = getAuth(app);
auth.languageCode = "vi";


export { auth, db ,dbBlog,dbBlogDetail};
