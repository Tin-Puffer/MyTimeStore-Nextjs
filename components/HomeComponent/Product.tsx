import css from "./ProductStyle.module.scss";
import { Col, Row } from "antd";
import { Product } from "../Poduct";
import {  motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { product } from "../../common/product/interface";
export function HomeProduct({products}:{products:product[]}) {
  const { ref, inView } = useInView();
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.6,
        },
      });
    }
    if (!inView) animation.start({ y: "100px", opacity: 0 });
  }, [inView]);
  return (
    <div className={css.container}>
      <div className={css.title}>
        <p>360° COLLECTION</p>
      </div>
      <div className={css.lable}>
        <p>FEATURED</p> <p>PRODUCTS</p>
      </div>
      <motion.div animate={animation} ref={ref} className={css.gridPoduct}>
        <Row gutter={[40, 45]} className={css.rowSet}>
          {products.map((e, i) => (
            <Col key={i} xs={24} sm={12} lg={8}>
              <Product product={e}></Product>
            </Col>
          ))}
        </Row>
      </motion.div>
    </div>
  );
}
