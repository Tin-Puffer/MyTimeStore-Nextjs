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
export function SliderItem() {
  const { ref, inView } = useInView();
  const animationL = useAnimation();
  const animationR = useAnimation();
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

          <motion.div animate={animationL} className={css.image}>
            <div className={cssP.disCount} style={{ left: "5%" }}>
              -55%
            </div>
          </motion.div>
          {/* </div> */}
        </Col>
        <Col xs={24} md={12}>
          <motion.div animate={animationR} className={css.ContentSlider}>
            <div className={css.textContent}>
              <h1>OMEGA SEAMASTER 39MM</h1>
              <div className={css.driver}></div>
              <div className={css.priceWapper}>
                <div className={css.productPagePrice}>
                  <span className={css.oldPrice}>
                    386,300,000&nbsp;
                    <span>???</span>
                  </span>
                  <span>&nbsp;&nbsp;</span>
                  <span>
                    238,700,000&nbsp;
                    <span>???</span>
                  </span>
                </div>
              </div>
              <div className={css.productDecription}>
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
              </div>
              <div className={css.product_meta}>
                <span className={css.sku_wrapper}>
                  M??: <p className="sku">77228</p>
                </span>
                <span className={css.posted_in}>
                  Danh m???c:{" "}
                  <Link href={"/category/man"}>
                    <p>?????ng h??? c???p ????i</p>
                  </Link>
                  ,{" "}
                  <Link href={"/category/man"}>
                    <p>?????ng h??? nam</p>
                  </Link>
                </span>
                <span className={css.tagged_as}>
                  T??? kh??a:{" "}
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
                  <p>?????c Ti???p</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}
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
            <Carousel speed={800} dotPosition="bottom" ref={ref}>
              <SliderItem />
              <SliderItem />
              <SliderItem />
              <SliderItem />
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
