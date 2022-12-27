import css from "./ProductStyle.module.scss";
import cssL from "./LayoutComponent/DfHeaderLogo.module.scss";
export function Product() {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <div style={{ position: "relative", height: "100%" }}>
          <div className={css.Img}>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
                <div className={css.disCount}>-55%</div>
              <div className={css.addItemBnt}>
                <div className={cssL.itemIcon}>
                  <ul style={{ margin: '10px', display: "flex" }}>
                    <span className={cssL.cartIcon}>
                      <strong className={cssL.itemOnCart}>+</strong>
                    </span>
                  </ul>
                </div>
             
              </div>
            </div>
          </div>
          <div className={css.decript}>
            <div className={css.name}>
              <span>BIG BANG MXM18 SANG BLEU 39</span>
            </div>
            <div className={css.price}>
              <span>18,330,000 ₫ </span> <span> &nbsp;</span>
              <span>8,330,000 ₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
