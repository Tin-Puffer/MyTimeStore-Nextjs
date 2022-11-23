import css from "./DfHeaderNav.module.scss";
import { Secular_One } from "@next/font/google";
import { Col, Row } from "antd";
import { useEffect } from "react";

export function DfHeaderNav() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (typeof window !== "undefined") {
        console.log(window.scrollY);
        let hes = document.querySelector(".navContent");
        hes?.classList.toggle("sticky", window.scrollY > 100);
      }
    });
    return window.removeEventListener("scroll", () => {});
  }, []);
  return (
    <>
      <div className={[css.container, "navContent"].join(" ")}>
        <Col xs={0} md={24}>
          <div className={css.content}>
            <ul className={css.category}>
              <li className={css.active}>
                <p>trang chủ</p>
              </li>
              <li>
                <p>sản phẩm hot</p>
              </li>
              <li>
                <p>sale</p>
              </li>
              <li>
                <p>đồng hồ nữ</p>
              </li>
              <li>
                <p>đồng hồ nam</p>
              </li>
              <li>
                <p>brands</p>
              </li>
              <li>
                <p>giới thiệu</p>
              </li>
            </ul>
          </div>
        </Col>
      </div>
      <div style={{ height: "2000px" }}></div>
    </>
  );
}
