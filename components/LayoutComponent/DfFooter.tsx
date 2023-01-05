import cssH from "./DfHeaderLogo.module.scss";
import css from "./DfFooter.module.scss";
import { Col, Row } from "antd";
import { ImLocation } from "react-icons/im";
import { CgPhone } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { BsGithub, BsTwitter, BsPinterest } from "react-icons/bs";
import { FaFacebookF, FaPaperPlane } from "react-icons/fa";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { logo2, slider1 } from "../../public/staticImage";
import Image from "next/image";

export function DfFooter() {
  return (
    <>
      <div
        className={[cssH.headerWapper, css.container].join(" ")}
        style={{ backgroundImage: `url(${slider1.src})` }}
      >
        <div className={cssH.headerMain}>
          <Row>
            <Col className={css.botBox} xs={24} sm={12} md={6}>
              <div className={[css.botBoxContent, css.logo].join(" ")}>
                <div className={css.logo}>
                  <Image
                    alt="sd"
                    height={80}
                    src={logo2}
                    className={css.imgLogo}
                  ></Image>
                </div>
              </div>
            </Col>
            <Col className={css.botBox} xs={24} sm={12} md={6}>
              <div className={css.botBoxContent}>
                <div className={css.reach}>
                  <div className={css.rearchItem}>
                    <ImLocation
                      className={css.rearchIcon}
                      size="40"
                    ></ImLocation>
                    <span>
                      319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM
                    </span>
                  </div>
                  <div className={css.rearchItem}>
                    <CgPhone className={css.rearchIcon} size="28"></CgPhone>
                    <span>076 922 0162</span>
                  </div>
                  <div className={css.rearchItem}>
                    <SiGmail className={css.rearchIcon} size="30"></SiGmail>
                    <span>demonhunterg @gmail.com</span>
                  </div>
                  <div className={css.rearchItem}>
                    <BsGithub className={css.rearchIcon} size="28"></BsGithub>
                    <span>demonhunterp</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col className={css.botBox} xs={24} sm={12} md={6}>
              <div className={css.botBoxContent}>
                <div className={css.boxFollow}>
                  <h3>FOLLOW US</h3>
                  <p>Follow để không bỏ lỡ bất kì ưu đãi nào từ chúng tôi</p>
                  <div className={css.iconFollow}>
                    <FaFacebookF size={29}></FaFacebookF>
                    <AiFillInstagram size={29}></AiFillInstagram>
                    <BsTwitter size={29}></BsTwitter>
                    <AiFillYoutube size={29}></AiFillYoutube>
                    <BsPinterest size={29}></BsPinterest>
                  </div>
                </div>
              </div>
            </Col>
            <Col className={css.botBox} xs={24} sm={12} md={6}>
              <div className={css.botBoxContent}>
                <div className={[css.boxFollow, css.search].join(" ")}>
                  <h3>register</h3>
                  <p>
                    Đăng ký để nhận được được thông tin mới nhất từ chúng tôi.
                  </p>
                  <div className={css.containerInput}>
                    <input placeholder="Email ..."></input>
                    <div className={css.icon}>
                      <FaPaperPlane
                        size={13}
                        className={css.iconSend}
                      ></FaPaperPlane>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className={css.copyright}>
        <p>© Bản quyền thuộc về . Thiết kế website MonaMedia Mona Media</p>
      </div>
    </>
  );
}
