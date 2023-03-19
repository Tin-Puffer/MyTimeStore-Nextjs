import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
auth.languageCode = "it";
provider.setCustomParameters({
  login_hint: "user@example.com",
});
export const loginWithAccountGoogle = async (setLoading: Function) => {
  setLoading(true);
  await signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      document.cookie = "islogin=true";
      if (getAdditionalUserInfo(result)?.isNewUser) {
       await addDoc(collection(db, "User"), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          phone: "",
          address: [""],
        }).catch((err) => {
          setLoading(false);
          alert(err);
        }
        )
        await addDoc(collection(db, "Cart"), {
          ItemList: [],
          UserID: user.uid
        })

      }
      // ...
    })
    .catch((error) => {
      setLoading(false);
      alert(error);
    });
};
