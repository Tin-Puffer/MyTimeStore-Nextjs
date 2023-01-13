import cssH from "./ProductStyle.module.scss";
import cssP from "../ProductStyle.module.scss";
import css from "./SliderProductStyle.module.scss";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";

import { Carousel, Col, Row } from "antd";
import { useEffect, useRef } from "react";
import { CarouselRef } from "antd/es/carousel";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { product } from "../../common/product/interface";
import { formatNew, formatOld } from "../../PriceFormat";
export function SliderItem({ sliderItem }: { sliderItem: product }) {
  const { ref, inView } = useInView();
  const animationL = useAnimation();
  const animationR = useAnimation();
  const priceFormat = formatOld(sliderItem.price);
  const priceNow = formatNew(
    sliderItem.price,
    sliderItem.deal ? sliderItem.deal : 0
  );
  useEffect(() => {
    if (inView) {
      animationR.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 3,
        },
      });
      animationL.start({
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 3,
        },
      });
    }
    if (!inView) {
      animationL.start({ x: "-50px", opacity: 0 });
      animationR.start({ y: "50px", opacity: 0 });
    }
  }, [inView]);
  return (
    <div ref={ref} style={{ width: "100%", position: "relative" }}>
      <Row>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            padding: "15px",
          }}
        >
          {/* <div style={{width:"100%"}}> */}

          <motion.div
            animate={animationL}
            className={css.image}
            style={{ backgroundImage: `url("${sliderItem.image[0]}")` }}
          >
            {sliderItem.deal && (
              <div className={cssP.disCount} style={{ left: "5%" }}>
                -{sliderItem.deal}%
              </div>
            )}
          </motion.div>
          {/* </div> */}
        </Col>
        <Col xs={24} md={12}>
          <motion.div animate={animationR} className={css.ContentSlider}>
            <div className={css.textContent}>
              <h1>{sliderItem.name}</h1>
              <div className={css.driver}></div>
              <div className={css.priceWapper}>
                <div className={css.productPagePrice}>
                  {sliderItem.deal ? (
                    <>
                      <span className={css.oldPrice}>
                        {priceFormat}&nbsp;
                        <span>₫</span>
                      </span>
                      <span>&nbsp;&nbsp;</span>
                      <span>
                        {priceNow}&nbsp;
                        <span>₫</span>
                      </span>
                    </>
                  ) : (
                    <span>
                      {priceNow}&nbsp;
                      <span>₫</span>
                    </span>
                  )}
                </div>
              </div>
              <div className={css.productDecription}>
                <p>
                  <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Sản
                  phẩm nhập khẩu chính hãng.
                </p>
                <p>
                  <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Vận
                  chuyển miễn phí toàn quốc.
                </p>
                <p>
                  <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Giao
                  hàng trong ngày.
                </p>
                <p>
                  <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Thanh
                  toán sau khi nhận hàng.
                </p>
                <p>
                  <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Bảo
                  hành 5 năm tại Công ty.
                </p>
                <p>
                  <RiArrowRightSLine style={{ marginBottom: "-1px" }} /> Bảo
                  hành chính hãng toàn cầu.
                </p>
              </div>
              <div className={css.product_meta}>
                <span className={css.sku_wrapper}>
                  Mã: <p className="sku">77228</p>
                </span>
                <span className={css.posted_in}>
                  Danh mục:{" "}
                  <Link href={"/category/man"}>
                    <p>Đồng hồ cặp đôi</p>
                  </Link>
                  ,{" "}
                  <Link href={"/category/man"}>
                    <p>Đồng hồ nam</p>
                  </Link>
                </span>
                <span className={css.tagged_as}>
                  Từ khóa:{" "}
                  <Link href={"/category/man"}>
                    <p>Rolex</p>
                  </Link>
                  ,{" "}
                  <Link href={"/category/man"}>
                    <p>Best Seller</p>
                  </Link>
                </span>
              </div>
              <Link href={"/product/idpr"}>
                <div className={css.button}>
                  <p>Đọc Tiếp</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}
export function SliderProduct({ productSlider }: { productSlider: product[] }) {
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
            <Carousel speed={800} dotPosition="bottom" ref={ref}>
              {productSlider.map((e, i) => (
                <div key={i}>
                  <SliderItem sliderItem={e} />
                </div>
              ))}
              {/* <SliderItem />
              <SliderItem />
              <SliderItem />
              <SliderItem /> */}
            </Carousel>
            <div
              className={[css.BtnCarousel, css.prevBtn].join(" ")}
              onClick={() => ref.current?.prev()}
            >
              <MdNavigateBefore size={40}></MdNavigateBefore>
            </div>

            <div
              className={[css.BtnCarousel, css.nextBtn].join(" ")}
              onClick={() => ref.current?.next()}
            >
              <MdNavigateNext size={40}></MdNavigateNext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
