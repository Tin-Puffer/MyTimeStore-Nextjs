import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import cssC from "../CategoryComponent/ContainerStyle.module.scss";
import css from "./newsStyle.module.scss";
import Link from "next/link";
import { Col, Row } from "antd";
import { SearchNews } from "./Search";
import { Blog } from "../../common/product/interface";
import { HiClock } from "react-icons/hi";
import { PaginationCustom } from "../CategoryComponent/Pagination";
import { useState } from "react";
import { useRouter } from "next/router";

export function NewsItem({ item }: { item: Blog }) {
  const dateObj = new Date(item.time);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const day = dateObj
    .getDate()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

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
              <p>Th{month}</p>
            </div>
          </div>
          <div className={css.decContainer}>
            <h5>{item.name}</h5>
            <div className={cssS.driver}></div>
            <p>{item.decription}</p>
            <p className={css.time}>
              <HiClock
                size={19}
                style={{ transform: "translateY(4px)", marginRight: "5px" }}
              />
              {day}/{month}/{year}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export function News({
  listBlog,
  listnew,
  total,
}: {
  listBlog: Blog[];
  listnew: Blog[];
  total: number;
}) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const handleChangePage = (pages: number) => {
    console.log(pages);
    if (!router.query.search)
      router.push({
        query: { page: pages },
      });
    setPage(pages);
  };

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
                <SearchNews setPage={setPage} listnew={listnew}></SearchNews>
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
                  {listBlog && !router.query.search
                    ? listBlog.map((item, index) => (
                        <Col key={index} xs={24} sm={24} md={8}>
                          <NewsItem item={item} />
                        </Col>
                      ))
                    : listBlog.map((item, index) => {
                        if (index >= page * 9 && index < (page + 1) * 9)
                          return (
                            <Col key={index} xs={24} sm={24} md={8}>
                              <NewsItem item={item} />
                            </Col>
                          );
                      })}
                </Row>
              </div>

              <div
                style={{
                  margin: "20px 0",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <PaginationCustom
                  handleChange={(pageChange: number) =>
                    handleChangePage(pageChange)
                  }
                  total={total}
                  pagenow={page}
                ></PaginationCustom>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
