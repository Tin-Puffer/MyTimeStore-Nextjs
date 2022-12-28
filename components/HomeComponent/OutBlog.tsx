import cssP from "./ProductStyle.module.scss";
import cssC from "./CarouselStyle.module.scss";
import css from "./OutBlogStyle.module.scss";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
function SliderItem() {
  return (
    <Link href={"/news/idnew"}>
      <div className={css.itemContent}>
        <div className={css.Content}>
          <div className={css.imgContent}>
            <div className={css.img}></div>
          </div>
          <div className={css.dectiptContent}>
            <h5>A Lubricant-Free Watch For a Perfect Men</h5>
            <div className={css.time}>3 Tháng Mười Hai, 2018</div>
            <div className={css.driver}></div>
            <p className={css.excerpt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ...{" "}
            </p>
            <div className={cssC.btnBox} style={{ padding: "10px 0" }}>
              <div className={cssC.bntBoder}>
                <span style={{ fontWeight: "bold" }}>Đọc Thêm &gt;&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export function OutBlog() {
  const x = [1, 2, 3, 4, 5, 6];
  const { ref, inView } = useInView();

  const refC = useRef<CarouselRef>(null);

  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 2,
        },
      });
    }
    if (!inView) animation.start({ y: "-50px", opacity: 0 });
  }, [inView]);

  return (
    <div className={cssP.container}>
      <div className={cssP.title}>
        <p>HAPPENINGS AROUND</p>
      </div>
      <div className={cssP.lable}>
        <p>OUR </p> <p>BLOG</p>
      </div>
      <motion.div animate={animation} ref={ref} className={cssP.gridPoduct}>
        <div className={css.contentMain}>
          <Carousel
            autoplay
            slidesToShow={3}
            ref={refC}
            autoplaySpeed={5000}
            style={{ display: "flex" }}
            responsive={[
              {
                breakpoint: 850,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 550,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
            className={css.carousel}
          >
            <SliderItem></SliderItem>
            <SliderItem></SliderItem>
            <SliderItem></SliderItem>
            <SliderItem></SliderItem>
            <SliderItem></SliderItem>
            <SliderItem></SliderItem>
          </Carousel>
          <div
            className={[css.BtnCarousel, css.prev].join(" ")}
            onClick={() => refC.current?.prev()}
          >
            <MdNavigateBefore size={50}></MdNavigateBefore>
          </div>

          <div
            className={[css.BtnCarousel, css.next].join(" ")}
            onClick={() => refC.current?.next()}
          >
            <MdNavigateNext size={50}></MdNavigateNext>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
