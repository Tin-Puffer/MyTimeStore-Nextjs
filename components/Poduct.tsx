import css from "./ProductStyle.module.scss";
import cssL from "./LayoutComponent/DfHeaderLogo.module.scss";
import { useRouter } from "next/router";
import { product } from "../common/product/interface";
import { formatNew, formatOld } from "../PriceFormat";
import { useAppDispatch, useAppSelector } from "../app/Hook";
import { cartAction } from "../app/splice/cartSlipe";
export function Product({ product }: { product: product }) {
  const router = useRouter();
  const dispactch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.Cid);

  const priceFormat = formatOld(product.price);

  const priceNow = formatNew(product.price, product.deal ,product.endOfSale,product.beginSale);

  function addItemCart(product:product){
    dispactch(cartAction.addCartItem({
      id: product.id,
      quantity: 1,
      cartId: cart,
    }))
  }
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
                {priceNow && (
                  <div className={css.disCount}>-{product.deal}%</div>
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
                        <strong className={cssL.itemOnCart} onClick={()=>addItemCart(product)}>+</strong>
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
          {priceNow ? (
            <>
              <span className={css.after}>{priceFormat} </span>{" "}
              <span> &nbsp;</span>
              <span className={css.before}>{priceNow} </span>
            </>
          ) : (
            <span className={css.before}>{priceFormat} </span>
          )}
        </div>
      </div>
    </div>
  );
}
