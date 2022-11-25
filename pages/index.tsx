import css from "../styles/HomeStyle.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";

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
  const ref = useRef<CarouselRef>(null);
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
    beforeChange: (oldIndex: Number, newIndex: Number) => {
      setChange(newIndex);
    },
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log(change);
      const prevSlideElement = document.querySelector(".slick-active");
      prevSlideElement?.classList.add(css.active);
    }
  }, [change]);
  return (
    <div className={css.container}>
      <div className={css.sliderContainer}>
        <div className={css.sliderContent}>
          {/* <Slider {...settings}> */}
          <Carousel
            dots={false}
            autoplay
            autoplaySpeed={5000}
            // speed={6000}
            ref={ref}
            beforeChange={(from, to) => {
              setChange(to);
            }}
          >
            <div className={css.sliderItem}>
              <div className={[css.SliderImg, css.item1].join(" ")}>
                <div className={css.cover}></div>
              </div>
              <div className={[css.content, css.c1].join(" ")}>
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
              <div className={[css.SliderImg, css.item2].join(" ")}>
                <div className={css.cover}></div>
              </div>
              <div className={[css.content, css.c2].join(" ")}>
                <blockquote className={css.main}>
                  <h6>Dành riêng cho doanh nhân</h6>
                  <h3>Đẳng cấp là mãi mãi</h3>
                  <span>
                    Bộ sưu tập các mẫu đồng hồ Rolex cổ điển gồm các kiểu dáng
                    kết hợp những bí quyết của Rolex và những tiêu chuẩn cao
                    nhất về sự hoàn hảo
                  </span>
                </blockquote>
              </div>
            </div>
            <div className={css.sliderItem}>
              <div className={[css.SliderImg, css.item3].join(" ")}>
                <div className={css.cover}></div>
              </div>
              <div className={[css.content, css.c3].join(" ")}>
                <blockquote className={css.main}>
                  <h3>Định hình phong cách</h3>
                  <span>
                    Khám phá bộ sưu tập Rolex bằng cách chọn mẫu, chất liệu,
                    vành đồng hồ, mặt số và dây đeo tay yêu thích của bạn
                  </span>
                </blockquote>
              </div>
            </div>
            {/* </Slider> */}
          </Carousel>
          <button
            onClick={() => {
              // if(ref.current?.next();)
              ref.current?.next();
            }}
          >
            xxxx
          </button>
        </div>
      </div>
    </div>
  );
}
