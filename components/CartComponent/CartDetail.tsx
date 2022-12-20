import { Col, Row } from "antd";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssD from "../DetailProductComponent/DetailStyle.module.scss";

import css from "./cartStyle.module.scss";

export function CartDetail() {
  return (
    <div className={css.cartContainer}>
      <div className={cssP.gridPoduct} style={{ marginTop: "40px" }}>
        <Row>
          <Col xs={24} sm={24} lg={14}>
            <div className={[css.mainItem, css.product].join(" ")}>
              <table>
                <thead>
                  <tr className={css.titleTable}>
                    <th colSpan={3}>Sản phẩm</th>

                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
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
                    </td>

                    <td>
                      <span className={css.price}>
                        5,800,000&nbsp;
                        <span>₫</span>
                      </span>{" "}
                    </td>
                    <td>
                      <div className={cssD.quantity}>
                        <input
                          type="button"
                          value="-"
                          className={cssD.minus}
                        ></input>
                        <input
                          type="number"
                          defaultValue={1}
                          className={cssD.value}
                        ></input>
                        <input
                          type="button"
                          value="+"
                          className={cssD.plus}
                        ></input>
                      </div>
                    </td>
                    <td>
                      <span className={css.price}>
                        46,400,000&nbsp;
                        <span>₫</span>
                      </span>{" "}
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </Col>
          <Col xs={24} sm={24} lg={10}>
            <div className={css.mainItem}></div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
