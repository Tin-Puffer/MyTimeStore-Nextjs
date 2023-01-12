import css from "./ProductStyle.module.scss";
import cssL from "./LayoutComponent/DfHeaderLogo.module.scss";
import { useRouter } from "next/router";
import { product } from "../common/product/interface";
export function Product({ product }: { product: product }) {
  const router = useRouter();
  const priceFormat = product.price.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
  });
  var priceNow = "";
  if (product.deal)
    priceNow = ((product.price / 100) * (100 - product.deal)).toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "VND",
      }
    );
  return (
    <div
      className={css.cardContainer}
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div className={css.container}>
        <div className={css.content}>
          <div style={{ position: "relative", height: "100%" }}>
            <div
              className={css.Img}
              style={{ backgroundImage: `url("${product.image[0]}")` }}
            >
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                {product.deal && (
                  <div className={css.disCount}>{product.deal}%</div>
                )}
                <div className={css.addItemBnt}>
                  <div className={cssL.itemIcon}>
                    <ul style={{ marginBottom: "15px", display: "flex" }}>
                      <span
                        className={cssL.cartIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <strong className={cssL.itemOnCart}>+</strong>
                      </span>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.decript}>
        <div className={css.name}>
          <span>{product.name}</span>
        </div>
        <div className={css.price}>
          {product.deal ? (
            <>
              <span className={css.after}>{priceFormat} ₫</span>{" "}
              <span> &nbsp;</span>
              <span className={css.before}>{priceNow} ₫</span>
            </>
          ) : (
            <span className={css.before}>{priceFormat} ₫</span>
          )}
        </div>
      </div>
    </div>
  );
}
