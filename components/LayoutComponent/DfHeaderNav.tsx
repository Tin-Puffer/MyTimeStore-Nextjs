import css from "./DfHeaderNav.module.scss";

import { Col, Row } from "antd";
import { useEffect } from "react";
import Link from "next/link";

export function DfHeaderNav() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (typeof window !== "undefined") {
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
                <Link href={"/"}>
                  <p>trang chủ</p>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/category/Hot",
                  }}
                >
                  <p>sản phẩm hot</p>
                </Link>
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
                <div className={css.dropDown}>
                  <p>brands ★ </p>

                  <div className={css.DownItem}>
                    <ul>
                      <li>CITIZEN</li>
                      <li>ROLEX</li>
                      <li>CASIO</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/contact",
                  }}
                >
                  <p>liên hệ</p>
                </Link>
              </li>
              <li>
                <p>giới thiệu</p>
              </li>
            </ul>
          </div>
        </Col>
      </div>
    </>
  );
}
