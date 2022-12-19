import cssPc from "../ProductStyle.module.scss";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import { Carousel, Col, Row, Tooltip } from "antd";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import cssO from "../HomeComponent/OutBlogStyle.module.scss";
import { useRef, useState } from "react";
import { CarouselRef } from "antd/es/carousel";
import { FaExpandAlt } from "react-icons/fa";
import cssCa from "../CategoryComponent/TitleStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import css from "./DetailStyle.module.scss";
export function DetailProduct() {
  const ref = useRef<CarouselRef>(null);
  const [position, setPosition] = useState("0% 0%");
  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition(`${x}% ${y}%`);
    console.log("ss");
  };
  return (
    <>
      <div className={cssP.gridPoduct} style={{ marginTop: "40px" }}>
        <Row>
          <Col xs={24} sm={24} md={12}>
            <div className={cssO.contentMain}>
              <div className={css.carouselImg}>
                <Carousel
                  dots={false}
                  slidesToShow={1}
                  dotPosition="bottom"
                  ref={ref}
                  beforeChange={(e: any) => console.log(e)}
                  className={css.carousel}
                >
                  <div>
                    <div className={css.containerImg}>
                      <div className={css.img} onMouseMove={handleMouseMove}>
                        <div
                          className={css.imgZoom}
                          style={{
                            backgroundPosition: position,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className={css.img}></div>
                </Carousel>
                <div className={cssPc.disCount} style={{ left: "5%" }}>
                  -55%
                </div>
                <Tooltip title="Zoom">
                  <div className={css.openView}>
                    <FaExpandAlt size={20}></FaExpandAlt>
                  </div>
                </Tooltip>
              </div>
              <div
                className={[cssO.BtnCarousel, cssO.prev].join(" ")}
                onClick={() => ref.current?.prev()}
              >
                <MdNavigateBefore size={50}></MdNavigateBefore>
              </div>

              <div
                className={[cssO.BtnCarousel, cssO.next].join(" ")}
                onClick={() => ref.current?.next()}
              >
                <MdNavigateNext size={50}></MdNavigateNext>
              </div>
            </div>
            <div style={{ padding: " 0 30px" }}>
              <Row>
                <Col span={6}>
                  <div className={[css.outline, css.active].join(" ")}>
                    <div
                      className={[css.img, css.small].join(" ")}
                      onClick={() => ref.current?.goTo(0)}
                    ></div>
                  </div>
                </Col>

                <Col span={6}>
                  <div className={css.outline}>
                    <div
                      className={[css.img, css.small].join(" ")}
                      onClick={() => ref.current?.goTo(1)}
                    ></div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div style={{ padding: " 0 30px" }}>
              <div
                className={cssCa.BreadCrumb}
                style={{ fontSize: "14px", marginBottom: "10px" }}
              >
                TRANG CHU / <span>SAN PHAM HOT</span>
              </div>
              <div className={cssS.textContent} style={{ padding: 0 }}>
                <h1 style={{ fontSize: "26px" }}>
                  BULOVA CORPORATION AUTOMATIC MEN’S WATCH 49MM
                </h1>
                <div className={cssS.driver}></div>
                <div className={cssS.priceWapper}>
                  <p className={cssS.productPagePrice}>
                    <span className={cssS.oldPrice}>
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
                <div
                  className={[cssS.productDecription, css.SetSize].join(" ")}
                >
                  <p>&gt; Sản phẩm nhập khẩu chính hãng.</p>
                  <p>&gt; Vận chuyển miễn phí toàn quốc.</p>
                  <p>&gt; Giao hàng trong ngày.</p>
                  <p>&gt; Thanh toán sau khi nhận hàng.</p>
                  <p>&gt; Bảo hành 5 năm tại Công ty.</p>
                  <p>&gt; Bảo hành chính hãng toàn cầu.</p>
                </div>
                <div className={cssS.button} style={{ marginBottom: "15px" }}>
                  <p style={{ padding: "10px 18px" }}>Đăng ký Affilicate</p>
                </div>
                <div className={cssS.product_meta}>
                  <span className={cssS.sku_wrapper}>
                    Mã: <p className="sku">77228</p>
                  </span>
                  <span className={cssS.posted_in}>
                    Danh mục: <p>Đồng hồ cặp đôi</p>, <p>Đồng hồ nam</p>
                  </span>
                  <span className={cssS.tagged_as}>
                    Từ khóa: <p>casio</p>, <p>men</p>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
