import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import css from "./DecriptionStyle.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Avatar, Rate } from "antd";
import { BiDislike, BiLike } from "react-icons/bi";

export function CommentItem(){
    return (
      <div className={css.commentUser}>
        <div className={css.avataBox}>
          <Avatar size={60} icon={<UserOutlined />} className={css.avataUser} />
        </div>
        <div style={{ width: "100%" }}>
          <span className={css.nameUser}>Joe Biden</span>
          <Rate className={css.startRate} disabled defaultValue={2} />
          <div className={css.binhluan}>
            <p>
              Steel case, fluted crown decorated with a synthetic spinel
              cabochon, silvered guilloché opaline dial, Roman
              numerals,áđádsfsdfsdfsdf
            </p>
          </div>
          <div className={css.feedBack}>
            <div className={css.like}>
              120 <BiLike></BiLike>
            </div>
            <div className={css.disLike}>
              12 <BiDislike></BiDislike>
            </div>
            <ins>Reply</ins>
          </div>
        </div>
      </div>
    );
}
export function ProductDecription() {
  const [active, setActive] = useState(false);
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
            ĐÁNH GIÁ (1)
          </li>
        </ul>
        <div className={css.contentDectipt}>
          {active && (
            <div className={css.tabDectript}>
              <div className={css.decript}>
                Floating like a balloon and as blue as the cabochon safely
                nestled in its side, the Ballon Bleu watch by Cartier adds a
                dash of elegance to male and female wrists alike. Roman numerals
                are guided on their path by a deep blue winding mechanism. With
                the convex curves of the case, guilloché dial, sword-shaped
                hands, and polished or satin-finish links of the bracelet…the
                Ballon Bleu watch by Cartier floats through the world of Cartier
                watchmaking.
              </div>
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
                <li>Water-resistant to 3 bar (approx. 30 meters/100 feet).</li>
              </ul>
            </div>
          )}
          {!active && (
            <div className={css.featBack}>
              <div className={css.content}>
                <h3>Đánh giá</h3>
                {/* <p>Chưa có đánh giá nào.</p> */}
                <CommentItem/>
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
