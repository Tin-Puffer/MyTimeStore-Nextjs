import cssP from "./ProductStyle.module.scss";
import cssC from "./CarouselStyle.module.scss";
import css from "./OutBlogStyle.module.scss";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { motion } from "framer-motion";

import { HiClock } from "react-icons/hi";

import { Blog } from "../../common/product/interface";
import { useRouter } from "next/router";
function SliderItem({ blog }: { blog: Blog }) {
  const router=useRouter()
  const dateObj = new Date(blog.time);
  const year = dateObj.getFullYear();

  const month = (dateObj.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const day = dateObj
    .getDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
  return (

      <div className={css.itemContent}>
        <div className={css.Content}>
          <div className={css.imgContent}>
            <div
              className={css.img}
              style={{ backgroundImage: `url("${blog.thumnail}")` }}
            ></div>
          </div>
          <div className={css.dectiptContent}>
            <h5>{blog.name}</h5>
            <p className={css.time}>
              <HiClock
                size={19}
                style={{ transform: "translateY(4px)", marginRight: "5px" }}
              />
              {day}/{month}/{year}
            </p>
            <div className={css.driver}></div>
            <p className={css.excerpt}>{blog.decription}</p>
            <div className={cssC.btnBox} style={{ padding: "10px 0" }}>
              <div className={cssC.bntBoder} onClick={()=>router.push('/news/'+blog.id)}>
                <span style={{ fontWeight: "bold" }}>Đọc Thêm &gt;&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
}
export function OutBlog({ blogList }: { blogList?: Blog[] }) {
  const refC = useRef<CarouselRef>(null);

  return (
    <div className={cssP.container}>
      <div className={cssP.title}>
        <p>HAPPENINGS AROUND</p>
      </div>
      <div className={cssP.lable}>
        <p>OUR </p> <p>BLOG</p>
      </div>
      <motion.div className={cssP.gridPoduct}>
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
            {blogList && blogList.map((item, index) => (
              <div key={index}>
                <SliderItem blog={item}></SliderItem>
              </div>
            ))}
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
