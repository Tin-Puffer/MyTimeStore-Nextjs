import { Row, Col } from "antd";
import { Checkbox } from "antd";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaGitlab } from "react-icons/fa";
import cssS from "../components/HomeComponent/SliderProductStyle.module.scss";
import cssC from "../components/ContactComponent/contentStyle.module.scss";
import css from "../styles/loginStyle.module.scss";
import { FacebookIcon, TwitterIcon } from "react-share";

import { FacebookAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./FireBase/config";
import { useRouter } from "next/router";

auth.languageCode = "it";
const provider = new FacebookAuthProvider();
provider.setCustomParameters({
  display: "popup",
});
provider.addScope("user_birthday");

Login.getLayout = function (page: ReactNode) {
  return <div>{page}</div>;
};
// const fbProvider = auth.FacebookAuthProvider();

export default function Login() {
  const ref = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  };
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(" id: ", user.uid);
      console.log(" email: ", user.email);
      console.log(" name: ", user.displayName);
      console.log(" img: ", user.photoURL);
    }
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [page]);
  return (
    <div
      className=""
      style={{ overflow: "hidden", width: "100%", position: "relative" }}
    >
      <div className={css.loginContainer}></div>
      <div className={css.loginContent}>
        <Row style={{ height: "100%" }}>
          <Col xs={0} md={10} lg={14}>
            <div className={css.loginImage}>
              <div className={css.imgText}>
                <h1 style={{ color: "#cbba9c" }}>MY</h1>
                <h1> TIME STORE</h1>
                <p style={{ maxHeight: "290px", overflow: "hidden" }}>
                  A successful person is not necessarily a user of our watch,
                  but a person who uses our watch is certainly a successful
                  person.
                </p>
                <span>- Bill Gates -</span>
              </div>
            </div>
          </Col>
          <Col xs={24} md={14} lg={10} style={{ position: "relative" }}>
            <div className={css.loginFrom}>
              <div style={{ marginBottom: "25px" }}>
                <p
                  onClick={() => {
                    setPage(0);
                  }}
                  style={{ marginRight: "25px" }}
                  className={[css.loginLable, page && css.disible].join(" ")}
                >
                  LOGIN
                </p>
                <p
                  onClick={() => {
                    setPage(1);
                  }}
                  className={[css.loginLable, !page && css.disible].join(" ")}
                >
                  SIGN UP
                </p>
              </div>
              <div className={cssS.driver}></div>

              <div className={css.formInput}>
                <div
                  className={[css.fromContainer, page && css.hide].join(" ")}
                >
                  <p>Hello, Friend!</p>
                  <p>Enter your personal details and start journey with us</p>

                  <div style={{ position: "relative", marginTop: "20px" }}>
                    <input
                      ref={ref}
                      className={[css.input, css.effect].join(" ")}
                      placeholder="User Name"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <div style={{ position: "relative", marginTop: "20px" }}>
                    <input
                      type="password"
                      className={[css.input, css.effect].join(" ")}
                      placeholder="Password"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <Checkbox style={{ margin: "20px 0", width: "100%" }}>
                    Keep Me Login
                  </Checkbox>
                  <h3
                    className={cssC.titleContact}
                    style={{ marginBottom: "10px" }}
                  >
                    <FaGitlab size={24} className={cssC.iconGitlab}></FaGitlab>
                  </h3>
                  <div>
                    <ul className={css.shareSocial}>
                      <li>
                        <FacebookIcon size={45} round={true} />
                      </li>
                      <li>
                        <FacebookIcon size={45} round={true} />
                      </li>
                      <li>
                        <TwitterIcon size={45} round={true} />
                      </li>
                    </ul>
                  </div>
                  <div style={{ width: "100%" }}>
                    <div className={css.button} onClick={handleLogin}>
                      LOGIN
                    </div>
                    <div className={css.button} onClick={() => signOut(auth)}>
                      LOGout
                    </div>
                  </div>
                  <Link href={"/"} className={css.forGot}>
                    Forgotten password ?
                  </Link>
                </div>
              </div>

              <div className={css.formInput}>
                <div
                  className={[css.fromContainer, !page && css.hide].join(" ")}
                >
                  <p>Welcome Back!</p>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <div style={{ position: "relative" }}>
                    <input
                      ref={ref}
                      className={[css.input, css.effect].join(" ")}
                      placeholder="Name"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <div style={{ position: "relative", marginTop: "25px" }}>
                    <input
                      className={[css.input, css.effect].join(" ")}
                      placeholder="User Name"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <div style={{ position: "relative", marginTop: "25px" }}>
                    <input
                      className={[css.input, css.effect].join(" ")}
                      placeholder="Password"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <div style={{ position: "relative", marginTop: "25px" }}>
                    <input
                      type="password"
                      className={[css.input, css.effect].join(" ")}
                      placeholder="Cofirm Password"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <Checkbox style={{ marginTop: "30px", width: "100%" }}>
                    I agree to the Terms
                  </Checkbox>
                  <div style={{ width: "100%" }}>
                    <div className={css.button}>SIGN UP</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
