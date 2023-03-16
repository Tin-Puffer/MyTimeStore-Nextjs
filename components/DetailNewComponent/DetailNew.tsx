import { Row, Col } from "antd";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssN from "../NewComponent/newsStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import { useEffect, useState } from "react";
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
import { Blog, DetailNewType } from "../../common/product/interface";
import { BlogAPI } from "../../pages/api/Blog";
import { useRouter } from "next/router";
export function DetailNew({
  detailNew,
  blog,
}: {
  detailNew: DetailNewType;
  blog: Blog;
}) {
  const [next, setNext] = useState<Blog>();
  const [prev, setPrev] = useState<Blog>();
  const router = useRouter();
  const loadData = async () => {
    const nx: Blog = await BlogAPI.getBlogNext(blog.id);
    nx && setNext(nx);
    console.log("nx", nx);
    const pr: Blog = await BlogAPI.getBloPrev(blog.id);
    console.log("pr", pr);
    pr && setPrev(nx);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className={css.container}>
      <div className={cssP.gridPoduct} style={{ marginTop: "40px" }}>
        <div style={{ marginBottom: "40px" }}>
          <Row>
            <Col xs={24} sm={24} md={18}>
              <div className={cssN.itemContainer}>
                <div
                  className={cssC.itemContainer}
                  style={{ cursor: "default", marginBottom: "40px" }}
                >
                  <div className={css.newTitel}>
                    <div>
                      <p>Tin tức</p>
                      <h1>{blog.name}</h1>
                      <div className={cssS.driver}></div>
                    </div>
                  </div>
                  <div className={css.imgContainer}>
                    <img
                      src={blog.thumnail}
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
                    {
                      <>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: detailNew.content,
                          }}
                        />
                      </>
                    }
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
                  <Row>
                    <Col span={12}>
                      {prev && (
                        <div
                          className={css.bntChangePost}
                          onClick={() => router.push("/news/" + prev.id)}
                        >
                          <div className={css.changeContainer}>
                            <div>
                              <MdNavigateBefore
                                className={css.iconPriv}
                                size={30}
                              ></MdNavigateBefore>
                            </div>
                            <div className={css.nameBf}>
                              <span>{prev.name}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col span={12} style={{ borderLeft: " 1px solid #ececec" }}>
                      {next && (
                        <div
                          className={css.bntChangePost}
                          onClick={() => router.push("/news/" + next.id)}
                        >
                          <div
                            className={css.changeContainer}
                            style={{ justifyContent: "end" }}
                          >
                            <div className={css.nameBf}>
                              <span>{next.name}</span>
                            </div>
                            <div>
                              <MdNavigateNext
                                className={css.iconPriv}
                                size={30}
                              ></MdNavigateNext>
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
                <div className={css.reply}>
                  <h3>Trả lời</h3>
                  <div className={css.noitify}>
                    <span>Email của bạn sẽ không được hiển thị công khai.</span>
                    Các trường bắt buộc được đánh dấu <span>*</span>
                  </div>
                  <div>
                    <p className={css.title}>Bình luận</p>
                    <div className={css.inputContent}>
                      <textarea
                        className={cssD.boxInput}
                        cols={40}
                        rows={5}
                        style={{ lineHeight: "20px" }}
                      ></textarea>
                    </div>
                  </div>
                  <Row gutter={30}>
                    <Col xs={24} sm={12}>
                      <div>
                        <p className={css.title}>
                          Tên <span>*</span>
                        </p>
                        <input
                          className={[cssD.boxInput, css.Input].join(" ")}
                          type="text"
                        ></input>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div>
                        <p className={css.title}>
                          Email <span>*</span>
                        </p>
                        <input
                          className={[cssD.boxInput, css.Input].join(" ")}
                          type="text"
                        ></input>
                      </div>
                    </Col>
                  </Row>
                  <div
                    className={[cssS.button, css.SubmitContac].join(" ")}
                    style={{ fontSize: "18px" }}
                  >
                    <p style={{ padding: "10px 18px" }}>PHẢN HỒI</p>
                  </div>
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
                {/* <SearchNews ></SearchNews> */}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
