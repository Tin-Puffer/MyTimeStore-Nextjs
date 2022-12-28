import { Col, Row } from "antd";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import { GiRotaryPhone } from "react-icons/gi";
import { ImLocation2, ImSkype } from "react-icons/im";
import { MdMarkEmailRead } from "react-icons/md";
import { FaGitlab } from "react-icons/fa";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import { motion } from "framer-motion";

import css from "./contentStyle.module.scss";

export function ContactContent() {
  return (
    <div className={css.container}>
      <div className={cssP.gridPoduct} style={{ marginTop: "0px" }}>
        <Row>
          <Col xs={24} md={12} style={{ paddingBottom: "30px" }}>
            <motion.div
              initial={{ x: "-100px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 2 }}
              className={css.content}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3918.5075896025683!2d106.7831182!3d10.8489447!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752713216a3adf%3A0xf8b22853eea72777!2zOTcgxJAuIE1hbiBUaGnhu4duLCBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1671622544486!5m2!1svi!2s"
                className={css.map}
                loading="lazy"
              ></iframe>
            </motion.div>
          </Col>
          <Col xs={24} md={12} style={{ paddingBottom: "30px" }}>
            <motion.div
              initial={{ x: "100px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 2 }}
              className={css.content}
            >
              <Row
                gutter={[20, 20]}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "40px",
                }}
              >
                <Col xs={24} md={8} lg={6}>
                  <div className={css.logoContainer}>
                    <div className={css.logo}></div>
                  </div>
                </Col>
                <Col xs={24} md={16} lg={18}>
                  <div className={css.itemLine}>
                    <div className="">
                      <ImLocation2 size={24} className={css.icon}></ImLocation2>
                    </div>
                    <div className={css.decriptLine}>
                      <p>319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM</p>
                    </div>
                  </div>
                  <div className={css.itemLine}>
                    <div className="">
                      <GiRotaryPhone
                        size={24}
                        className={css.icon}
                      ></GiRotaryPhone>
                    </div>
                    <div className={css.decriptLine}>
                      <p>
                        <a href="tel:0769220162">076 922 0162</a>
                      </p>
                    </div>
                  </div>
                  <div className={css.itemLine}>
                    <div className="">
                      <MdMarkEmailRead
                        size={24}
                        className={css.icon}
                      ></MdMarkEmailRead>
                    </div>
                    <div className={css.decriptLine}>
                      <a href="mailto:demonhunterg@gmail.com">
                        demonhunterg@gmail.com
                      </a>
                      <a href="mailto:mon@mona.media">mon@mona.media</a>
                    </div>
                  </div>
                  <div className={css.itemLine}>
                    <div className="">
                      <ImSkype size={24} className={css.icon}></ImSkype>
                    </div>
                    <div className={css.decriptLine}>
                      <p>
                        <a href="skype:demonhunterp?chat">demonhunterp</a>
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              <h3 className={css.titleContact}>
                LIÊN HỆ VỚI CHÚNG TÔI
                <FaGitlab size={24} className={css.iconGitlab}></FaGitlab>
              </h3>
              <div className={css.boxContact}>
                <div className={css.inputContainer}>
                  <div className={css.inputContent}>
                    <input
                      className={[cssD.gold, cssD.boxInput].join(" ")}
                      placeholder="nguyentin"
                    ></input>
                  </div>
                </div>
                <div className={css.inputContainer}>
                  <div className={css.inputContent}>
                    <input
                      className={[cssD.gold, cssD.boxInput].join(" ")}
                      placeholder="nguyentin"
                    ></input>
                  </div>
                </div>
                <div className={css.inputContainer}>
                  <div className={css.inputContent}>
                    <input
                      className={[cssD.gold, cssD.boxInput].join(" ")}
                      placeholder="nguyentin"
                    ></input>
                  </div>
                </div>
                <div className={css.inputContainer}>
                  <div className={css.inputContent}>
                    <input
                      className={[cssD.gold, cssD.boxInput].join(" ")}
                      placeholder="nguyentin"
                    ></input>
                  </div>
                </div>
              </div>
              <div className={css.mesage}>
                <div className={css.inputContent}>
                  <textarea
                    className={[cssD.gold, cssD.boxInput].join(" ")}
                    cols={40}
                    rows={5}
                    style={{ lineHeight: "20px" }}
                  ></textarea>
                </div>
              </div>
              <div className={css.inputContent} style={{ textAlign: "center" }}>
                <div
                  className={[cssS.button, css.SubmitContac].join(" ")}
                  style={{ fontSize: "18px" }}
                >
                  <p style={{ padding: "10px 18px" }}>GỬI</p>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
