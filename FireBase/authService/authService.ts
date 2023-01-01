import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config";
// const user = auth.currentUser;

export function LogoutUser(auth: Auth) {
  signOut(auth);
  document.cookie = "islogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export function loginWithAccountFire(emai: string, password: string) {
  signInWithEmailAndPassword(auth, emai, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user.emailVerified == false) {
        alert("Email Verified To Use");
        LogoutUser(auth);
      } else {
        console.log(user);
        document.cookie = "islogin=true";
      }
    })
    .catch((error) => {
      console.log(error.message);
      if (error.code == "auth/user-not-found") {
        alert("Unregistered account");
      } else if (error.code == "auth/wrong-password") {
        alert("Wrong username or password");
      }
    });
}
export function removeUser(user: User | null) {
  if (user) {
    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  }
}

export const handelSingUp = (name: string, email: string, pass: string) => {
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      sendEmailVerification(user).then(() => {
        addDoc(collection(db, "User"), {
          uid: user.uid,
          name: name,
          email: user.email,
          avatar: "",
          phone: "",
          address: [""],
        })
          .then(() => {
            alert("Resign success, emailVerified send to your mail ");
            LogoutUser(auth);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((error) => {
      if (error.code == "auth/email-already-in-use") {
        alert("The email address is already in use");
      } else if (error.code == "auth/invalid-email") {
        alert("The email address is not valid.");
      } else if (error.code == "auth/operation-not-allowed") {
        alert("Operation not allowed.");
      } else if (error.code == "auth/weak-password") {
        alert("The password is too weak.");
      }
    });
};

//   const interval = setInterval(() => {
//     user.reload().then(
//       async () => {
//         if (interval && user.emailVerified) {
//           clearInterval(interval);
//           console.log("email verified finish");
//         }
//       },
//       (error) => {
//         if (interval) {
//           clearInterval(interval);
//           console.log(
//             "registerUserAndWaitEmailVerification: reload failed ! " +
//               error.message +
//               " (" +
//               error.code +
//               ")"
//           );
//         }
//       }
//     );
//   }, 1000);
//   console.log("Email verification sent");
