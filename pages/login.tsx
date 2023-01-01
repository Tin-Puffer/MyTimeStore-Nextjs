import { Row, Col, Form, Input } from "antd";
import { Checkbox } from "antd";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaGitlab } from "react-icons/fa";
import cssS from "../components/HomeComponent/SliderProductStyle.module.scss";
import cssC from "../components/ContactComponent/contentStyle.module.scss";
import cssCA from "../components/CheckOut/CreatAcStyle.module.scss";

import cssD from "../components/DetailProductComponent/DecriptionStyle.module.scss";

// import { FacebookIcon, TwitterIcon } from "react-share";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { CreateAc, layout, validateMessages } from "../components/CheckOut";
import {
  getAdditionalUserInfo,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  query,
  doc,
  setDoc,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../FireBase/config";
import { useRouter } from "next/router";
import css from "../styles/loginStyle.module.scss";
import {
  handelSingUp,
  loginWithAccountFire,
  removeUser,
} from "../FireBase/authService";

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
  const user = auth.currentUser;

  // const handleLogin = () => {
  //   createUserWithEmailAndPassword(
  //     auth,
  //     "akumaraito1@gmail.com",
  //     "123123"
  //   ).then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     sendEmailVerification(user).then(() => {
  //       const interval = setInterval(() => {
  //         user.reload().then(
  //           () => {
  //             if (interval && user.emailVerified) {
  //               clearInterval(interval);
  //               console.log("email verified finish");
  //             }
  //           },
  //           (error) => {
  //             if (interval) {
  //               clearInterval(interval);
  //               console.log(
  //                 "registerUserAndWaitEmailVerification: reload failed ! " +
  //                   error.message +
  //                   " (" +
  //                   error.code +
  //                   ")"
  //               );
  //             }
  //           }
  //         );
  //       }, 1000);
  //       console.log("Email verification sent");
  //     });
  //     // ...
  //   });
  // signInWithPopup(auth, provider).then(async (result) => {
  //   console.log(result.user);
  //   xx(user?.photoURL || "");
  // if (getAdditionalUserInfo(result)?.isNewUser) {
  // addDoc(collection(db, "cities"), {
  //   name: "Los Angeles112",
  //   state: "CA",
  //   country: "USA",
  // });
  // }

  // const q = query(collection(db, "cities"), where("state", "==", "CA"));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc);
  // });
  // console.log(querySnapshot);
  // });
  // };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        router.push("/");
      }
    });
  }, [auth]);

  //     // if (getAdditionalUserInfo(result)?.isNewUser) {
  //     //   console.log("good");
  //     // }
  //     // console.log(" id: ", user.uid);
  //     // console.log(" email: ", user.email);
  //     // console.log(" name: ", user.displayName);
  //     // console.log(" img: ", user.photoURL);
  //   }
  // });
  const onSignIn = (value: any) => {
    console.log(value);
    loginWithAccountFire(value.Email, value.password);
  };
  const onSignUp = (value: any) => {
    handelSingUp(value.Username, value.Email, value.password);
  };
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
                  <Form
                    layout="vertical"
                    {...layout}
                    name="nest-messages"
                    onFinish={onSignIn}
                    validateMessages={validateMessages}
                    id="SingIForm"
                  >
                    <Form.Item
                      className={cssCA.nameInput}
                      name={"Email"}
                      label="Emmail Address"
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input
                        type="text"
                        className={[cssCA.inputDiscount, cssD.boxInput].join(
                          " "
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      className={cssCA.nameInput}
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        type="password"
                        className={[cssCA.inputDiscount, cssD.boxInput].join(
                          " "
                        )}
                      />
                    </Form.Item>
                  </Form>
                  <Checkbox style={{ margin: "20px 0", width: "100%" }}>
                    Keep Me Login
                  </Checkbox>

                  <div style={{ width: "100%" }}>
                    <button className={css.button} form="SingIForm">
                      LOGIN
                    </button>
                  </div>
                  <Link href={"/"} className={css.forGot}>
                    Forgotten password ?
                  </Link>
                  <div style={{ marginTop: "30px" }}>
                    <ul className={css.shareSocial}>
                      <li style={{ width: "100%", padding: 0 }}>
                        <GoogleLoginButton className={css.bxlogin} />
                      </li>
                      <li style={{ width: "100%", padding: 0 }}>
                        <FacebookLoginButton className={css.bxlogin} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={css.formInput}>
                <div
                  className={[css.fromContainer, !page && css.hide].join(" ")}
                >
                  <Form
                    layout="vertical"
                    {...layout}
                    name="nest-messages"
                    onFinish={onSignUp}
                    validateMessages={validateMessages}
                    id="SingUForm"
                  >
                    <Form.Item
                      className={cssCA.nameInput}
                      name={"Username"}
                      label="Username"
                      rules={[{ required: true }]}
                    >
                      <Input
                        className={[cssCA.inputDiscount, cssD.boxInput].join(
                          " "
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      className={cssCA.nameInput}
                      name={"Email"}
                      label="Emmail Address"
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input
                        type="text"
                        className={[cssCA.inputDiscount, cssD.boxInput].join(
                          " "
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      className={cssCA.nameInput}
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 6,
                          message: "Password must be minimum 6 characters",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        type="password"
                        className={[cssCA.inputDiscount, cssD.boxInput].join(
                          " "
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      className={cssCA.nameInput}
                      name="confirm"
                      label="Confirm Password"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },

                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        type="password"
                        className={[cssCA.inputDiscount, cssD.boxInput].join(
                          " "
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      name="agreement"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Should accept agreement")
                                ),
                        },
                      ]}
                    >
                      <Checkbox>
                        I have read the <Link href="/">agreement</Link>
                      </Checkbox>
                    </Form.Item>
                  </Form>

                  <div style={{ width: "100%", display: "flex" }}>
                    <button className={css.button} form="SingUForm">
                      SIGN UP
                    </button>
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
