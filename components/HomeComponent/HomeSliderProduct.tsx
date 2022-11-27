import css from "./SliderProductStyle.module.scss";
import cssH from "./HomeProductStyle.module.scss";
import cssP from "../ProductStyle.module.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

import { Carousel, Col, Row } from "antd";
import { useRef } from "react";
import { CarouselRef } from "antd/es/carousel";
export function SliderProduct() {
  const ref = useRef<CarouselRef>(null);
  return (
    <div className={cssH.container}>
      <div className={cssH.title}>
        <p>A COMPANION FOR YA</p>
      </div>
      <div className={cssH.lable}>
        <p>SPECIAL </p> <p>EDITION</p>
      </div>
      <div className={cssH.gridPoduct}>
        <div className={css.sliderContainer}>
          <div className={css.sliderContent}>
            <Carousel speed={800} dotPosition="bottom" ref={ref}  >
              <div style={{ width: "100%", position: "relative" }}>
                <Row>
                  <Col xs={24} md={12} style={{ display: "flex" }}>
                    <div className={css.image}>
                      <div className={cssP.disCount} style={{ left: "5%" }}>
                        -55%
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className={css.textContent}>
                      <h1>OMEGA SEAMASTER 39MM</h1>
                      <div className={css.driver}></div>
                      <div className={css.priceWapper}>
                        <p className={css.productPagePrice}>
                          <span className={css.oldPrice}>
                            386,300,000&nbsp;
                            <span>₫</span>
                          </span>
                          <span>&nbsp;&nbsp;</span>
                          <span>
                            238,700,000&nbsp;
                            <span>₫</span>
                          </span>
                        </p>
                      </div>
                      <div className={css.productDecription}>
                        <p>&gt; Sản phẩm nhập khẩu chính hãng.</p>
                        <p>&gt; Vận chuyển miễn phí toàn quốc.</p>
                        <p>&gt; Giao hàng trong ngày.</p>
                        <p>&gt; Thanh toán sau khi nhận hàng.</p>
                        <p>&gt; Bảo hành 5 năm tại Công ty.</p>
                        <p>&gt; Bảo hành chính hãng toàn cầu.</p>
                      </div>
                      <div className={css.product_meta}>
                        <span className={css.sku_wrapper}>
                          Mã: <p className="sku">77228</p>
                        </span>
                        <span className={css.posted_in}>
                          Danh mục: <p>Đồng hồ cặp đôi</p>, <p>Đồng hồ nam</p>
                        </span>
                        <span className={css.tagged_as}>
                          Từ khóa: <p>casio</p>, <p>men</p>
                        </span>
                      </div>

                      <div className={css.button}>
                        <p>Đọc Tiếp</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div style={{ width: "100%", position: "relative" }}>
                <Row>
                  <Col xs={24} md={12}>
                    <div className={css.image}></div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className={css.image}></div>
                  </Col>
                </Row>
              </div>
            </Carousel>
            <div className={css.nextBtn} onClick={() => ref.current?.next()}>
              <MdNavigateNext size={46}></MdNavigateNext>
            </div>
            <div className={css.prevBtn} onClick={() => ref.current?.prev()}>
              <MdNavigateBefore size={46}></MdNavigateBefore>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
