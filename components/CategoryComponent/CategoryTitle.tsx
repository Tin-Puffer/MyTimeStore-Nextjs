import css from "./TitleStyle.module.scss";
import cssDF from "../LayoutComponent/DfHeaderLogo.module.scss";
import { Col, Row } from "antd";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { CategoryLeft } from "./CategoryContainer";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../app/Hook";
import { filterAction } from "../../app/splice/categoryFilterSlipe";
import { product } from "../../common/product/interface";

export function CategoryTitle({ interest }: { interest: product[] }) {
  const [filter, setFilter] = useState(false);
  const router = useRouter();
  const dispach = useAppDispatch();
  const handleSelectOder = (value: any) => {
    dispach(filterAction.setSort(Number(value.target.value)));
  };
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
            <span onClick={() => router.push("/")}>TRANG CHU /</span>
            <span className={css.Crpage}>
              {router.query.value
                ? router.query.Type + " : " + router.query.value
                : router.query.Type}
            </span>
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

            <select
              name="orderby"
              className={css.selectBox}
              onChange={handleSelectOder}
            >
              <option value={1}>Thứ tự mặc định</option>
              <option value={2}>Thứ tự theo mức độ phổ biến</option>
              <option value={3}>Thứ tự theo giá: thấp đến cao</option>
              <option value={4}>Thứ tự theo giá: cao xuống thấp</option>
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
        <div className={cssDF.cartContainer} style={{ padding: "0px" }}>
          <div className={css.menuSelect}>
            <CategoryLeft interest={interest}></CategoryLeft>
          </div>
        </div>
      </div>
    </div>
  );
}
