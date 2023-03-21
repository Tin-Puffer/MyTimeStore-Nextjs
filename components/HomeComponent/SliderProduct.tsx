import cssH from "./ProductStyle.module.scss";
import cssP from "../ProductStyle.module.scss";
import css from "./SliderProductStyle.module.scss";
import Link from "next/link";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { Carousel, Col, Row } from "antd";
import { useRef } from "react";
import { CarouselRef } from "antd/es/carousel";
import { product } from "../../common/product/interface";
import { formatNew, formatOld } from "../../PriceFormat";
import { productDecription } from "../../common/constag";
export function SliderItem({ sliderItem }: { sliderItem: product }) {
  const priceFormat = formatOld(sliderItem.price);
  const priceNow = formatNew(
    sliderItem.price,
    sliderItem.sale?.discount,
    sliderItem.sale?.end,
    sliderItem.sale?.begin
  );

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <Row>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            padding: "15px",
          }}
        >
          <div
            className={css.image}
            style={{ backgroundImage: `url("${sliderItem.image[0]}")` }}
          >
            {priceNow && (
              <div className={cssP.disCount} style={{ left: "5%" }}>
                -{sliderItem.sale?.discount}%
              </div>
            )}
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className={css.ContentSlider}>
            <div className={css.textContent}>
              <h1>{sliderItem.name}</h1>
              <div className={css.driver}></div>
              <div className={css.priceWapper}>
                <div className={css.productPagePrice}>
                  {priceNow ? (
                    <>
                      <span className={css.oldPrice}>{priceFormat}</span>
                      <span>&nbsp;&nbsp;</span>
                      <span>{priceNow}</span>
                    </>
                  ) : (
                    <span>{priceFormat}</span>
                  )}
                </div>
              </div>
              <div className={css.productDecription}>
                {productDecription.map((e, i) => (
                  <p key={i}>
                    <RiArrowRightSLine style={{ marginBottom: "-1px" }} />
                    {e}
                  </p>
                ))}
              </div>
              <div className={css.product_meta}>
                <span className={css.sku_wrapper}>
                  Mã: <p className="sku">{sliderItem.id}</p>
                </span>
                <span className={css.posted_in}>
                  Danh mục:{" "}
                  <Link href={"/category/brand?value=" + sliderItem.keyWord[0]}>
                    <p>{sliderItem.keyWord[0]}</p>
                  </Link>
                  <Link href={"/category/gender?value=man"}>
                    , <p>{sliderItem.category[1]}</p>
                  </Link>
                </span>
                <span className={css.tagged_as}>
                  Từ khóa:{" "}
                  <Link href={"/product/" + sliderItem.id}>
                    <p>{sliderItem.keyWord[1]}</p>
                  </Link>
                </span>
              </div>
              <Link href={"/product/" + sliderItem.id}>
                <div className={css.button}>
                  <p>View Detail</p>
                </div>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export function SliderProduct({ productSlider }: { productSlider?: product[] }) {
  const ref = useRef<CarouselRef>(null);
  return (
    <div className={cssH.container}>
      <div className={cssH.title}>
        <p>A COMPANION FOR YA</p>
      </div>
      <div className={cssH.lable}>
        <span>SPECIAL </span> <span>EDITION</span>
      </div>
      <div className={cssH.gridPoduct}>
        <div className={css.sliderContainer}>
          <div className={css.sliderContent}>
            <Carousel speed={800} dotPosition="bottom" ref={ref}>
              {productSlider && productSlider.map((e, i) => (
                <div key={i}>
                  <SliderItem sliderItem={e} />
                </div>
              ))}
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
