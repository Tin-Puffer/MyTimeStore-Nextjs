import { Col, Row } from "antd";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import cssC from "../CategoryComponent/ContainerStyle.module.scss";

import css from "./newsStyle.module.scss";
import { SearchNews } from "./Search";
export function NewsItem() {
  return (
    <div className={cssC.itemContainer}>
      <div className={css.item}>
        <div style={{ position: "relative" }}></div>
        <div className={css.BgcContaniner}>
          <div className={css.bgcNEw}></div>
        </div>
        <div className={css.datePost}>
          <div className={css.contenPost}>
            <p>03</p>
            <p>Th12</p>
          </div>
        </div>
        <div className={css.decContainer}>
          <h5>Aerolithe Performance Titanium Watch</h5>
          <div className={cssS.driver}></div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore ...{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
export function News() {
  return (
    <div className={css.container}>
      <div className={cssP.gridPoduct} style={{ marginTop: "30px" }}>
        <div className={css.titlePage}>
          <p> Tin tức</p>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <Row>
            <Col xs={24} sm={24} md={6} className={css.changeOder}>
              <div className={css.itemContainer}>
                <SearchNews></SearchNews>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={18}
              style={{ borderLeft: " 1px solid #ececec" }}
            >
              <div className={css.itemContainer}>
                <Row gutter={[30, 20]}>
                  <Col xs={24} sm={24} md={8}>
                    <NewsItem />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <NewsItem />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <NewsItem />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <NewsItem />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
