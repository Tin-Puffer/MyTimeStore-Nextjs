import css from "./DfHeaderNav.module.scss";

import { Col } from "antd";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useRouter } from "next/router";
import { BranList } from "../../common/constag";

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
  const { Type, value } = router.query;

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
              <li className={value == "woman" ? css.active : ""}>
                <Link href={"/category/gender?value=woman"}>
                  <p>đồng hồ nữ</p>
                </Link>
              </li>
              <li className={value == "man" ? css.active : ""}>
                <Link href={"/category/gender?value=man"}>
                  <p>đồng hồ nam</p>
                </Link>
              </li>
              <li className={value == "couple" ? css.active : ""}>
                <Link href={"/category/gender?value=couple"}>
                  <p>couple</p>
                </Link>
              </li>
              <li className={Type == "brand" ? css.active : ""}>
                <div className={css.dropDown}>
                  <div>
                    <p>brands </p>
                    <div className={css.downIcon}>
                      <AiOutlineCaretDown size={15}></AiOutlineCaretDown>{" "}
                    </div>
                  </div>
                  <div className={css.DownItem}>
                    <ul>
                      {BranList.map((item, index) => (
                        <Link
                          key={index}
                          href={"/category/brand?value=" + item}
                        >
                          <li>{item}</li>
                        </Link>
                      ))}
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
