import { FaSearch } from "react-icons/fa";
import cssF from "../LayoutComponent/DfFooter.module.scss";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import css from "./searchStyle.module.scss";
import { Blog } from "../../common/product/interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export function SearchNews({
  setPage,
  listnew,
}: {
  setPage?: any;
  listnew: Blog[];
}) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (setPage) setPage(0);
    setSearchValue("");
    router.push({
      pathname: "/news",
      query: { search: searchValue },
    });
  };
  return (
    <div className={css.container}>
      <div className={css.searchBox}>
        <div
          className={cssF.containerInput}
          style={{ height: "40px", margin: 0 }}
        >
          <input
            placeholder="Tìm kiếm ..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={[cssD.boxInput, css.inputDiscount].join(" ")}
          ></input>
          <div
            onClick={handleSearch}
            className={cssF.icon}
            style={{
              width: "40px",
              backgroundColor: "#cbba9c",
              padding: "0",
            }}
          >
            <FaSearch
              size={18}
              color="white"
              style={{ width: "100%", marginBottom: "-5px" }}
              className={cssF.iconSend}
            ></FaSearch>
          </div>
        </div>
      </div>
      <div className={css.SameContainer}>
        <h1 className={css.title}>Bài viết mới</h1>
        <ul>
          {listnew &&
            listnew.map((item, index) => (
              <li key={index}>
                <Link href={"/news/" + item.id}>
                  <div className={css.post}>
                    <div style={{ marginRight: "15px" }}>
                      <div
                        className={css.badgeInner}
                        style={{ backgroundImage: `url("${item.thumnail}")` }}
                      ></div>
                    </div>

                    <div className={css.namepost}>
                      {item.name}
                      <span className="post_comments op-7 block is-xsmall"></span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
