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
                <Link href={"/category/hot"}>
                  <p>sản phẩm hot</p>
                </Link>
              </li>
              <li>
                <Link href={"/category/sale"}>
                  <p>sale</p>
                </Link>
              </li>
              <li>
                <Link href={"/category/woman"}>
                  <p>đồng hồ nữ</p>
                </Link>
              </li>
              <li>
                <Link href={"/category/man"}>
                  <p>đồng hồ nam</p>
                </Link>
              </li>
              <li>
                <div className={css.dropDown}>
                  <p>brands ★ </p>
                  <div className={css.DownItem}>
                    <ul>
                      <Link href={"/category/citizen"}>
                        <li>CITIZEN</li>
                      </Link>
                      <li>
                        <Link href={"/category/rolex"}>ROLEX</Link>
                      </li>
                      <li>
                        <Link href={"/category/casio"}>CASIO</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <Link href={"/contact"}>
                  <p>liên hệ</p>
                </Link>
              </li>
              <li>
                <Link href={"/introduce"}>
                  <p>giới thiệu</p>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </div>
    </>
  );
}
