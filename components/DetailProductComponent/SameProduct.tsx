import cssD from "./DecriptionStyle.module.scss";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssO from "../HomeComponent/OutBlogStyle.module.scss";
import { Carousel } from "antd";
import { useEffect, useRef, useState } from "react";

import { CarouselRef } from "antd/es/carousel";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { ProductItem } from "../CategoryComponent";
import css from "./DecriptionStyle.module.scss";
import { Fproduct } from "../../fakeData/Fproduct";
import { product } from "../../common/product/interface";

export function SameProduct() {
  const ref = useRef<CarouselRef>(null);
  const [sameProduct, setSameProduct] = useState<product[]>();
  useEffect(() => {
    setSameProduct(Fproduct);
  }, []);
  return (
    <div className={cssP.gridPoduct} style={{ marginTop: "40px" }}>
      <div className={cssD.decriptionContainter}>
        <div className={cssO.contentMain}>
          <Carousel
            slidesToShow={4}
            autoplay
            responsive={[
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 450,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
            dots={false}
            ref={ref}
            autoplaySpeed={5000}
            style={{ display: "flex" }}
            className={cssO.carousel}
          >
            {sameProduct?.map((e, i) => (
              <div className={css.ItemSame} key={i}>
                <ProductItem product={e}></ProductItem>
              </div>
            ))}
           
          </Carousel>
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
        </div>
      </div>
    </div>
  );
}
