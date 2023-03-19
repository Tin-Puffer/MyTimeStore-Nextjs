import cssH from "./DfHeaderLogo.module.scss";
import css from "./DfFooter.module.scss";
import Image from "next/image";
import { Col, Row } from "antd";
import { ImLocation } from "react-icons/im";
import { CgPhone } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { BsGithub, BsTwitter, BsPinterest } from "react-icons/bs";
import { FaFacebookF, FaPaperPlane } from "react-icons/fa";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { logo2, slider1 } from "../../public/staticImage";
import Link from "next/link";

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
                      97 Man Thiện, Phường Hiệp phú, Quận 9, Tp.Thủ Đức
                    </span>
                  </div>
                  <div className={css.rearchItem}>
                    <CgPhone className={css.rearchIcon} size="28"></CgPhone>
                    <span>076 922 111</span>
                  </div>
                  <div className={css.rearchItem}>
                    <SiGmail className={css.rearchIcon} size="30"></SiGmail>
                    <span>akumaraito10@gmail.com</span>
                  </div>
                  <div className={css.rearchItem}>
                    <BsGithub className={css.rearchIcon} size="28"></BsGithub>
                    <span>TinPuffer</span>
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
                    <Link
                      href={
                        "https://www.facebook.com/profile.php?id=100089914000286"
                      }
                    >
                      <FaFacebookF size={29}></FaFacebookF>
                    </Link>
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
