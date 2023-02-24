import css from "./DfHeaderNav.module.scss";

import { Col } from "antd";
import { useEffect } from "react";
import Link from "next/link";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { Type } = router.query;

  return (
    <>
      <div className={[css.container, "navContent"].join(" ")}>
        <Col xs={0} md={24}>
          <div className={css.content}>
            <ul className={css.category}>
              <li className={router.pathname == "/" ? css.active : ""}>
                <Link href={"/"}>
                  <p>trang chủ</p>
                </Link>
              </li>
              <li className={Type == "hot" ? css.active : ""}>
                <Link href={"/category/hot"}>
                  <p>sản phẩm hot</p>
                </Link>
              </li>
              <li className={Type == "sale" ? css.active : ""}>
                <Link href={"/category/sale"}>
                  <p>sale</p>
                </Link>
              </li>
              <li className={Type == "woman" ? css.active : ""}>
                <Link href={"/category/woman"}>
                  <p>đồng hồ nữ</p>
                </Link>
              </li>
              <li className={Type == "man" ? css.active : ""}>
                <Link href={"/category/man"}>
                  <p>đồng hồ nam</p>
                </Link>
              </li>
              <li>
                <div className={css.dropDown}>
                  <div>
                    <p>brands </p>
                    <div className={css.downIcon}>
                      <AiOutlineCaretDown size={15}></AiOutlineCaretDown>{" "}
                    </div>
                  </div>
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
