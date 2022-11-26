import { Col, Row } from "antd";
import { Product } from "../Poduct";
import css from "./HomeProductStyle.module.scss";

export function HomeProduct() {
  const x = [1, 2, 3, 4, 5, 6];
  return (
    <div className={css.container}>
      <div className={css.title}>
        <p>360° COLLECTION</p>
      </div>
      <div className={css.lable}>
        <p>FEATURED</p> <p>PRODUCTS</p>
      </div>
      <div className={css.gridPoduct}>
        <Row gutter={[40, 45]}>
          {x.map((e, i) => (
            <div key={i}>
              <Col xs={24} sm={12} lg={8}>
                <Product></Product>
              </Col>
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
}
