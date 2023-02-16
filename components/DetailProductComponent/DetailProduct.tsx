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
import { product } from "../../common/product/interface";
import Link from "next/link";
import { productDecription } from "../../common/constag";
import { formatNew, formatOld } from "../../PriceFormat";
export function QuantityComponent({ small = false }: { small?: boolean }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={[css.quantity, small && css.small].join(" ")}>
      <input
        type="button"
        value="-"
        className={css.minus}
        onClick={() => setQuantity((pr) => (pr > 1 ? pr - 1 : pr))}
      ></input>
      <input
        type="number"
        className={css.value}
        value={quantity}
        onChange={(e) => {
          Number(e.target.value) != 0 && setQuantity(Number(e.target.value));
        }}
      ></input>
      <input
        type="button"
        value="+"
        className={css.plus}
        onClick={() => setQuantity((pr) => pr + 1)}
      ></input>
    </div>
  );
}

export function DetailProduct({ product }: { product: product }) {
  const priceFormat = formatOld(product.price);

  const priceNow = formatNew(product.price, product.deal ? product.deal : 0);

  const ref = useRef<CarouselRef>(null);
  const [position, setPosition] = useState("0% 0%");
  const [active, setActive] = useState(0);
  const handelChangeImage = (index: number) => {
    if (index != active) setActive(index);
  };
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
                <div>
                  <div className={css.containerImg}>
                    <div
                      className={css.img}
                      onMouseMove={handleMouseMove}
                      style={{
                        backgroundImage: `url("${product.image[active]}")`,
                      }}
                    >
                      <div
                        className={css.imgZoom}
                        style={{
                          backgroundPosition: position,
                          backgroundImage: `url("${product.image[active]}")`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {product.deal && (
                  <div className={cssPc.disCount} style={{ left: "5%" }}>
                    -{product.deal}%
                  </div>
                )}

                <Tooltip title="Zoom">
                  <div className={css.openView}>
                    <FaExpandAlt size={20}></FaExpandAlt>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className={cssO.contentMain}>
              <div>
                <Carousel
                  slidesToShow={
                    product.image.length < 4 ? product.image.length : 4
                  }
                  dots={false}
                  ref={ref}
                >
                  {product.image.map((e, i) => (
                    <div
                      key={i}
                      className={[css.outline, active == i && css.active].join(
                        " "
                      )}
                      onClick={() => handelChangeImage(i)}
                    >
                      <div
                        className={[css.img, css.small].join(" ")}
                        style={{
                          backgroundImage: `url("${e}")`,
                        }}
                        onClick={() => ref.current?.goTo(0)}
                      ></div>
                    </div>
                  ))}
                </Carousel>
              </div>
              {product.image.length > 4 && (
                <>
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
                </>
              )}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <div className={cssO.contentMain}>
              <div
                className={cssCa.BreadCrumb}
                style={{ fontSize: "14px", marginBottom: "10px" }}
              >
                <Link href={"/"}>TRANG CHU</Link> /{" "}
                <Link href={"/category/hot"}>SAN PHAM HOT</Link>
              </div>
              <div className={cssS.textContent} style={{ padding: 0 }}>
                <h1 style={{ fontSize: "26px" }}>{product.name}</h1>
                <div className={cssS.driver}></div>
                <div className={cssS.priceWapper}>
                  <p className={cssS.productPagePrice}>
                    {product.deal ? (
                      <>
                        <span>{priceNow} </span>
                        <span> &nbsp;</span>
                        <span className={cssS.oldPrice}>
                          {priceFormat}{" "}
                        </span>{" "}
                      </>
                    ) : (
                      <span>{priceFormat} </span>
                    )}
                  </p>
                </div>
                <div
                  className={[cssS.productDecription, css.SetSize].join(" ")}
                >
                  {productDecription.map((e, i) => (
                    <p key={i}>
                      <RiArrowRightSLine style={{ marginBottom: "-1px" }} />
                      {e}
                    </p>
                  ))}

                  <div className={css.call}>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Gọi{" "}
                    <span>1800 0091</span> hoặc <span>028 3833 9999 </span> để
                    đặt hàng
                  </div>
                </div>
                <div style={{ margin: "30px 0" }}>
                  <QuantityComponent></QuantityComponent>
                  <div
                    className={cssS.button}
                    style={{ fontSize: "18px", backgroundColor: "#d26e4b" }}
                  >
                    <p style={{ padding: "11px 18px" }}>Thêm vào giỏ</p>
                  </div>
                </div>
                <div className={css.Payment}>
                  <Row gutter={[24, 20]}>
                    <Col xs={24} sm={12} md={12}>
                      <strong className={css.payTitle}>Phí ship tự động</strong>
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
                      <strong className={css.payTitle}>Thanh toán</strong>
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
                    Mã: <p className="sku">{product.id}</p>
                  </span>
                  <span className={cssS.posted_in}>
                    Danh mục:{" "}
                    {product.category.map((e, i) => (
                      <p key={i}>{e} &nbsp;</p>
                    ))}
                  </span>
                  <span className={cssS.tagged_as}>
                    Từ khóa:{" "}
                    {product.keyWord.map((e, i) => (
                      <p key={i}>{e} &nbsp;</p>
                    ))}
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
