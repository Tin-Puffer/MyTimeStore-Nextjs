import { Col, Row } from "antd";
import css from "./SelectStyle.module.scss";
import cssCarousel from "./CarouselStyle.module.scss";
import Link from "next/link";

export function HomeSelect() {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <Row>
          <Col xs={24} sm={8}>
            <div className={css.item}>
              <div className={[css.backgournd, css.b1].join(" ")}></div>
              <div className={[css.Content, css.c1].join(" ")}>
                <h1>
                  <strong>ĐỒNG HỒ CỔ ĐIỂN</strong>
                </h1>
                <p>
                  <span>
                    Phong cách trường tồn, có thể được nhận biết trong nháy mắt.
                  </span>
                </p>

                <Link href={"/category/all"}>
                  <div className={cssCarousel.bntBoder}>
                    <span>XEM THÊM</span>
                  </div>
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className={css.item}>
              <div className={[css.backgournd].join(" ")}>
                <div className={[css.itemCenter].join(" ")}>
                  <div className={css.item1}></div>
                  <div className={[css.Content, css.c2].join(" ")}>
                    <h1>
                      <strong>BỘ SƯU TẬP NĂM 2023</strong>
                    </h1>
                    <Link href={"/category/all"}>
                      <div className={cssCarousel.bntBoder}>
                        <span>XEM THÊM</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className={[css.itemCenter, css.item2].join(" ")}>
                  <div className={css.item2}></div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className={css.item}>
              <div className={[css.backgournd, css.b2].join(" ")}></div>
              <div className={[css.Content, css.c3].join(" ")}>
                <h1>
                  <strong>ĐỒNG HỒ CHẤT</strong>
                </h1>
                <p>
                  <span>
                    Kết hợp hoàn hảo tính năng ưu việt và phong cách đẳng cấp
                  </span>
                </p>
                <Link href={"/category/all"}>
                  <div className={cssCarousel.bntBoder}>
                    <span>XEM THÊM</span>
                  </div>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
