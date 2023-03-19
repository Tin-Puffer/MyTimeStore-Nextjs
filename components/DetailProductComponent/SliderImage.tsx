import cssO from "../HomeComponent/OutBlogStyle.module.scss";
import css from "./DetailStyle.module.scss";
import React from "react";
import { Carousel } from "antd";
import { useRef, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { product } from "../../common/product/interface";
import { CarouselRef } from "antd/es/carousel";
export const SliderImage = React.memo(
  ({
    product,

    setActive,
  }: {
    product: product;

    setActive: any;
  }) => {
    const handelChangeImage = (index: number) => {
      setActive(index);
      setDistinct(index);
    };
    const ref = useRef<CarouselRef>(null);
    const [distinct, setDistinct] = useState(0);
    return (
      <>
        <Carousel
          slidesToShow={product.image.length < 4 ? product.image.length : 4}
          dots={false}
          ref={ref}
        >
          {product.image.map((e, i) => (
            <div
              key={i}
              className={[css.outline, distinct == i && css.active].join(" ")}
              onClick={() => handelChangeImage(i)}
            >
              <div
                className={[css.img, css.small].join(" ")}
                style={{
                  backgroundImage: `url("${e}")`,
                }}
              ></div>
            </div>
          ))}
        </Carousel>
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
      </>
    );
  }
);
SliderImage.displayName = "SliderImage";
