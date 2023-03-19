import cssPc from "../ProductStyle.module.scss";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssO from "../HomeComponent/OutBlogStyle.module.scss";
import cssCa from "../CategoryComponent/TitleStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import css from "./DetailStyle.module.scss";
import Link from "next/link";
import openNotification from "../Notifycation/Notification";
import {  Col, Row, Tooltip } from "antd";
import { useMemo, useRef, useState, useCallback } from "react";
import { CarouselRef } from "antd/es/carousel";
import { FaExpandAlt } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { product } from "../../common/product/interface";
import { payList, productDecription, shipList } from "../../common/constag";
import { formatNew, formatOld } from "../../PriceFormat";
import { useAppDispatch, useAppSelector } from "../../app/Hook";
import { cartAction, ProductSlI } from "../../app/splice/cartSlipe";
import { SliderImage } from "./SliderImage";
export function QuantityComponent({
  changeQuantity,
  small = false,
  product,
  cartDeltailItem,
}: {
  changeQuantity?: (id: string, quantity: number) => void;
  small?: boolean;
  product?: product;
  cartDeltailItem?: ProductSlI;
}) {
  const [quantity, setQuantity] = useState(
    cartDeltailItem ? cartDeltailItem.quantity : 1
  );

  const dispactch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.Cid);
  const loading = useAppSelector((state) => state.cart.loading);
  const islogin = useAppSelector((state) => state.auth.isLogin);

  function addCartProduct() {
    if (islogin) {
      if (!loading && product) {
        dispactch(
          cartAction.addCartItem({
            id: product.id,
            quantity: quantity,
            cartId: cart,
          })
        );
      } else
        openNotification("notiifyWanning", "an operation is being processed");
    } else
      openNotification(
        "notiifyError",
        "Login is required to use this function"
      );
  }
  return (
    <>
      <div className={[css.quantity, small && css.small].join(" ")}>
        <input
          type="button"
          value="-"
          className={css.minus}
          onClick={() => {
            setQuantity((pr) => (pr > 1 ? pr - 1 : pr));
            cartDeltailItem &&
              changeQuantity &&
              quantity > 1 &&
              changeQuantity(cartDeltailItem.Pid, quantity - 1);
          }}
        ></input>
        <input
          type="number"
          className={css.value}
          value={quantity}
          onChange={(e) => {
            Number(e.target.value) > 0 && setQuantity(Number(e.target.value));
            cartDeltailItem &&
              changeQuantity &&
              changeQuantity(cartDeltailItem.Pid, Number(e.target.value));
          }}
        ></input>
        <input
          type="button"
          value="+"
          className={css.plus}
          onClick={() => {
            setQuantity((pr) => pr + 1);
            cartDeltailItem &&
              changeQuantity &&
              changeQuantity(cartDeltailItem.Pid, quantity + 1);
          }}
        ></input>
      </div>
      {!cartDeltailItem && (
        <div
          className={cssS.button}
          style={{ fontSize: "18px", backgroundColor: "#d26e4b" }}
        >
          <p style={{ padding: "11px 18px" }} onClick={() => addCartProduct()}>
            Thêm vào giỏ
          </p>
        </div>
      )}
    </>
  );
}

export function DetailProduct({ product }: { product: product }) {
  const priceFormat = useMemo(() => formatOld(product.price), [product.price]);

  const priceNow = useMemo(
    () =>
      formatNew(
        product.price,
        product.sale?.discount,
        product.sale?.end,
        product.sale?.begin
      ),
    [product]
  );

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
  };
  const setActiveToSlider = useCallback((index: number) => {
    setActive(index);
  }, []);
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

                {priceNow && (
                  <div className={cssPc.disCount} style={{ left: "5%" }}>
                    -{product.sale?.discount}%
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
                
                <SliderImage
                product={product}
                setActive={setActiveToSlider}
                ></SliderImage>
              </div>
             
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
                    {priceNow ? (
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
                  <QuantityComponent product={product}></QuantityComponent>
                </div>
                <div className={css.Payment}>
                  <Row gutter={[24, 20]}>
                    <Col xs={24} sm={12} md={12}>
                      <strong className={css.payTitle}>Phí ship tự động</strong>
                      <Row gutter={[10, 10]}>
                        {shipList.map((e: any, i) => {
                          return (
                            <Col xs={8} sm={12} lg={8} key={i}>
                              <div
                                className={css.ItemPay}
                                style={{ backgroundImage: `url("${e.src}")` }}
                              ></div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                      <strong className={css.payTitle}>Thanh toán</strong>
                      <Row gutter={[10, 10]}>
                        {payList.map((e: any, i) => {
                          return (
                            <Col xs={8} sm={12} lg={8} key={i}>
                              <div
                                className={css.ItemPay}
                                style={{ backgroundImage: `url("${e.src}")` }}
                              ></div>
                            </Col>
                          );
                        })}
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
