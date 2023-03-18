import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import css from "./DecriptionStyle.module.scss";
import cssC from "../CartComponent/cartStyle.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Avatar, Col, Rate, Row } from "antd";
import { product, review } from "../../common/product/interface";
import { useAppSelector } from "../../app/Hook";
import {
  getCurrentDateTime,
  ProductHomeAPI,
} from "../../pages/api/productAPI/Home";
import openNotification from "../Notifycation/Notification";

export function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();

  const timeDiff = now.getTime() - date.getTime();

  if (timeDiff > 365 * 24 * 60 * 60 * 1000) {
    return (
      "khoảng " +
      Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000)) +
      " năm trước"
    );
  } else if (timeDiff > 24 * 60 * 60 * 1000) {
    return (
      "khoảng " + Math.floor(timeDiff / (24 * 60 * 60 * 1000)) + " ngày trước"
    );
  } else if (timeDiff > 60 * 60 * 1000) {
    return "khoảng " + Math.floor(timeDiff / (60 * 60 * 1000)) + " giờ trước";
  } else if (timeDiff > 60 * 1000) {
    return "khoảng " + Math.floor(timeDiff / (60 * 1000)) + " phút trước";
  } else {
    return "khoảng vài giây trước";
  }
}
export function CommentItem({ item }: { item: review }) {
  const [time, setTime] = useState(timeAgo(item.Time));
  useEffect(() => {
    setTime(timeAgo(item.Time));
  }, [time]);
  useEffect(() => {
    const timeOut = setInterval(() => {
      setTime(timeAgo(item.Time));
    }, 300000);
    return () => clearInterval(timeOut);
  }, []);
  return (
    <div className={css.commentUser}>
      <div className={css.avataBox}>
        <Avatar size={45} src={item.avatar} className={css.avataUser} />
      </div>
      <div style={{ width: "100%" }}>
        <span className={css.nameUser}>{item.name}</span>
        <Rate className={css.startRateCmt} disabled value={item.rating} />
        <div className={css.binhluan}>
          <p>{item.message}</p>
        </div>
        <div className={css.feedBack}>
          {/* <div className={css.like}>
            {item.like} <BiLike></BiLike>
          </div>
          <div className={css.disLike}>
            {item.disLike} <BiDislike></BiDislike>
          </div> */}
          <span style={{ marginRight: "20px" }}>{time}</span>

          <ins>Reply</ins>
        </div>
      </div>
    </div>
  );
}
export function ProductDecription({ product }: { product: product }) {
  const [active, setActive] = useState(true);
  const islogin = useAppSelector((state) => state.auth.isLogin);
  const user = useAppSelector((state) => state.auth.currentUser);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [productDeltail, setProductDeltail] = useState<product>(product);
  const [loading, setLoading] = useState(false);
  const updateOrAddReviewByUid = (newReview: review) => {
    const reviewIndex = productDeltail.review.findIndex(
      (review) => review.uid === user?.uid
    );

    if (reviewIndex !== -1) {
      setProductDeltail((pr) => ({
        ...pr,
        review: [
          ...pr.review.slice(0, reviewIndex),
          newReview,
          ...pr.review.slice(reviewIndex + 1),
        ],
      }));
    } else {
      setProductDeltail((pr) => ({
        ...pr,
        review: [...pr.review, newReview],
      }));
    }
  };
  const handleComment = async () => {
    if (islogin && user && !loading) {
      setLoading(true);
      const oldComment =
        productDeltail.review?.length > 0 &&
        productDeltail.review?.find((e) => e.uid === user.uid);
      const alowComent = await ProductHomeAPI.alowComment(
        productDeltail.id,
        user.uid
      );
      console.log(alowComent);
      const reviewItem: review = {
        avatar: user.avatar,
        message: message,
        rating: rating,
        name: user.name,
        Time: getCurrentDateTime(),
        uid: user.uid,
      };
      if (alowComent) {
        await ProductHomeAPI.addComment(
          productDeltail.id,
          reviewItem,
          oldComment
        );
        updateOrAddReviewByUid(reviewItem);
        setMessage("");
        openNotification("ReviewSuccess");
      } else
        openNotification(
          "notiifyError",
          "Need to test the product before rating"
        );
      setLoading(false);
    } else
      openNotification("notiifyWanning", "Log in before performing the action");
  };
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
            ĐÁNH GIÁ ({productDeltail.review ? productDeltail.review.length : 0}
            )
          </li>
        </ul>
        <div className={css.contentDectipt}>
          {active && (
            <div className={css.tabDectript}>
              <div className={css.decript}>{productDeltail.decription}</div>
              <Row gutter={[50, 40]}>
                <Col xs={24} md={12}>
                  <h1>NGUỒN GỐC VÀ THÔNG SỐ SẢN PHẨM</h1>
                  <table style={{ width: "100%" }}>
                    <tbody className={cssC.tabBody}>
                      <tr className={cssC.cartItem}>
                        <td>Thương Hiệu</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.trademark}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Kiểu máy</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.productLine}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Mã sản phẩm</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.code}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Giới tính</td>
                        <td className={cssC.payRight}>
                          <span>
                            {productDeltail.figures.sex ? "Nam" : "Nữ"}
                          </span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Loại sản phẩm</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.productLine}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Đường kính mặt</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.diameter}</span>
                        </td>
                      </tr>
                      <tr className={cssC.cartItem}>
                        <td>Chiều dày</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.lenght}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Chất liệu vỏ</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.caseMaterial}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Chất liệu dây</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.brandMaterial}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Chất liệu mặt kính</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.glasessMaterial}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Độ chịu nước</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.ATm}</span>
                        </td>
                      </tr>{" "}
                      <tr className={cssC.cartItem}>
                        <td>Bảo hành</td>
                        <td className={cssC.payRight}>
                          <span>{productDeltail.figures.insurance}</span>
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
                {productDeltail.review ? (
                  <>
                    {productDeltail.review.map((e, i) => (
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
                <Rate
                  onChange={(value: number) => setRating(value)}
                  defaultValue={5}
                  className={css.startRate}
                ></Rate>
                <div className={css.comment}>
                  <h2>
                    Nhận xét của bạn&nbsp;<span>*</span>
                  </h2>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={[css.areaComent, css.boxInput].join(" ")}
                    cols={45}
                    rows={8}
                  ></textarea>
                </div>
                <div className={cssS.button} style={{ fontSize: "18px" }}>
                  <p style={{ padding: "8px 18px" }} onClick={handleComment}>
                    {loading ? (
                      <div>
                        Loading...
                        <LoadingOutlined />
                      </div>
                    ) : (
                      "Gửi Đi"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
