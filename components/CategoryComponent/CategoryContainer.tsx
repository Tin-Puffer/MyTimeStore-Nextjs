import { Col, Row } from "antd";
import css from "./ContainerStyle.module.scss";
import cssT from "./TitleStyle.module.scss";

export function CategoryContainer() {
  return (
    <div className={cssT.container}>
      <Row gutter={[20, 16]}>
        <Col xs={0} sm={0} md={6}>
          <aside className={css.wide}>
            <span className={css.title}>Danh mục sản phẩm</span>
            <ul className={css.product_categories}>
              <li>Casio</li>
              <li>Citizen</li>
              <li>Đồng hồ cặp đôi</li>
              <li>Đồng hồ nam</li>
              <li>Đồng hồ nữ</li>
              <li>ROLEX</li>
              <li>Sale</li>
              <li>Sản phẩm Hot</li>
            </ul>
          </aside>
          <aside className={css.wide}>
            <span className={css.title}>LỌC THEO GIÁ</span>
            
          </aside>
        </Col>
        <Col xs={24} sm={24} md={18}>
          day la grid
        </Col>
      </Row>
    </div>
  );
}
