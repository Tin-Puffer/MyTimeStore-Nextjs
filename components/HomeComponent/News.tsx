import { Col, Row } from "antd";
import cssH from "./ProductStyle.module.scss";
import css from "./NewsStyle.module.scss";

export function HomeNews() {
  return (
    <div className={cssH.container} style={{ backgroundColor: "#fafafa",paddingBottom:"60px" }}>
      <div className={cssH.gridPoduct}>
        <div style={{ padding: "0 30px" }}>
          <Row gutter={[32, 16]}>
            <Col xs={24} sm={8}>
              <div className={css.itemContainer}>
                <div className={css.img_content}>
                  <div className={css.img}></div>
                </div>
                <h1>Chronograph 100M</h1>
                <h2>Timers Villa</h2>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className={css.itemContainer}>
                <div className={css.img_content}>
                  <div
                    className={css.img}
                    style={{
                      backgroundImage:
                        "url(https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/12/Collection-1.jpg)",
                    }}
                  ></div>
                </div>
                <h1>Chronograph 100M</h1>
                <h2>Timers Villa</h2>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className={css.itemContainer}>
                <div className={css.img_content}>
                  <div
                    className={css.img}
                    style={{
                      backgroundImage:
                        "url(https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/12/collection-3_830c84fe-6697-4a25-9215-2821602a0c3b.jpg)",
                    }}
                  ></div>
                </div>
                <h1>Chronograph 100M</h1>
                <h2>Timers Villa</h2>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
