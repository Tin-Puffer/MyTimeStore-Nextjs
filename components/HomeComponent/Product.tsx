import { Col, Row } from "antd";
import Link from "next/link";
import { Product } from "../Poduct";
import css from "./ProductStyle.module.scss";

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
        {/* style={{ width: "100%", margin: "0" }} */}
        <Row gutter={[40, 45]} className={css.rowSet}>
          {x.map((e, i) => (
            <Col key={i} xs={24} sm={12} lg={8}>
             
                <Product></Product>
              
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
