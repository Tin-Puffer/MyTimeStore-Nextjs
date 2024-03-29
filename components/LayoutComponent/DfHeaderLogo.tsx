import Link from "next/link";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import cssO from "../HomeComponent/OutBlogStyle.module.scss";
import cssF from "./DfFooter.module.scss";
import css from "./DfHeaderLogo.module.scss";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import Image from "next/image";
import openNotification from "../Notifycation/Notification";
import { Col, Row } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { ImUserTie } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { auth } from "../../FireBase/config";
import { BsChevronDown } from "react-icons/bs";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { User } from "firebase/auth";
import { LogoutUser } from "../../FireBase/authService";
import { logo, avatar, empty } from "../../public/staticImage";
import { useAppDispatch, useAppSelector, useDebounce } from "../../app/Hook";
import { authAction } from "../../app/splice/authSlipe";
import { checkSale, formatNew, formatOld } from "../../PriceFormat";
import { ProductHomeAPI } from "../../pages/api/productAPI/Home";
import { product } from "../../common/product/interface";
import { useRouter } from "next/router";
import { BranList } from "../../common/constag";
import {
  cartAction,
  covertProductList,
  ProductSlI,
} from "../../app/splice/cartSlipe";
export function CartItem({
  item,
  search = false,
}: {
  item: ProductSlI;
  search?: boolean;
}) {
  const dispactch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.Cid);
  const priceSale = formatNew(
    item.price,
    item.discount,
    item.endSale,
    item.beginSale
  );

  const price = formatOld(item.price);
  const deleteCartItem = async (item: ProductSlI) => {
    dispactch(
      cartAction.deleteCartItem({
        id: item.Pid,
        quantity: item.quantity,
        cartId: cart,
      })
    );
  };
  return (
    <>
      {!search && (
        <span
          className={css.remove}
          onClick={(e) => {
            e.stopPropagation();
            deleteCartItem(item);
          }}
        >
          x
        </span>
      )}
      <Link href={"/product/[id]"} as={`/product/${item.Pid}`}>
        <p className={css.nameProductItem}>
          {item.name}
          <Image
            alt="Picture of the author"
            width={60}
            height={60}
            src={item.image}
          ></Image>
        </p>
        {!search ? (
          <p className={css.quantity}>
            {item.quantity} {"x"}
            {priceSale ? <span>{priceSale}</span> : <span>{price}</span>}
          </p>
        ) : (
          <>{priceSale ? <span>{priceSale}</span> : <span>{price}</span>}</>
        )}
      </Link>
    </>
  );
}
export function SearchBox({ listPd }: { listPd: product[] }) {
  const list = covertProductList(listPd);
  return (
    <>
      {list.length > 0 ? (
        <div className={css.listItem}>
          <ul className={css.list}>
            {list.map((item: any, index: number) => (
              <li key={index}>
                <CartItem item={item} search={true}></CartItem>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={css.listItem} style={{ padding: "0" }}>
          Không có sản phẩm
        </div>
      )}
    </>
  );
}
export function ListCart({ listPd, total }: { listPd: any[]; total: string }) {
  return (
    <>
      {listPd.length > 0 ? (
        <div className={css.listItem}>
          <ul className={css.list}>
            {listPd.map((item, index) => (
              <li key={index}>
                <CartItem item={item}></CartItem>
              </li>
            ))}
          </ul>
          <p className={css.totalPrice}>
            <strong>Tổng:</strong>
            {"  "}
            <span>{total}</span>
          </p>
          <div className={css.bnt}>
            <div
              className={cssS.button}
              style={{
                fontSize: "18px",
                width: "100%",
                textAlign: "center",
              }}
            >
              <Link href={"/cart"}>
                <p style={{ padding: "8px 18px" }}>XEM GIỎ HÀNG</p>
              </Link>
            </div>
            <div
              className={cssS.button}
              style={{
                marginTop: ".5em",
                fontSize: "18px",
                backgroundColor: "#d26e4b",
                width: "100%",
                textAlign: "center",
              }}
            >
              <Link href={"/checkout"}>
                <p
                  style={{
                    padding: "8px 18px",
                    textTransform: "uppercase",
                  }}
                >
                  thanh toán
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={css.listItem} style={{ padding: "0" }}>
          <div
            style={{
              backgroundImage: `url(${empty.src})`,
              backgroundSize: "200%",
              backgroundPosition: "center",
              height: "150px",
              width: "100%",
            }}
          ></div>
        </div>
      )}
    </>
  );
}

export function DefaultHeaderLogo() {
  const [openNav, setOpenNav] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [onCart, setonCart] = useState(true);
  const [search, setSearch] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const [drop, setDrop] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispactch = useAppDispatch();
  const router = useRouter();
  const [activeSearchReoult, setActiveSearchReoult] = useState(false);
  const [listSearch, setListSearch] = useState<product[]>([]);
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && searchTerm.length) {
      router.push("/category/search?value=" + searchTerm);
      handleSearchChange("");
      setActiveSearchReoult(false);
      setSearch(false);
    }
  };
  const runSearchCallback = useCallback(async (id: string) => {
    if (id) {
      const resoult = await ProductHomeAPI.getProductSearch(id);
      setListSearch(resoult);
      setActiveSearchReoult(true);
    }
  }, []);
  const { searchTerm, handleSearchChange } = useDebounce(
    runSearchCallback,
    2000
  );
  useEffect(() => {
    if (searchTerm == "") setActiveSearchReoult(false);
  }, [searchTerm]);
  const divRef = useRef<HTMLDivElement>(null);
  const listInCart: ProductSlI[] = useAppSelector(
    (state) => state.cart.ProductSl
  );
  useEffect(() => {
    function handleClickOutside(event: any) {
      setActiveSearchReoult(false);
      handleSearchChange("");
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [divRef]);
  useEffect(() => {
    setQuantity(listInCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotal(
      formatOld(
        listInCart.reduce((acc, item) => {
          return (
            acc +
            (checkSale(
              item.price,
              item.discount,
              item.endSale,
              item.beginSale
            ) || item.price) *
              item.quantity
          );
        }, 0)
      )
    );
  }, [listInCart]);

  useEffect(() => {
    if (user) {
      dispactch(authAction.LoginUser(user.uid));
      dispactch(cartAction.LoadingCart(user.uid));
    }
  }, [user]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [auth]);
  useEffect(() => {
    openNav || openCart
      ? document.querySelector(".deflultLayout")?.classList.add("hide")
      : document.querySelector(".deflultLayout")?.classList.remove("hide");
  }, [openNav, openCart]);
  return (
    <div
      className={[
        css.LayoutContent,
        (openNav || openCart) && css.disbleRoll,
      ].join(" ")}
    >
      <div className={css.headerWapper}>
        <div className={css.headerMain}>
          <Row>
            <Col xs={4} sm={4} md={0}>
              <div className={css.menuICon} onClick={() => setOpenNav(true)}>
                <FiMenu size="29px" />
              </div>
            </Col>
            <Col xs={16} sm={16} md={6}>
              <div className={css.logoCenter}>
                <div className={css.logo}>
                  <Link href={"/"}>
                    <Image
                      loading="lazy"
                      alt="sd"
                      height={80}
                      src={logo}
                    ></Image>
                  </Link>
                </div>
              </div>
            </Col>
            <Col span={0} md={{ span: 18, offset: 0 }}>
              <div className={css.itemIcon}>
                <div
                  className={[css.searchContainer, search && css.active].join(
                    " "
                  )}
                >
                  <input
                    ref={searchInput}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                    className={[css.searchInout, cssD.boxInput].join(" ")}
                  ></input>
                  <div
                    className={[
                      css.cartView,
                      cssD.boxInput,
                      activeSearchReoult && css.showBox,
                    ].join(" ")}
                  >
                    <div className={css.contentView} ref={divRef}>
                      <SearchBox listPd={listSearch}></SearchBox>
                    </div>
                  </div>
                </div>

                <ul style={{ margin: 0, display: "flex" }}>
                  <li
                    onClick={() => {
                      search || searchInput.current?.focus();
                      setSearch((pr) => !pr);
                    }}
                  >
                    <div className={css.Icon}>
                      <AiOutlineSearch size="20px" />
                    </div>
                  </li>
                  <li className={css.CartHover}>
                    <div className={css.Icon} style={{ padding: "0 20px" }}>
                      {user ? (
                        <>
                          <div
                            className={css.userAvata}
                            style={{
                              backgroundImage: `url(${
                                user.photoURL || avatar.src
                              })`,
                            }}
                          ></div>
                          <span className={css.userName}>
                            {user ? user.displayName || user.email : ""}
                          </span>
                          <div
                            className={[css.cartView, cssD.boxInput].join(" ")}
                            style={{ minWidth: "200px" }}
                          >
                            <div>
                              <ul className={css.userMenu}>
                                <li
                                  onClick={() => {
                                    LogoutUser(auth);
                                    setUser(null);
                                    dispactch(authAction.clearUser());
                                    dispactch(cartAction.clearCart());
                                  }}
                                >
                                  <GoSignOut
                                    size={20}
                                    style={{
                                      marginBottom: "-4px",
                                      marginRight: "5px",
                                    }}
                                  ></GoSignOut>
                                  đăng xuất{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ padding: "5px 0" }}>
                            <ImUserTie size="20px" />
                          </div>
                          <div
                            className={[css.cartView, cssD.boxInput].join(" ")}
                            style={{ minWidth: "200px" }}
                          >
                            <div>
                              <ul className={css.userMenu}>
                                <Link href={"/login"}>
                                  <li>
                                    <GoSignIn
                                      size={20}
                                      style={{
                                        marginBottom: "-4px",
                                        marginRight: "5px",
                                      }}
                                    ></GoSignIn>
                                    đăng nhập{" "}
                                  </li>
                                </Link>
                              </ul>
                            </div>
                          </div>
                        </>
                      )}
                      <div className={css.whiteArow}></div>
                    </div>
                  </li>
                  <li className={css.CartHover}>
                    <Link href={"/cart"}>
                      <p
                        style={{
                          marginLeft: "10px",
                          fontWeight: 600,
                          display: "inline-block",
                          lineHeight: "32px",
                        }}
                      >
                        {listInCart.length > 0 ? total : "Empty Cart"}

                        <span className={css.cartIcon}>
                          <strong className={css.itemOnCart}>{quantity}</strong>
                        </span>
                      </p>
                    </Link>
                    <div className={[css.cartView, cssD.boxInput].join(" ")}>
                      <div className={css.contentView}>
                        <ListCart listPd={listInCart} total={total}></ListCart>
                      </div>
                    </div>
                    <div className={css.whiteArow}></div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={4} sm={4} md={0}>
              <div className={css.itemIcon} onClick={() => setOpenCart(true)}>
                <ul style={{ margin: 0, display: "flex" }}>
                  <span className={css.cartIcon}>
                    <strong className={css.itemOnCart}>{quantity}</strong>
                  </span>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div
        className={[css.coverLayout, openNav && css.showCover].join(" ")}
        onClick={() => setOpenNav(false)}
      ></div>
      <div
        className={[css.contentMenu, css.navq, openNav && css.show].join(" ")}
      >
        <div className={css.searchBox}>
          <div className={cssF.containerInput} style={{ height: "35px" }}>
            <input
              placeholder="Tìm kiếm ..."
              className={css.input}
              value={searchTerm}
              onChange={handleSearchChange}
            ></input>
            <div
              className={cssF.icon}
              onClick={() => {
                router.push("/category/search?value=" + searchTerm);
                setOpenNav(false);
              }}
              style={{
                width: "35px",
                backgroundColor: "#cbba9c",
                padding: "0",
              }}
            >
              <FaSearch
                size={18}
                color="white"
                style={{ width: "100%" }}
                className={cssF.iconSend}
              ></FaSearch>
            </div>
          </div>
        </div>
        <ul
          className={css.menuList}
          onClick={() => {
            setOpenNav(false);
          }}
        >
          <Link href={"/"}>
            <li>Trang chủ</li>
          </Link>
          <Link href={"/category/hot"}>
            <li>Sản phẩm Hot</li>
          </Link>
          <Link href={"/category/sale"}>
            <li>Sale</li>
          </Link>
          <Link href={"/category/woman"}>
            <li>Đồng hồ nữ</li>
          </Link>
          <Link href={"/category/man"}>
            <li>Đồng hồ nam</li>
          </Link>

          <li
            style={{ position: "relative" }}
            className={drop ? css.active : ""}
          >
            <p>BRANDS </p>
            <div
              className={css.iconDropDown}
              onClick={(e: any) => {
                e.stopPropagation();

                setDrop((pr) => !pr);
              }}
            >
              <BsChevronDown
                className={[css.iconDown, drop && css.turn].join(" ")}
                size={20}
                style={{ float: "right" }}
              ></BsChevronDown>
            </div>
          </li>

          {drop && (
            <div className={css.subMenu}>
              <ul onClick={() => setDrop(false)}>
                {BranList.map((item, index) => (
                  <Link key={index} href={"/category/brand?value=" + item}>
                    <li>{item}</li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
          <Link href={"/contact"}>
            <li>Liên hệ</li>
          </Link>
          <Link href={"/introduce"}>
            <li>Giới thiệu</li>
          </Link>
          {!user ? (
            <Link href={"/login"}>
              <li>Đăng nhập</li>
            </Link>
          ) : (
            <li
              onClick={() => {
                LogoutUser(auth);
                setUser(null);
                setOpenNav(false);
                dispactch(authAction.clearUser());
                dispactch(cartAction.clearCart());
              }}
            >
              <GoSignOut
                size={20}
                style={{
                  marginBottom: "-4px",
                  marginRight: "5px",
                }}
              ></GoSignOut>
              đăng xuất{" "}
            </li>
          )}
          <a href="tel:+4733378901">
            <li className={css.Telme}>
              <p>HOTLINE: 076 922 1111</p>
            </li>
          </a>
        </ul>
      </div>

      <div
        className={[css.coverLayout, openCart && css.showCover].join(" ")}
        onClick={() => setOpenCart(false)}
      ></div>

      <div
        className={[css.contentMenu, css.cart, openCart && css.show].join(" ")}
      >
        <div className={css.cartContainer} style={{ padding: "30px 20px" }}>
          <h1>Giỏ Hàng</h1>
          <div
            className={cssO.driver}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "30px",
            }}
          ></div>
          {onCart ? (
            <div onClick={() => setOpenCart(false)}>
              <ListCart listPd={listInCart} total={total}></ListCart>
            </div>
          ) : (
            <div>Chưa có sản phẩm trong giỏ hàng.</div>
          )}
        </div>
      </div>
    </div>
  );
}
