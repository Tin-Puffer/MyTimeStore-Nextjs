import css from "./CarouselStyle.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import Link from "next/link";

export function HomeCarousel() {
  const [change, setChange] = useState<Number>(0);
  const ref = useRef<CarouselRef>(null);
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
            swipeToSlide
            draggable
            dots={false}
            autoplay
            autoplaySpeed={5000}
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
                <Link href={"/category/all"}>
                  <div className={css.btnBox}>
                    <div className={[css.bntBoder, css.reponsive].join(" ")}>
                      <span>MUA NGAY</span>
                    </div>
                  </div>
                </Link>
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
              <div className={css.sliderc3}>
                <div className={css.c3Item}>
                  <div className={css.left}>
                    <div
                      className={[css.SliderImgc3, css.c3I1].join(" ")}
                    ></div>
                  </div>
                  <div className={css.center}>
                    <div
                      className={[css.SliderImgc3, css.c3I2].join(" ")}
                    ></div>
                  </div>
                  <div className={css.right}>
                    <div
                      className={[css.SliderImgc3, css.c3I3].join(" ")}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* </Slider> */}
          </Carousel>
        </div>
        <div
          className={[css.btnSlide, css.prev].join(" ")}
          onClick={() => ref.current?.prev()}
        >
          <MdNavigateBefore size={40}></MdNavigateBefore>
        </div>

        <div
          className={[css.btnSlide, css.next].join(" ")}
          onClick={() => ref.current?.next()}
        >
          <MdNavigateNext size={40}></MdNavigateNext>
        </div>
      </div>
    </div>
  );
}
