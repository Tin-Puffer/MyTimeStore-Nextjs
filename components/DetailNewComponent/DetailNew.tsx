import { Row, Col } from "antd";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssN from "../NewComponent/newsStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";

import cssC from "../CategoryComponent/ContainerStyle.module.scss";
import { SearchNews } from "../NewComponent/Search";
import css from "./detailStyle.module.scss";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  LinkedinShareButton,
  TelegramShareButton,
  TelegramIcon,
  LinkedinIcon,
} from "react-share";
export function DetailNew() {
  return (
    <div className={css.container}>
      <div className={cssP.gridPoduct} style={{ marginTop: "40px" }}>
        <div style={{ marginBottom: "40px" }}>
          <Row>
            <Col xs={24} sm={24} md={18}>
              <div className={cssN.itemContainer}>
                <div
                  className={cssC.itemContainer}
                  style={{ cursor: "default" }}
                >
                  <div className={css.newTitel}>
                    <div>
                      <p>Tin tức</p>
                      <h1 className="entry-title">
                        Aerolithe Performance Titanium Watch
                      </h1>
                      <div className={cssS.driver}></div>
                    </div>
                  </div>
                  <div className={css.imgContainer}>
                    <img
                      src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/12/blog8-1024x683.jpg"
                      width={1020}
                      height={680}
                      className={css.newImg}
                    ></img>
                    <div className={cssN.datePost} style={{ left: "-10px" }}>
                      <div className={cssN.contenPost}>
                        <p>03</p>
                        <p>Th12</p>
                      </div>
                    </div>
                  </div>
                  <div className={css.newTitel}>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      official.
                    </span>
                    <ul className={css.shareSocial}>
                      <li>
                        <FacebookShareButton url="/hsd">
                          <FacebookIcon size={45} round={true} />
                        </FacebookShareButton>
                      </li>
                      <li>
                        <TwitterShareButton url="/hsd">
                          <TwitterIcon size={45} round={true} />
                        </TwitterShareButton>
                      </li>
                      <li>
                        <TelegramShareButton url="/https://github.com/nygardk/react-share">
                          <TelegramIcon size={45} round={true} />
                        </TelegramShareButton>
                      </li>
                      <li>
                        <PinterestShareButton
                          media="https://iili.io/D318ZB.jpg"
                          url="/hsd"
                        >
                          <PinterestIcon size={45} round={true} />
                        </PinterestShareButton>
                      </li>
                      <li>
                        <LinkedinShareButton url="/hsd">
                          <LinkedinIcon size={45} round={true} />
                        </LinkedinShareButton>
                      </li>
                    </ul>
                  </div>
                    <footer className={css.footerPost}>
                      This entry was posted in Tin tức . Bookmark the{" "}
                      <span>permalink</span>.{" "}
                    </footer>   
                </div>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={6}
              style={{ borderLeft: " 1px solid #ececec" }}
            >
              <div className={cssN.itemContainer}>
                <SearchNews></SearchNews>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
