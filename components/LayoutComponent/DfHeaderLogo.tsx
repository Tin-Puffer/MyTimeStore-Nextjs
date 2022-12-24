import { Col, Row } from "antd";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { ImUserTie } from "react-icons/im";
import { FiMenu } from "react-icons/fi";

import { useState, useEffect } from "react";
import cssO from "../HomeComponent/OutBlogStyle.module.scss";
import { FaSearch } from "react-icons/fa";
import cssF from "./DfFooter.module.scss";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import { BsChevronDown } from "react-icons/bs";
import css from "./DfHeaderLogo.module.scss";
export function DefaultHeaderLogo() {
  const [openNav, setOpenNav] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [onCart, setonCart] = useState(true);
  const [search, setSearch] = useState(true);

  const [drop, setDrop] = useState(false);
  useEffect(() => {
    openNav || openCart
      ? document.querySelector(".deflultLayout")?.classList.add("hide")
      : document.querySelector(".deflultLayout")?.classList.remove("hide");
  }, [openNav, openCart]);
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
            <Col xs={0} sm={0} md={6}>
              <div className={css.logo}>
                <Link href={"/"}>
                  <img
                    src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/12/logo.png"
                    className={css.img}
                  ></img>
                </Link>
              </div>
            </Col>
            <Col span={0} md={{ span: 18, offset: 0 }}>
              <div className={css.itemIcon}>
                <div
                  className={[css.searchContainer, search && css.active].join(
                    " "
                  )}
                >
                  <input
                    className={[css.searchInout, cssD.boxInput].join(" ")}
                  ></input>
                </div>
                <ul style={{ margin: 0, display: "flex" }}>
                  <li onClick={() => setSearch((pr) => !pr)}>
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
                    <Link href={"/cart"}>
                      <p
                        style={{
                          marginLeft: "10px",
                          fontWeight: 600,
                          display: "inline-block",
                          lineHeight: "32px",
                        }}
                      >
                        1 tỷ cmn đồng .đ
                        <span className={css.cartIcon}>
                          <strong className={css.itemOnCart}>0</strong>
                        </span>
                      </p>
                    </Link>
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
          <div className={[css.contentMenu, css.navq].join(" ")}>
            <div className={css.searchBox}>
              <div className={cssF.containerInput} style={{ height: "35px" }}>
                <input placeholder="Tìm kiếm ..." className={css.input}></input>
                <div
                  className={cssF.icon}
                  style={{
                    width: "35px",
                    backgroundColor: "#cbba9c",
                    padding: "0",
                  }}
                >
                  <FaSearch
                    size={18}
                    color="white"
                    style={{ width: "100%" }}
                    className={cssF.iconSend}
                  ></FaSearch>
                </div>
              </div>
            </div>
            <ul className={css.menuList}>
              <li>
                <Link href={"/"}>Trang chủ</Link>
              </li>
              <li>
                <Link href={"/category/hot"}>Sản phẩm Hot</Link>
              </li>
              <li>
                <Link href={"/category/sale"}>Sale</Link>
              </li>
              <li>
                <Link href={"/category/woman"}>Đồng hồ nữ</Link>
              </li>
              <li>
                <Link href={"/category/man"}>Đồng hồ nam</Link>
              </li>
              <li
                style={{ position: "relative" }}
                className={drop ? css.active : ""}
              >
                BRANDS{" "}
                <div
                  className={css.iconDropDown}
                  onClick={() => setDrop((pr) => !pr)}
                >
                  <BsChevronDown
                    className={[css.iconDown, drop && css.turn].join(" ")}
                    size={20}
                    style={{ float: "right" }}
                  ></BsChevronDown>
                </div>
              </li>
              {drop && (
                <div className={css.subMenu}>
                  <div>
                    <Link href={"/category/citizen"}>citizen</Link>
                  </div>
                  <div>
                    <Link href={"/category/rolex"}>rolex</Link>
                  </div>
                  <div>
                    <Link href={"/category/casio"}>casio</Link>
                  </div>
                </div>
              )}
              <li>
                <Link href={"/contact"}>Liên hệ</Link>
              </li>
              <li>
                <Link href={"/introduce"}>Giới thiệu</Link>
              </li>
              <li>Đăng nhập</li>
              <li>
                <p>
                  <a href="tel:+4733378901">HOTLINE: 076 922 0162</a>
                </p>
              </li>
            </ul>
          </div>
        </>
      )}
      {openCart && (
        <>
          <div
            className={css.coverLayout}
            onClick={() => setOpenCart(false)}
          ></div>
          <div className={[css.contentMenu, css.cart].join(" ")}>
            <div className={css.cartContainer}>
              <h1>Giỏ Hàng</h1>
              <div
                className={cssO.driver}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "30px",
                }}
              ></div>
              {onCart ? (
                <div className={css.listItem}>
                  <div className={css.itemContent}>
                    <img
                      src="http://mauweb.monamedia.net/rolex/wp-content/uploads/2018/11/29-480x480.jpg"
                      className={css.imgItem}
                    ></img>
                    <div className={css.itemDecript}>
                      CARTIER W6920071 BALLON BLEU DE CERTIER WATCH 33MM
                      <div className={css.price}>
                        <span className={css.quantity}>
                          1 ×{" "}
                          <span style={{ fontSize: "13px" }}>
                            156,980,000&nbsp;
                            <span>₫</span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className={css.deleteBtn}>
                      <span>x</span>
                    </div>
                  </div>
                  <div className={css.itemContent}>
                    <img
                      src="http://mauweb.monamedia.net/rolex/wp-content/uploads/2018/11/29-480x480.jpg"
                      className={css.imgItem}
                    ></img>
                    <div className={css.itemDecript}>
                      CARTIER W6920071 BALLON BLEU DE CERTIER WATCH 33MM
                      <div className={css.price}>
                        <span className={css.quantity}>
                          1 ×{" "}
                          <span style={{ fontSize: "13px" }}>
                            156,980,000&nbsp;
                            <span>₫</span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className={css.deleteBtn}>
                      <span>x</span>
                    </div>
                  </div>
                  <div className={css.totalPrice}>
                    <p>
                      <strong>Tổng phụ:</strong>{" "}
                      <span>
                        168,070,000&nbsp;
                        <span>₫</span>
                      </span>
                    </p>
                  </div>
                  <div className={css.checkoutContainer}>
                    <div className={css.SeeCart}>Xem giỏ hàng</div>
                    <div className={css.checkOut}>Thanh toán</div>
                  </div>
                </div>
              ) : (
                <div>Chưa có sản phẩm trong giỏ hàng.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
