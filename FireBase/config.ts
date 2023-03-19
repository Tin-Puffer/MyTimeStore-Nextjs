// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfigBlog = {
  apiKey: process.env.BLOG_apiKey,
  authDomain: process.env.BLOG_authDomain,
  projectId: process.env.BLOG_projectId,
  storageBucket: process.env.BLOG_storageBucket,
  messagingSenderId: process.env.BLOG_messagingSenderId,
  appId: process.env.BLOG_appId,
  measurementId: process.env.BLOG_measurementId
};
const appBlog = initializeApp(firebaseConfigBlog,"blog");
const dbBlog = getFirestore(appBlog);

const firebaseConfigBlogDetail = {
  // apiKey: "AIzaSyDZYGAvKuhfG6_y12JfbIomzkpG1QDUax0",
  // authDomain: "blogmytime.firebaseapp.com",
  // projectId: "blogmytime",
  // storageBucket: "blogmytime.appspot.com",
  // messagingSenderId: "326435536928",
  // appId: "1:326435536928:web:774e70e2b6c4f4d7393c45"
  
  apiKey: process.env.apiKey_detalBlog,
  authDomain: process.env.authDomain_detalBlog,
  projectId: process.env.projectId_detalBlog,
  storageBucket:process.env.storageBucket_detalBlog,
  messagingSenderId: process.env.messagingSenderId_detalBlog,
  appId:process.env.appId_detalBlog
};
const appBlogDetail = initializeApp(firebaseConfigBlogDetail,"blogDetail");
const dbBlogDetail = getFirestore(appBlogDetail);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyCjQd-mQ6V29TdiDbAnnEVRhNMg2HRw9Vo",
  // authDomain: "mytimestore-44e3b.firebaseapp.com",
  // projectId: "mytimestore-44e3b",
  // storageBucket: "mytimestore-44e3b.appspot.com",
  // messagingSenderId: "279409111659",
  // appId: "1:279409111659:web:cd3f595d226a929ba9f72e",
  // measurementId: "G-M0B1XTRDLC",
  
  apiKey:process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId:process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
const app = initializeApp(firebaseConfig,"main");
const db = getFirestore(app);

// Initialize Firebase
const auth = getAuth(app);
auth.languageCode = "vi";


export { auth, db ,dbBlog,dbBlogDetail};
