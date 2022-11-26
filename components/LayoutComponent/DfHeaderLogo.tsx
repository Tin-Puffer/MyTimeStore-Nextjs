import { Col, Row } from "antd";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { ImUserTie } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import css from "./DfHeaderLogo.module.scss";
import { useState } from "react";
export function DefaultHeaderLogo() {
  const [openNav, setOpenNav] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <div
      className={[
        css.LayoutContent,
        (openNav || openCart) && css.disbleRoll,
      ].join(" ")}
    >
      <div className={css.headerWapper}>
        <div className={css.headerMain}>
          <Row>
            <Col xs={2} sm={2} md={0}>
              <div className={css.menuICon} onClick={() => setOpenNav(true)}>
                <FiMenu size="29px" />
              </div>
            </Col>
            <Col sm={{ span: 4, offset: 8 }} xs={{ span: 4, offset: 8 }} md={0}>
              <div className={css.logo}>
                <Link href={"/"}>
                  <img
                    src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/12/logo.png"
                    className={css.img}
                  ></img>
                </Link>
              </div>
            </Col>
            <Col xs={0} sm={0} md={8}>
              <div className={css.logo}>
                <Link href={"/"}>
                  <img
                    src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/12/logo.png"
                    className={css.img}
                  ></img>
                </Link>
              </div>
            </Col>
            <Col span={0} md={{ span: 8, offset: 8 }}>
              <div className={css.itemIcon}>
                <ul style={{ margin: 0, display: "flex" }}>
                  <li>
                    <div className={css.Icon}>
                      <AiOutlineSearch size="20px" />
                    </div>
                  </li>
                  <li>
                    <div className={css.Icon}>
                      <ImUserTie size="20px" />
                    </div>
                  </li>
                  <li>
                    <p
                      style={{
                        margin: 0,
                        lineHeight: "32px",
                        marginLeft: "10px",
                      }}
                    >
                      0.đ
                    </p>
                  </li>
                  <li>
                    <span className={css.cartIcon}>
                      <strong className={css.itemOnCart}>0</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={{ span: 2, offset: 8 }} sm={{ span: 2, offset: 8 }} md={0}>
              <div className={css.itemIcon} onClick={() => setOpenCart(true)}>
                <ul style={{ margin: 0, display: "flex" }}>
                  <span className={css.cartIcon}>
                    <strong className={css.itemOnCart}>0</strong>
                  </span>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {openNav && (
        <>
          <div
            className={css.coverLayout}
            onClick={() => setOpenNav(false)}
          ></div>
          <div className={[css.contentMenu, css.navq].join(" ")}>layout</div>
        </>
      )}
      {openCart && (
        <>
          <div
            className={css.coverLayout}
            onClick={() => setOpenCart(false)}
          ></div>
          <div className={[css.contentMenu, css.cart].join(" ")}>cart</div>
        </>
      )}
    </div>
  );
}
