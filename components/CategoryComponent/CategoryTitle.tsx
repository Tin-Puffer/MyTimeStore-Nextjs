import { Col, Row, Select } from "antd";
import css from "./TitleStyle.module.scss";
import cssDF from "../LayoutComponent/DfHeaderLogo.module.scss";

import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { CategoryContainer, CategoryLeft } from "./CategoryContainer";

export function CategoryTitle() {
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    filter
      ? document.querySelector(".deflultLayout")?.classList.add("hide")
      : document.querySelector(".deflultLayout")?.classList.remove("hide");
  }, [filter]);
  return (
    <div className={css.titleContainer}>
      <Row className={css.container}>
        <Col style={{ alignItems: "center" }}>
          <div className={css.BreadCrumb}>
            TRANG CHU / <span className={css.Crpage}>SAN PHAM HOT</span>
          </div>
        </Col>
        <Col xs={24} md={24} lg={0}>
          <div className={[css.menu, filter && css.active].join(" ")}>
            <div className={css.btnSort} onClick={() => setFilter(true)}>
              <FiMenu size={16}></FiMenu>
              <strong>Lọc</strong>
            </div>
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

      <div
        className={[cssDF.coverLayout, filter && cssDF.showCover].join(" ")}
        onClick={() => setFilter(false)}
      ></div>
      <div
        className={[cssDF.contentMenu, cssDF.cart, filter && cssDF.show].join(
          " "
        )}
      >
        <div className={cssDF.cartContainer} style={{padding:"0px"}}>
          <div className={css.menuSelect}>
            <CategoryLeft></CategoryLeft>
          </div>
        </div>
      </div>
    </div>
  );
}
