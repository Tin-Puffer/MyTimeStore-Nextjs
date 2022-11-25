import css from "../styles/HomeStyle.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div className={[css.btnSlide, css.next].join(" ")} onClick={onClick}>
      <MdNavigateNext size={50}></MdNavigateNext>
    </div>
  );
}
function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div className={[css.btnSlide, css.prev].join(" ")} onClick={onClick}>
      <MdNavigateBefore size={50}></MdNavigateBefore>
    </div>
  );
}
export default function Home() {
  const [change, setChange] = useState<Number>(0);

  const settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 50000000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    beforeChange: (oldIndex: any, newIndex: Number) => {
      setChange(newIndex);
    },
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prevSlideElement = document.querySelector(".slick-active");
      prevSlideElement?.classList.toggle(css.active);
    }
  }, [change]);
  return (
    <div className={css.container}>
      <div className={css.sliderContainer}>
        <div className={css.sliderContent}>
          <Slider {...settings}>
            <div className={css.sliderItem}>
              <div className={[css.SliderImg, css.item1].join(" ")}></div>
              <div className={css.contentI1}>
                <blockquote className={css.main}>
                  <h6>BỘ SƯU TẬP ĐỒNG HỒ</h6>
                  <h3>Trường tồn với thời gian</h3>
                  <span>
                    Đồng hồ được chế tác từ các nguyên liệu tốt nhất và lắp ráp
                    tỉ mỉ đến từng chi tiết. Mỗi chi tiết được thiết kế, phát
                    triển, và sản xuất với tiêu chuẩn chính xác nhất.
                  </span>
                </blockquote>
                <div className={css.btnBox}>
                  <div className={css.bntBoder}>
                    <span>MUA NGAY</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={css.sliderItem}>
              <div className={[css.SliderImg, css.item2].join(" ")}></div>
              <div className={css.tss}></div>
            </div>
            <div className={css.sliderItem}>
              <div className={[css.SliderImg, css.item3].join(" ")}></div>
              <div className={css.tss}></div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
