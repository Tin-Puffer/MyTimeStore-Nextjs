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

export const LogoutUser = (auth: Auth) => {
  signOut(auth);
  if (document.cookie) {
    document.cookie =
      "islogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("LogOut");
    localStorage.removeItem('auth')
    localStorage.removeItem('cart')
  }
};
export async function loginWithAccountFire(
  setLoading: Function,
  emai: string,
  password: string
) {
  setLoading(true);
  await signInWithEmailAndPassword(auth, emai, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user.emailVerified == false) {
        setLoading(false);
        alert("Email Verified To Use");
        LogoutUser(auth);
      } else {
        console.log(user);
        document.cookie = "islogin=true";
      }
    })
    .catch((error) => {
      alert(error.message);
      setLoading(false);
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

export const handelSingUp = async (
  setLoading: Function,
  name: string,
  email: string,
  pass: string
) => {
  setLoading(true);

  await createUserWithEmailAndPassword(auth, email, pass)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await sendEmailVerification(user)
        .then(async () => {
          await addDoc(collection(db, "User"), {
            uid: user.uid,
            name: name,
            email: user.email,
            avatar: "",
            phone: "",
            address: [""],
          })
            .then(() => {
              alert("Resign success, emailVerified send to your mail ");
              setLoading(false);
              LogoutUser(auth);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    })
    .catch((error) => {
      setLoading(false);
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

// String photoUrl = fbUser.photoURL + "?height=500&access_token=" + fbToken.token;