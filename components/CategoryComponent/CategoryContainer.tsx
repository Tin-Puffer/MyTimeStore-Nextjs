import cssT from "./TitleStyle.module.scss";
import cssPc from "../ProductStyle.module.scss";
import cssL from "../LayoutComponent/DfHeaderLogo.module.scss";
import css from "./ContainerStyle.module.scss";
import Link from "next/link";
import Image from "next/image";
import openNotification from "../Notifycation/Notification";
import { Col, Row, Slider } from "antd";
import { useState, useEffect } from "react";
import { product } from "../../common/product/interface";
import { checkSale, formatNew, formatOld } from "../../PriceFormat";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/Hook";
import { cartAction } from "../../app/splice/cartSlipe";
import { BranList } from "../../common/constag";
import { filterAction } from "../../app/splice/categoryFilterSlipe";
import { PaginationCustom } from "./Pagination";

export function SliderInput() {
  const dispatch = useAppDispatch();
  const rage = useAppSelector((state) => state.filter.range);
  const [value, setValue] = useState([0, 0]);
  const setRangeFilter = () => {
    dispatch(
      filterAction.setRangeFilter({ maxPrice: value[1], minPrice: value[0] })
    );
  };

  useEffect(() => {
    setValue([rage.minPrice, rage.maxPrice]);
  }, [rage]);
  return (
    <>
      <Slider
        tooltip={{ formatter: null }}
        range={{ draggableTrack: true }}
        max={rage.maxPrice}
        min={rage.minPrice}
        step={100000}

        className={css.slider_input}
        onAfterChange={(e: any) => setValue([e[0], e[1]])}
        dots={false}
      />
      <button className={css.filterBtn} onClick={setRangeFilter}>
        Lọc
      </button>
      <div className={css.priceLable}>
        Giá <span className="from">{formatOld(value[0])}</span>-{" "}
        <span className="to">{formatOld(value[1])}</span>
      </div>
    </>
  );
}

export function CategoryLeft({ interest }: { interest: product[] }) {
  return (
    <>
      <aside className={css.wide}>
        <span className={css.title}>Danh mục sản phẩm</span>
        <ul className={css.product_categories}>
          <li>
            <Link href={"/category/hot"}>
              <p>sản phẩm hot</p>
            </Link>
          </li>
          <li>
            <Link href={"/category/gender?value=woman"}>
              <p>đồng hồ nữ</p>
            </Link>
          </li>
          <li>
            <Link href={"/category/gender?value=man"}>
              <p>đồng hồ nam</p>
            </Link>
          </li>
          <li>
            <Link href={"/category/gender?value=couple"}>
              <p>couple</p>
            </Link>
          </li>
          {BranList.map((item, index) => (
            <Link key={index} href={"/category/brand?value=" + item}>
              <li>{item}</li>
            </Link>
          ))}
        </ul>
      </aside>
      <aside className={css.wide}>
        <span className={css.title}>LỌC THEO GIÁ</span>
        <SliderInput />
      </aside>
      <aside className={css.wide}>
        <span className={css.title}>Quan tâm</span>
        <ul className={css.product_categories}>
          {interest.map((item, index) => {
            const sale = checkSale(
              item.price,
              item.sale?.discount,
              item.sale?.end,
              item.sale?.begin
            );
            return (
              <li key={index}>
                <Link href={"/product/" + item.id}>
                  <div className={css.productItem}>
                    <Image
                      alt="error"
                      width="60"
                      height="60"
                      src={item.image[0]}
                    />
                    <div style={{ padding: "0 5px" }}>
                      <p>{item.name}</p>
                      <div className={css.price}>
                        {sale ? (
                          <>
                            <del className={css.old}>
                              <div>{formatOld(item.price)}</div>
                            </del>
                            <ins className={css.new}>
                              <span>{formatOld(sale)}</span>
                            </ins>
                          </>
                        ) : (
                          <ins className={css.new}>
                            <span>{formatOld(item.price)}</span>
                          </ins>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
export function ProductItem({ product }: { product: product }) {
  const priceFormat = formatOld(product.price);
  const loading = useAppSelector((state) => state.cart.loading);
  const cart = useAppSelector((state) => state.cart.Cid);
  const islogin = useAppSelector((state) => state.auth.isLogin);

  const dispactch = useAppDispatch();
  const router = useRouter();
  const priceNow = formatNew(
    product.price,
    product.sale?.discount,
    product.sale?.end,
    product.sale?.begin
  );
  function addItemCart(productID: string) {
    if (islogin) {
      if (!loading) {
        dispactch(
          cartAction.addCartItem({
            id: productID,
            quantity: 1,
            cartId: cart,
          })
        );
      } else
        openNotification("notiifyWanning", "an operation is being processed");
    } else
      openNotification(
        "notiifyError",
        "Login is required to use this function"
      );
  }
  return (
    <div
      className={css.itemContainer}
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div
        className={css.img}
        style={{
          backgroundImage: `url("${product.image[0]}")`,
        }}
      >
        <ul
          style={{ margin: 0, display: "flex" }}
          onClick={(e) => {
            e.stopPropagation();
            addItemCart(product.id);
          }}
        >
          <span className={[cssL.cartIcon, css.cartIcon].join(" ")}>
            <strong className={cssL.itemOnCart}>+</strong>
          </span>
        </ul>
      </div>
      <div className={css.decript}>
        {priceNow && (
          <div className={[cssPc.disCount, css.iconDiscount].join(" ")}>
            -{product.sale?.discount}%
          </div>
        )}
        <span className={css.name}>{product.name}</span>
        <div
          className={[css.price, css.Item].join(" ")}
          style={{ textAlign: "center" }}
        >
          {priceNow && (
            <del className={css.old}>
              <span>
                <span>{priceFormat}</span>
                <span> &nbsp;</span>
              </span>
            </del>
          )}
          <ins className={css.new}>
            <span>
              <span>{priceNow || priceFormat}</span>
            </span>
          </ins>
        </div>
      </div>
    </div>
  );
}
export function CategoryContainer({
  list,
  interest,
}: {
  list: product[];
  interest: product[];
}) {
  const [listShow, setListShow] = useState<product[]>(list);
  const sort = useAppSelector((state) => state.filter.sort);
  const [page, setPage] = useState(0);

  const rangeFilter = useAppSelector((state) => state.filter.rangeFilter);
  const currenPrice = (cur: product) => {
    return (
      checkSale(
        cur.price,
        cur.sale?.discount,
        cur.sale?.end,
        cur.sale?.begin
      ) || cur.price
    );
  };
  const handleSort = () => {
    let curentlist = [...listShow];
    if (sort == 2) curentlist.sort((a, b) => a.figures.sold - b.figures.sold);
    else if (sort == 3)
      curentlist.sort((a, b) => currenPrice(a) - currenPrice(b));
    else if (sort == 4)
      curentlist.sort((a, b) => currenPrice(b) - currenPrice(a));
    else curentlist.sort((a, b) => a.kho - b.kho);
    return curentlist;
  };
  const handleFilter = () => {
    setListShow(
      list.filter(
        (item) =>
          currenPrice(item) >= rangeFilter.minPrice &&
          currenPrice(item) <= rangeFilter.maxPrice
      )
    );
    setPage(0);
  };

  useEffect(() => {
    if (listShow.length > 1) setListShow(handleSort());
  }, [sort]);
  useEffect(() => {
    if (rangeFilter.minPrice !== 0) handleFilter();
  }, [rangeFilter]);
  useEffect(() => {
    setListShow(list);
    setPage(0);
  }, [list]);
  return (
    <div className={cssT.container}>
      <Row gutter={[20, 16]}>
        <Col xs={0} md={0} lg={6}>
          <CategoryLeft interest={interest}></CategoryLeft>
        </Col>
        <Col xs={24} md={24} lg={18} style={{ margin: "30px 0" }}>
          <Row gutter={[20, 30]}>
            {listShow.map((item, index) => {
              if (index >= page * 12 && index < (page + 1) * 12) {
                return (
                  <Col key={index} xs={12} sm={12} md={8}>
                    <ProductItem product={item}></ProductItem>
                  </Col>
                );
              }
            })}
          </Row>
          <div
            style={{
              margin: "20px 0",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <PaginationCustom
              handleChange={(pageChange: number) => setPage(pageChange)}
              total={Math.ceil(listShow.length / 12)}
              pagenow={page}
            ></PaginationCustom>
          </div>
        </Col>
      </Row>
    </div>
  );
}
