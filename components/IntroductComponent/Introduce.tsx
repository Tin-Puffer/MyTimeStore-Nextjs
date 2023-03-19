import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssC from "../ContactComponent/contentStyle.module.scss";
import css from "./introduceStyle.module.scss";
import { Col, Row } from "antd";
import { FaGitlab } from "react-icons/fa";
import { HeaderContact } from "../ContactComponent";
import {
  contact,
  slider3,
  introduct1,
  introduct2,
  introduct3,
  introduct4,
} from "../../public/staticImage";

export function Introduct() {
  return (
    <div className={css.container}>
      <HeaderContact img={contact.src} page="giới thiệu"></HeaderContact>
      <div className={cssP.gridPoduct} style={{ marginTop: "50px" }}>
        <Col xs={18} md={10} lg={10} style={{ margin: "auto   " }}>
          <div className={css.lableHeader}>
            <h3
              className={cssC.titleContact}
              style={{ fontSize: "40px", paddingBottom: "1em", margin: 0 }}
            >
              MY TIME STORE
              <FaGitlab size={24} className={cssC.iconGitlab}></FaGitlab>
            </h3>
            <p className={css.decripTitle}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh.

            </p>
          </div>
        </Col>
        <Row style={{ marginBottom: "50px" }}>
          <Col xs={24} md={6}>
            <div className={css.colContainer}>
              <div className={css.contentDR}>
                <div className={css.content}>
                  <div
                    className={css.imgContent}
                    style={{ backgroundImage: `url(${introduct1.src})` }}
                  ></div>
                  <h2>Kính Sapphire</h2>
                  <p>
                    Là loại kính có độ bền cao, chống xước tuyệt đối, thường
                    được sử dụng trong các thương hiệu cao cấp.
                  </p>
                </div>
                <div style={{ padding: "30px" }}></div>

                <div className={css.content}>
                  <div
                    className={css.imgContent}
                    style={{
                      backgroundImage: `url(${introduct3.src})`,
                    }}
                  ></div>
                  <h2>Chống nước 5ATM</h2>
                  <p>
                    Gia công lắp ráp hoàn hảo, giúp bảo vệ đồng hồ một cách tối
                    ưu, chịu được áp lực nước ở cấp độ 5ATM..
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className={css.colContainer}>
              <div
                className={css.img}
                style={{ backgroundImage: `url(${slider3.src})` }}
              ></div>
            </div>
          </Col>
          <Col xs={24} md={6}>
            <div className={css.colContainer}>
              <div className={css.contentDR}>
                <div className={css.content}>
                  <div
                    className={css.imgContent}
                    style={{
                      backgroundImage: `url(${introduct2.src})`,
                    }}
                  ></div>
                  <h2>Máy Miyota</h2>
                  <p>
                    Cỗ máy kiểm soát thời gian hoạt động mạnh mẽ và chính xác,
                    thương hiệu nổi danh trên toàn thế giới..
                  </p>
                </div>
                <div style={{ padding: "30px" }}></div>
                <div className={css.content}>
                  <div
                    className={css.imgContent}
                    style={{
                      backgroundImage: `url(${introduct4.src})`,
                    }}
                  ></div>
                  <h2>thiết kế cổ điển </h2>
                  <p>
                    Sản phẩm được thiết kế cổ điển số lượng có hạn , và được bào
                    hành trọn đời.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
