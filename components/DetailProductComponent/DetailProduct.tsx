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
import { RiArrowRightSLine } from "react-icons/ri";
export function QuantityComponent({ small = false }: { small?: boolean }) {
  return (
    <div className={[css.quantity, small && css.small].join(" ")}>
      <input type="button" value="-" className={css.minus}></input>
      <input type="number" defaultValue={1} className={css.value}></input>
      <input type="button" value="+" className={css.plus}></input>
    </div>
  );
}
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
                  BULOVA CORPORATION AUTOMATIC MENS WATCH 49MM
                </h1>
                <div className={cssS.driver}></div>
                <div className={cssS.priceWapper}>
                  <p className={cssS.productPagePrice}>
                    <span className={cssS.oldPrice}>
                      386,300,000&nbsp;
                      <span>???</span>
                    </span>
                    <span>&nbsp;&nbsp;</span>
                    <span>
                      238,700,000&nbsp;
                      <span>???</span>
                    </span>
                  </p>
                </div>
                <div
                  className={[cssS.productDecription, css.SetSize].join(" ")}
                >
                  <p>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> S???n
                    ph???m nh???p kh???u ch??nh h??ng.
                  </p>
                  <p>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> V???n
                    chuy???n mi???n ph?? to??n qu???c.
                  </p>
                  <p>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Giao
                    h??ng trong ng??y.
                  </p>
                  <p>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Thanh
                    to??n sau khi nh???n h??ng.
                  </p>
                  <p>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> B???o
                    h??nh 5 n??m t???i C??ng ty.
                  </p>
                  <p>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> B???o
                    h??nh ch??nh h??ng to??n c???u.
                  </p>
                  <div className={css.call}>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> G???i{" "}
                    <span>1800 0091</span> ho???c <span>028 3833 9999 </span> ?????
                    ?????t h??ng
                  </div>
                </div>
                <div style={{ margin: "30px 0" }}>
                  <QuantityComponent></QuantityComponent>
                  <div
                    className={cssS.button}
                    style={{ fontSize: "18px", backgroundColor: "#d26e4b" }}
                  >
                    <p style={{ padding: "11px 18px" }}>Th??m v??o gi???</p>
                  </div>
                </div>
                <div className={css.Payment}>
                  <Row gutter={[24, 20]}>
                    <Col xs={24} sm={12} md={12}>
                      <strong className={css.payTitle}>Ph?? ship t??? ?????ng</strong>
                      <Row gutter={[10, 10]}>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                      <strong className={css.payTitle}>Thanh to??n</strong>
                      <Row gutter={[10, 10]}>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                        <Col xs={8} sm={12} lg={8}>
                          <div className={css.ItemPay}></div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>

                <div className={cssS.product_meta}>
                  <span className={cssS.sku_wrapper}>
                    M??: <p className="sku">77228</p>
                  </span>
                  <span className={cssS.posted_in}>
                    Danh m???c: <p>?????ng h??? c???p ????i</p>, <p>?????ng h??? nam</p>
                  </span>
                  <span className={cssS.tagged_as}>
                    T??? kh??a: <p>casio</p>, <p>men</p>
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
