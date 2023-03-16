import { Col, Row } from "antd";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import cssC from "../CategoryComponent/ContainerStyle.module.scss";

import css from "./newsStyle.module.scss";
import { SearchNews } from "./Search";
import Link from "next/link";
import { Blog } from "../../common/product/interface";
import { timeAgo } from "../DetailProductComponent";
export function NewsItem({ item }: { item: Blog }) {
  const dateObj = new Date(item.time);
  const day = dateObj.getDate();
  const month = "Th" + (dateObj.getMonth() + 1).toString().padStart(2);
  return (
    <Link href={"/news/" + item.id}>
      <div className={cssC.itemContainer}>
        <div className={css.item}>
          <div style={{ position: "relative" }}></div>
          <div className={css.BgcContaniner}>
            <div
              className={css.bgcNEw}
              style={{ backgroundImage: `url("${item.thumnail}")` }}
            ></div>
          </div>
          <div className={css.datePost}>
            <div className={css.contenPost}>
              <p>{day}</p>
              <p>{month}</p>
            </div>
          </div>
          <div className={css.decContainer}>
            <h5>{item.name}</h5>
            <div className={cssS.driver}></div>
            <p>{item.decription}</p>
            <p className={css.time}>{timeAgo(item.time)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export function News({
  listBlog,
  listnew,
}: {
  listBlog: Blog[];
  listnew: Blog[];
}) {
  console.log(listBlog);
  return (
    <div className={css.container}>
      <div className={cssP.gridPoduct} style={{ marginTop: "30px" }}>
        <div className={css.titlePage}>
          <desc> Tin tức</desc>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <Row>
            <Col xs={24} sm={24} md={6} className={css.changeOder}>
              <div className={css.itemContainer}>
                <SearchNews listnew={listnew}></SearchNews>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={18}
              style={{ borderLeft: " 1px solid #ececec" }}
            >
              <div className={css.itemContainer}>
                <Row gutter={[30, 20]}>
                  {listBlog &&
                    listBlog.map((item, index) => (
                      <Col key={index} xs={24} sm={24} md={8}>
                        <NewsItem item={item} />
                      </Col>
                    ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
