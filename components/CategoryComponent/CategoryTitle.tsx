import { Col, Row, Select } from "antd";
import css from "./TitleStyle.module.scss";
import cssDF from "../LayoutComponent/DfHeaderLogo.module.scss";

import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { CategoryContainer, CategoryLeft } from "./CategoryContainer";

export function CategoryTitle() {
  const [filter, setFilter] = useState(false);

  return (
    <div className={css.titleContainer}>
      <Row className={css.container}>
        <Col style={{ alignItems: "center" }}>
          <div className={css.BreadCrumb}>
            TRANG CHU / <span className={css.Crpage}>SAN PHAM HOT</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={0}>
          <div
            className={[css.menu, filter && css.active].join(" ")}
            onClick={() => setFilter(true)}
          >
            <FiMenu size={16}></FiMenu>
            <strong>Lọc</strong>
          </div>
        </Col>
        <Col style={{ alignItems: "center" }}>
          <div className={css.rightIiem}>
            <p className={css.titleSort}>Hiển thị một kết quả duy nhất</p>

            <select name="orderby" className={css.selectBox}>
              <option value="menu_order">Thứ tự mặc định</option>
              <option value="popularity">Thứ tự theo mức độ phổ biến</option>
              <option value="rating">Thứ tự theo điểm đánh giá</option>
              <option value="date">Mới nhất</option>
              <option value="price">Thứ tự theo giá: thấp đến cao</option>
              <option value="price-desc">
                Thứ tự theo giá: cao xuống thấp
              </option>
            </select>
          </div>
        </Col>
      </Row>
      {filter && (
        <>
          <div
            className={cssDF.coverLayout}
            onClick={() => setFilter(false)}
          ></div>
          <div className={[cssDF.contentMenu, cssDF.cart].join(" ")}>
            <div className={cssDF.cartContainer}>
              <CategoryLeft></CategoryLeft>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
