import { Col, Row } from "antd";
import css from "./DigitalStyle.module.scss";
import { MdStore } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { HiOutlineClock } from "react-icons/hi";

// GoPackage;HiOutlineClock
export function HomeDigital() {
  return (
    <section className={css.counter}>
      <div className={css.container}>
        <div className={css.counter__content}>
          <Row gutter={[16, 16]}>
            <Col lg={6} sm={12} xs={24} className={css.coll}>
              <div className={css.counter__item}>
                <div className={css.counter__item__text}>
                  <MdStore size={50} color="#fff"></MdStore>
                  <h2 className={css.counter_num}>230</h2>
                  <p>Nationwide Stores</p>
                </div>
              </div>
            </Col>
            <Col lg={6} sm={12} xs={24} className={css.coll}>
              <div className={[css.counter__item, css.second__item].join(" ")}>
                <div className={css.counter__item__text}>
                  <FaUserTie size={45} color="#fff"></FaUserTie>

                  <h2 className={css.counter_num}>10680</h2>
                  <p>Loyal customer</p>
                </div>
              </div>
            </Col>
            <Col lg={6} sm={12} xs={24} className={css.coll}>
              <div className={[css.counter__item, css.third__item].join(" ")}>
                <div className={css.counter__item__text}>
                  <GoPackage size={45} color="#fff"></GoPackage>

                  <h2 className={css.counter_num}>1068</h2>
                  <p>Perspective clients</p>
                </div>
              </div>
            </Col>
            <Col lg={6} sm={12} xs={24} className={css.coll}>
              <div className={[css.counter__item, css.four__item].join(" ")}>
                <div className={css.counter__item__text}>
                  <HiOutlineClock size={45} color="#fff"></HiOutlineClock>
                  <h2 className={css.counter_num}>1068</h2>
                  <p>Compled Projects</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}
