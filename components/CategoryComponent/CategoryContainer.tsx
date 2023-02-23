import { Col, Row, Slider } from "antd";
import { useCallback, useState } from "react";
import cssT from "./TitleStyle.module.scss";
import cssPc from "../ProductStyle.module.scss";
import cssL from "../LayoutComponent/DfHeaderLogo.module.scss";
import css from "./ContainerStyle.module.scss";
import Link from "next/link";
import { product } from "../../common/product/interface";
import { formatNew, formatOld } from "../../PriceFormat";

export function SliderInput() {
  const [a, sa] = useState([1, 700]);
  const handleChange = useCallback((value: any) => {
    sa(value);
  }, []);
  return (
    <>
      <Slider
        range={{ draggableTrack: true }}
        max={700}
        tooltip={{ formatter: null }}
        min={1}
        defaultValue={[1, 700]}
        className={css.slider_input}
        onChange={(e: any) => {
          handleChange(e);
        }}
        onAfterChange={(e: any) => console.log(e)}
        dots={false}
      />
      <button className={css.filterBtn}>Lọc</button>
      <div className={css.priceLable}>
        Giá <span className="from">{a[0]},000,000&nbsp;₫</span> —{" "}
        <span className="to">{a[1]},000,000&nbsp;₫</span>
      </div>
    </>
  );
}

export function CategoryLeft() {
  return (
    <>
      <aside className={css.wide}>
        <span className={css.title}>Danh mục sản phẩm</span>
        <ul className={css.product_categories}>
          <li>Casio</li>
          <li>Citizen</li>
          <li>Đồng hồ cặp đôi</li>
          <li>Đồng hồ nam</li>
          <li>Đồng hồ nữ</li>
          <li>ROLEX</li>
          <li>Sale</li>
          <li>Sản phẩm Hot</li>
        </ul>
      </aside>
      <aside className={css.wide}>
        <span className={css.title}>LỌC THEO GIÁ</span>
        <SliderInput />
      </aside>
      <aside className={css.wide}>
        <span className={css.title}>Quan tâm</span>
        <ul className={css.product_categories}>
          <li>
            <div className={css.productItem}>
              <img
                width="60"
                height="60"
                src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/11/product-11_large-100x100.jpg"
              />{" "}
              <div style={{ padding: "0 5px" }}>
                <p>BULOVA CORPORATION AUTOMATIC MENS WATCH 49MM</p>
                <div className={css.price}>
                  <del className={css.old}>
                    <div className="woocommerce-Price-amount amount">
                      15,400,000&nbsp;
                      <span className="woocommerce-Price-currencySymbol">
                        ₫
                      </span>
                    </div>
                  </del>
                  <ins className={css.new}>
                    <span className="woocommerce-Price-amount amount">
                      14,000,000&nbsp;
                      <span className="woocommerce-Price-currencySymbol">
                        ₫
                      </span>
                    </span>
                  </ins>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={css.productItem}>
              <img
                width="60"
                height="60"
                src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/11/product-11_large-100x100.jpg"
              />{" "}
              <div style={{ padding: "5px" }}>
                <p>BULOVA CORPORATION AUTOMATIC MENS WATCH 49MM</p>
                <div className={css.price}>
                  <del className={css.old}>
                    <div className="woocommerce-Price-amount amount">
                      15,400,000&nbsp;
                      <span className="woocommerce-Price-currencySymbol">
                        ₫
                      </span>
                    </div>
                  </del>
                  <ins className={css.new}>
                    <span className="woocommerce-Price-amount amount">
                      14,000,000&nbsp;
                      <span className="woocommerce-Price-currencySymbol">
                        ₫
                      </span>
                    </span>
                  </ins>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={css.productItem}>
              <img
                width="60"
                height="60"
                src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/11/product-11_large-100x100.jpg"
              />{" "}
              <div style={{ padding: "5px" }}>
                <p>BULOVA CORPORATION AUTOMATIC MENS WATCH 49MM</p>
                <div className={css.price}>
                  <del className={css.old}>
                    <div className="woocommerce-Price-amount amount">
                      15,400,000&nbsp;
                      <span className="woocommerce-Price-currencySymbol">
                        ₫
                      </span>
                    </div>
                  </del>
                  <ins className={css.new}>
                    <span className="woocommerce-Price-amount amount">
                      14,000,000&nbsp;
                      <span className="woocommerce-Price-currencySymbol">
                        ₫
                      </span>
                    </span>
                  </ins>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={css.productItem}>
              <img
                width="60"
                height="60"
                src="https://mauweb.monamedia.net/rolex/wp-content/uploads/2018/11/product-11_large-100x100.jpg"
              />{" "}
              <div style={{ padding: "5px" }}>
                <p>BULOVA CORPORATION AUTOMATIC MENS WATCH 49MM</p>
                <div className={css.price}>
                  <del className={css.old}>
                    <div className="woocommerce-Price-amount amount">
                      15,400,000&nbsp;
                      <span className="woocommerce-Price-currencySymbol">
                        ₫
                      </span>
                    </div>
                  </del>
                  <ins className={css.new}>
                    <span className="woocommerce-Price-amount amount">
                      14,000,000&nbsp;
                      <span className="woocommerce-Price-currencySymbol">
                        ₫
                      </span>
                    </span>
                  </ins>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
export function ProductItem({ product }: { product: product }) {
  const priceFormat = formatOld(product.price);

  const priceNow = formatNew(product.price, product.deal ? product.deal : 0);
  return (
    <Link href={"/product/hot"}>
      <div className={css.itemContainer}>
        <div
          className={css.img}
          style={{
            backgroundImage: `url("${product.image[0]}")`,
          }}
        >
          <ul style={{ margin: 0, display: "flex" }}>
            <span className={[cssL.cartIcon, css.cartIcon].join(" ")}>
              <strong className={cssL.itemOnCart}>+</strong>
            </span>
          </ul>
        </div>
        <div className={css.decript}>
          {product.deal && (
            <div className={[cssPc.disCount, css.iconDiscount].join(" ")}>
              -{product.deal}%
            </div>
          )}
          <span className={css.name}>{product.name}</span>
          <div
            className={[css.price, css.Item].join(" ")}
            style={{ textAlign: "center" }}
          >
            {product.deal&&(

            <del className={css.old}>
              <span>
                <span>{priceFormat}</span>
                <span> &nbsp;</span>
              </span>
            </del>
            )}
            <ins className={css.new}>
              <span>
                <span>{priceNow}</span>
              </span>
            </ins>
          </div>
        </div>
      </div>
    </Link>
  );
}
export function CategoryContainer() {
  return (
    <div className={cssT.container}>
      <Row gutter={[20, 16]}>
        <Col xs={0} md={0} lg={6}>
          <CategoryLeft></CategoryLeft>
        </Col>
        <Col xs={24} md={24} lg={18} style={{ margin: "30px 0" }}>
          <Row gutter={[20, 30]}>
            {/* <Col xs={12} sm={12} md={8}>
              <ProductItem></ProductItem>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <ProductItem></ProductItem>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <ProductItem></ProductItem>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <ProductItem></ProductItem>
            </Col>
            <Col xs={12} sm={12} md={8}>
              <ProductItem></ProductItem>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
