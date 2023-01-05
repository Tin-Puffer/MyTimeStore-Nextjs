import { intro } from "../../public/staticImage";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import css from "./headerStyle.module.scss";

interface HeaderProps {
  page?: string;
  img?: string;
}

export function HeaderContact({ page, img }: HeaderProps) {
  
  return (
    <div className={css.headerContainer}>
      <div className={css.coverLayout}>
        <div
          style={{ backgroundImage: `url(${img || intro.src})` }}
          className={[css.backgroundColorContent, css.fill].join(" ")}
        ></div>
        <div className={[css.overlay, css.fill].join(" ")}></div>
      </div>
      <div className={cssP.gridPoduct} style={{ marginTop: "0px" }}>
        <div className={css.content}>
          <div className={css.titelWapper}>
            <h1 className={css.entryTitle}>{page || "Liên hệ"} </h1>
          </div>
          <div className={css.titleContent}>
            <div className={css.titleBreadCrum}>
              <nav>
                <span>Trang chủ</span> <span className={css.driver}>/</span>{" "}
                <span className={css.pageNow}>{page || "Liên hệ"} </span>
              </nav>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
