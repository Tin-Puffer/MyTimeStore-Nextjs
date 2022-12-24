import { Col, Row } from "antd";
import { AiFillTag } from "react-icons/ai";
import { QuantityComponent } from "../DetailProductComponent";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";

import css from "./cartStyle.module.scss";
import Link from "next/link";

export function CartDetail() {
  return (
    <div className={css.cartContainer}>
      <div className={cssP.gridPoduct} style={{ marginTop: "40px" }}>
        <Row className={css.payContent}>
          <Col xs={24} sm={24} lg={14} className={css.line}>
            <div className={css.mainItem}>
              <table cellSpacing={0}>
                <thead>
                  <tr className={css.titleTable}>
                    <th colSpan={3}>Sản phẩm</th>
                    <th className={css.hide}>Giá</th>
                    <th>Số lượng</th>
                    <th className={css.hide}>Tổng</th>
                  </tr>
                </thead>
                <tbody className={css.tabBody}>
                  <tr className={css.cartItem}>
                    <td>
                      <span className={css.delete}>x</span>{" "}
                    </td>
                    <td>
                      <img
                        style={{ width: "80px", height: "80px" }}
                        src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/11/5-480x480.jpg"
                      />
                    </td>
                    <td>
                      <span className={css.nameProduct}>
                        FOSSIL ME3104 TOWNSMAN AUTOMATIC LEATHER WATCH 44MM
                      </span>{" "}
                      <p className={css.extraPrice}>
                        <span>1 x </span>
                        <span className={css.price}>
                          423,150,000&nbsp;
                          <span>₫</span>
                        </span>{" "}
                      </p>
                    </td>

                    <td className={css.hide}>
                      <span className={css.price}>
                        5,800,000&nbsp;
                        <span>₫</span>
                      </span>{" "}
                    </td>
                    <td>
                      <QuantityComponent small={true}></QuantityComponent>
                    </td>
                    <td className={css.hide}>
                      <span className={css.price}>
                        46,400,000&nbsp;
                        <span>₫</span>
                      </span>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6} className={css.bntProduct}>
                      <div>
                        <span className={css.continueShop}>
                          ← Tiếp tục xem sản phẩm{" "}
                        </span>
                        <div
                          className={cssS.button}
                          style={{ fontSize: "18px" }}
                        >
                          <p style={{ padding: "8px 18px" }}>
                            CẬP NHẬT GIỎ HÀNG
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>

          <Col xs={24} sm={24} lg={10}>
            <div className={css.mainItem}>
              <table cellSpacing={0} className={css.lableTable}>
                <thead>
                  <tr className={css.titleTable}>
                    <th colSpan={2}>Tổng số lượng</th>
                  </tr>
                </thead>
              </table>
              <table>
                <tbody className={css.tabBody}>
                  <tr className={css.cartItem}>
                    <td>Tổng phụ</td>
                    <td className={css.payRight}>
                      <span className={css.price}>
                        469,550,000&nbsp;
                        <span>₫</span>
                      </span>
                    </td>
                  </tr>
                  <tr className={css.cartItem}>
                    <td>Giao hàng</td>
                    <td className={css.payRight}>
                      <p>Giao hàng miễn phí</p>
                      <p>
                        Ước tính cho <strong>Áo</strong>.{" "}
                      </p>
                      <p>Đổi địa chỉ</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Tổng</td>
                    <td className={css.payRight}>
                      <span className={css.price}>
                        469,550,000&nbsp;
                        <span>₫</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Link href={"/checkout"}>
                        <div
                          className={cssS.button}
                          style={{
                            marginTop: "15px",
                            fontSize: "18px",
                            backgroundColor: "#d26e4b",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <p
                            style={{
                              padding: "11px 18px",
                              textTransform: "uppercase",
                            }}
                          >
                            Tiến hành thanh toán
                          </p>
                        </div>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className={css.FromDiscount}>
                        <div>
                          <h3>
                            {" "}
                            <AiFillTag
                              className={css.tag}
                              size={20}
                            ></AiFillTag>
                            Phiếu ưu đãi
                          </h3>
                          <input
                            className={[css.inputDiscount, cssD.boxInput].join(
                              " "
                            )}
                            type="text"
                            placeholder="Mã ưu đãi"
                          />{" "}
                          <input
                            className={css.btnGray}
                            type="submit"
                            value="Áp dụng"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
