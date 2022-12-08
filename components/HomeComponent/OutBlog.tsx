import cssP from "./ProductStyle.module.scss";
import css from "./OutBlogStyle.module.scss";
import { Carousel, Col } from "antd";

export function OutBlog() {
  const x = [1, 2, 3, 4, 5, 6];
  return (
    <div className={cssP.container}>
      <div className={cssP.title}>
        <p>360° COLLECTION</p>
      </div>
      <div className={cssP.lable}>
        <p>FEATURED</p> <p>PRODUCTS</p>
      </div>
      <div className={cssP.gridPoduct}>
        <div className={css.Content}>
          <Carousel slidesToShow={3} style={{ display: "flex" }}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>12</div>
            <div>23</div>
            <div>34</div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
