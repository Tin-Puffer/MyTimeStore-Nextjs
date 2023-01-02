import { auth, db } from "../config";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
auth.languageCode = "it";
const provider = new FacebookAuthProvider();
provider.setCustomParameters({
  display: "popup",
});
provider.addScope("user_birthday");
// const fbProvider = auth.FacebookAuthProvider();

export const loginWithAccountFacebook = (FN: Function) => {
  signInWithPopup(auth, provider).then(async (result) => {
    const user = result.user;
    console.log(user);
    document.cookie = "islogin=true";
    if (getAdditionalUserInfo(result)?.isNewUser) {
      addDoc(collection(db, "User"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        phone: "",
        address: [""],
      });
    }
    FN();
  });
};
