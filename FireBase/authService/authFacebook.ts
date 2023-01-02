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

export const loginWithAccountFacebook = async (
  setLoading: Function,
  FN: Function
) => {
  setLoading(true);
  await signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      document.cookie = "islogin=true";

      if (getAdditionalUserInfo(result)?.isNewUser) {
        await updateProfile(user, {
          photoURL: `${user.photoURL}?height=500&access_token=${accessToken}`,
        });
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
        });
      }

      FN();
    })
    .catch((err) => {
      setLoading(false);
      alert(err);
    });
};
