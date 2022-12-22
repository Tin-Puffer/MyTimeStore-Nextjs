import { FaSearch } from "react-icons/fa";
import cssF from "../LayoutComponent/DfFooter.module.scss";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import css from "./searchStyle.module.scss";
export function SearchNews() {
  return (
    <div className={css.container}>
      <div className={css.searchBox}>
        <div
          className={cssF.containerInput}
          style={{ height: "40px", margin: 0 }}
        >
          <input
            placeholder="Tìm kiếm ..."
            className={[cssD.boxInput, css.inputDiscount].join(" ")}
          ></input>
          <div
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
          <li>
            <div className={css.post}>
              <div style={{ marginRight: "15px" }}>
                <div className={css.badgeInner}></div>
              </div>

              <div className={css.namepost}>
                Aerolithe Performance Titanium Watch
                <span className="post_comments op-7 block is-xsmall">
                  <a href="https://mauweb.monamedia.net/rolex/aerolithe-performance-titanium-watch/#respond"></a>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className={css.post}>
              <div style={{ marginRight: "15px" }}>
                <div className={css.badgeInner}></div>
              </div>

              <div className={css.namepost}>
                Aerolithe Performance Titanium Watch
                <span className="post_comments op-7 block is-xsmall">
                  <a href="https://mauweb.monamedia.net/rolex/aerolithe-performance-titanium-watch/#respond"></a>
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className={css.post}>
              <div style={{ marginRight: "15px" }}>
                <div className={css.badgeInner}></div>
              </div>

              <div className={css.namepost}>
                Aerolithe Performance Titanium Watch
                <span className="post_comments op-7 block is-xsmall">
                  <a href="https://mauweb.monamedia.net/rolex/aerolithe-performance-titanium-watch/#respond"></a>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
