import cssP from "./ProductStyle.module.scss";
import cssC from "./CarouselStyle.module.scss";
import css from "./OutBlogStyle.module.scss";
import { Carousel, Col } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

function SliderItem() {
  return (
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
  );
}
export function OutBlog() {
  const x = [1, 2, 3, 4, 5, 6];
  const ref = useRef<CarouselRef>(null);

  return (
    <div className={cssP.container}>
      <div className={cssP.title}>
        <p>HAPPENINGS AROUND</p>
      </div>
      <div className={cssP.lable}>
        <p>OUR </p> <p>BLOG</p>
      </div>
      <div className={cssP.gridPoduct}>
        <div className={css.contentMain}>
          <Carousel
            slidesToShow={3}
            autoplay
            ref={ref}
            autoplaySpeed={5000}
            style={{ display: "flex" }}
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
            onClick={() => ref.current?.prev()}
          >
            <MdNavigateBefore size={50}></MdNavigateBefore>
          </div>

          <div
            className={[css.BtnCarousel, css.next].join(" ")}
            onClick={() => ref.current?.next()}
          >
            <MdNavigateNext size={50}></MdNavigateNext>
          </div>
        </div>
      </div>
    </div>
  );
}
