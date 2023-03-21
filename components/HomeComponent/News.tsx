import cssH from "./ProductStyle.module.scss";
import css from "./NewsStyle.module.scss";
import Link from "next/link";
import { Col, Row } from "antd";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";
import {
  collection1,
  collection2,
  collection3,
} from "../../public/staticImage";

export function HomeNews() {
  const { ref, inView } = useInView();
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        transform: "rotateX(0deg) rotateY(0deg) ",

        opacity: 1,
        transition: {
          type: "spring",
          duration: 2,
        },
      });
    }
    if (!inView) {
      animation.start({
        transform: "rotateX(90deg) rotateY(45deg) ",
        opacity: 0,
      });
    }
  }, [inView]);
  return (
    <div
      // className={cssH.container}
      style={{ backgroundColor: "#fafafa", paddingBottom: "60px" }}
    >
      <div className={cssH.gridPoduct} ref={ref}>
        <div style={{ padding: "0 30px" }}>
          <Row gutter={[32, 16]}>
            <Col xs={24} sm={8}>
              <div className={css.itemContainer}>
                <motion.div animate={animation} className={css.img_content}>
                  <Link href={"/news"}>
                    <div
                      className={css.img}
                      style={{ backgroundImage: `url(${collection1.src})` }}
                    ></div>
                  </Link>
                </motion.div>
                <h1>Chronograph 100M</h1>
                <h2>Timers Villa</h2>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className={css.itemContainer}>
                <motion.div animate={animation} className={css.img_content}>
                  <Link href={"/news"}>
                    <div
                      className={css.img}
                      style={{ backgroundImage: `url(${collection2.src})` }}
                    ></div>
                  </Link>
                </motion.div>

                <h1>Chronograph 100M</h1>
                <h2>Timers Villa</h2>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className={css.itemContainer}>
                <motion.div animate={animation} className={css.img_content}>
                  <Link href={"/news"}>
                    <div
                      className={css.img}
                      style={{ backgroundImage: `url(${collection3.src})` }}
                    ></div>
                  </Link>
                </motion.div>
                <h1>Chronograph 100M</h1>
                <h2>Timers Villa</h2>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
