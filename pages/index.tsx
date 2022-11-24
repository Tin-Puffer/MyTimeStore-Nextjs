import css from "../styles/HomeStyle.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [change, setChange] = useState(0);

  const settings = {
    dots: true,
    beforeChange: (oldIndex: any, newIndex: any) => {
      setChange(newIndex);
    },
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prevSlideElement = document.querySelector(".slick-active");
      prevSlideElement?.classList.add(css.active);
    }
  }, [change]);
  return (
    <div className={css.container}>
      <div className={css.sliderContainer}>
        <div className={css.sliderContent}>
          <Slider {...settings}>
            <div style={{ overflow: "hidden" }}>
              <div className={css.SliderImg}></div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div className={css.SliderImg}></div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div className={css.SliderImg}></div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div className={css.SliderImg}></div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
