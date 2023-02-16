import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import css from "./DecriptionStyle.module.scss";
import cssC from "../CartComponent/cartStyle.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Avatar, Col, Rate, Row } from "antd";
import { BiDislike, BiLike } from "react-icons/bi";
import { product, review } from "../../common/product/interface";

export function CommentItem({ item }: { item: review }) {
  return (
    <div className={css.commentUser}>
      <div className={css.avataBox}>
        <Avatar size={45} src={item.avatar} className={css.avataUser} />
      </div>
      <div style={{ width: "100%" }}>
        <span className={css.nameUser}>{item.name}</span>
        <Rate
          className={css.startRateCmt}
          disabled
          defaultValue={item.rating}
        />
        <div className={css.binhluan}>
          <p>{item.message}</p>
        </div>
        <div className={css.feedBack}>
          <div className={css.like}>
            {item.like} <BiLike></BiLike>
          </div>
          <div className={css.disLike}>
            {item.disLike} <BiDislike></BiDislike>
          </div>
          <ins>Reply</ins>
        </div>
      </div>
    </div>
  );
}
export function ProductDecription({ product }: { product: product }) {
  const [active, setActive] = useState(true);
  return (
    <div className={cssP.gridPoduct} style={{ marginTop: "40px" }}>
      <div className={css.decriptionContainter}>
        <ul className={css.bntDecrip}>
          <li
            onClick={() => setActive(true)}
            className={[css.mota, active && css.active].join(" ")}
          >
            MÔ TẢ
          </li>
          <li
            onClick={() => setActive(false)}
            className={[css.danhgia, !active && css.active].join(" ")}
          >
            ĐÁNH GIÁ ({product.review ? product.review.length : 0})
          </li>
        </ul>
        <div className={css.contentDectipt}>
          {active && (
            <div className={css.tabDectript}>
              <div className={css.decript}>{product.decription}</div>
              <Row gutter={[50, 40]}>
                <Col xs={24} md={12}>
                  <h1>NGUỒN GỐC VÀ THÔNG SỐ SẢN PHẨM</h1>
                  <table style={{ width: "100%" }}>
                    <tbody className={cssC.tabBody}>
                      <tr className={cssC.cartItem}>
                        <td>Thương Hiệu</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.trademark}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Kiểu máy</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.productLine}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Mã sản phẩm</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.code}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Giới tính</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.sex ? "Nam" : "Nữ"}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Loại sản phẩm</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.productLine}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Đường kính mặt</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.diameter}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Chiều dày</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.lenght}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Chất liệu vỏ</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.caseMaterial}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Chất liệu dây</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.brandMaterial}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Chất liệu mặt kính</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.glasessMaterial}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Độ chịu nước</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.ATm}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Bảo hành</td>
                        <td className={cssC.payRight}>
                          <span>{product.figures.insurance}</span>
                        </td>
                      </tr>{" "}
                    </tbody>
                  </table>
                </Col>
                <Col xs={24} md={12}>
                  <h1>THÔNG TIN BỔ SUNG</h1>
                  <ul className={css.future}>
                    <li>Ballon Bleu de Cartier watch.</li>
                    <li>Mechanical movement with automatic winding.</li>
                    <li>
                      Steel case, fluted crown decorated with a synthetic spinel
                      cabochon, silvered guilloché opaline dial, Roman numerals,
                      blued-steel sword-shaped hands.
                    </li>
                    <li>Sapphire crystal.</li>
                    <li>Steel bracelet.</li>
                    <li>Case dimensions diameter: 33 mm.</li>
                    <li>Thickness: 9.96 mm.</li>
                    <li>
                      Water-resistant to 3 bar (approx. 30 meters/100 feet).
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          )}
          {!active && (
            <div className={css.featBack}>
              <div className={css.content}>
                <h3>Đánh giá</h3>
                {product.review ? (
                  <>
                    {product.review.map((e, i) => (
                      <CommentItem key={i} item={e} />
                    ))}
                  </>
                ) : (
                  <p>Chưa có đánh giá nào.</p>
                )}
              </div>
              <div className={css.reviewBox}>
                <h3>
                  Nhận xét “BULOVA CORPORATION AUTOMATIC MENS WATCH 49MM”{" "}
                </h3>
                <h4 style={{ marginBottom: "10px" }}>Đánh giá của bạn</h4>
                <Rate className={css.startRate}></Rate>
                <div className={css.comment}>
                  <h2>
                    Nhận xét của bạn&nbsp;<span>*</span>
                  </h2>
                  <textarea
                    className={[css.areaComent, css.boxInput].join(" ")}
                    cols={45}
                    rows={8}
                  ></textarea>
                </div>
                <div className={cssS.button} style={{ fontSize: "18px" }}>
                  <p style={{ padding: "8px 18px" }}>GỬI ĐI</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
