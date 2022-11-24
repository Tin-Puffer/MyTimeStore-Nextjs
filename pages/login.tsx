import { Row, Col } from "antd";
import { Checkbox } from "antd";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import css from "../styles/loginStyle.module.scss";

Login.getLayout = function (page: ReactNode) {
  return <div>{page}</div>;
};

export default function Login() {
  const ref = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(0);
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
                  A sage once said that a successful person is not necessarily a
                  user of our watch, but a person who uses our watch is
                  certainly a successful person.
                </p>
                <span>- Bill Gates -</span>
              </div>
            </div>
          </Col>
          <Col xs={24} md={14} lg={10}>
            <div className={css.loginFrom}>
              <p
                onClick={() => {
                  setPage(0);
                }}
                style={{ marginRight: "20px" }}
                className={
                  page == 0
                    ? css.loginLable
                    : [css.loginLable, css.disible].join(" ")
                }
              >
                LOGIN
              </p>
              <p
                onClick={() => {
                  setPage(1);
                }}
                className={
                  page == 1
                    ? css.loginLable
                    : [css.loginLable, css.disible].join(" ")
                }
              >
                SIGN UP
              </p>
              {!page ? (
                <div className={css.formInput}>
                  <p>DO YOU HAVE AN ACCOUNT?</p>
                  <p>
                    Dont worry, you can sign up{" "}
                    <Link
                      href={"/sigup"}
                      style={{ textDecoration: "underline" }}
                    >
                      {" "}
                      HERE
                    </Link>
                  </p>

                  <div style={{ position: "relative", marginTop: "40px" }}>
                    <input
                      ref={ref}
                      className={[css.input, css.effect].join(" ")}
                      placeholder="User Name"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <div style={{ position: "relative", marginTop: "40px" }}>
                    <input
                      type="password"
                      className={[css.input, css.effect].join(" ")}
                      placeholder="Password"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <Checkbox style={{ marginTop: "30px", width: "100%" }}>
                    Keep Me Login
                  </Checkbox>
                  <div style={{ width: "100%" }}>
                    <div className={css.button}>LOGIN</div>
                  </div>
                  <Link href={"/"} className={css.forGot}>
                    Forgotten password ?
                  </Link>
                </div>
              ) : (
                <div className={css.formInputx}>
                  <div style={{ position: "relative" }}>
                    <input
                      ref={ref}
                      className={[css.input, css.effect].join(" ")}
                      placeholder="Name"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <div style={{ position: "relative", marginTop: "40px" }}>
                    <input
                      className={[css.input, css.effect].join(" ")}
                      placeholder="User Name"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <div style={{ position: "relative", marginTop: "40px" }}>
                    <input
                      className={[css.input, css.effect].join(" ")}
                      placeholder="Password"
                    ></input>
                    <span className={css.focusBorder}></span>
                  </div>
                  <div style={{ position: "relative", marginTop: "40px" }}>
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
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
