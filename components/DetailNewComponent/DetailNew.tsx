import { Row, Col } from "antd";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssN from "../NewComponent/newsStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
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
import MyFacebookComments from "../FbComment";
import Link from "next/link";
import { timeAgo } from "../DetailProductComponent";
export function DetailNew({
  detailNew,
  blog,
}: {
  detailNew: DetailNewType;
  blog: Blog;
}) {
  const dateObj = new Date(blog.time);
  const day = dateObj.getDate();
  const month = "Th" + (dateObj.getMonth() + 1).toString().padStart(2);
  const [url, setUrl] = useState<string>(
    `https://mytimestore.vercel.app/news/${blog.id}`
  );

  const [next, setNext] = useState<Blog>();
  const [prev, setPrev] = useState<Blog>();
  const [sameBlog, setSameBlog] = useState<Blog[]>();

  const router = useRouter();
  const loadDataNew = async () => {
    const nw: Blog[] = await BlogAPI.getNewBlog();
    nw && setSameBlog(nw);
  };

  const loadData = async () => {
    const nx: Blog = await BlogAPI.getBlogNext(blog.id);
    nx && setNext(nx);

    const pr: Blog = await BlogAPI.getBloPrev(blog.id);

    pr && setPrev(pr);
  };

  useEffect(() => {
    loadDataNew();
  }, []);
  useEffect(() => {
    loadData();
    setUrl("https://mytimestore.vercel.app/news/" + blog.id);
  }, [blog]);
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
                      <Link href={"/news"}>
                        <p style={{ textDecoration: "underline" }}>Tin tức</p>
                      </Link>
                      <h1>{blog.name}</h1>
                      <div className={cssS.driver}></div>
                      <p>
                        Post by {blog.acName} | {timeAgo(blog.time)}
                      </p>
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
                        <p>{day}</p>
                        <p>{month}</p>
                      </div>
                    </div>
                  </div>
                  <div className={css.newTitel}>
                    {
                      <>
                        <div
                          className={css.FomatBlog}
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
                <div className="fb-comments">
                  <h3>Bình luận</h3>
                  <div className={css.CommentFacebook}>
                    <MyFacebookComments url={url} />
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
                {sameBlog && <SearchNews listnew={sameBlog}></SearchNews>}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
