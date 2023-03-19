import cssP from "../HomeComponent/ProductStyle.module.scss";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import css from "./cartStyle.module.scss";
import Link from "next/link";
import openNotification from "../Notifycation/Notification";
import { Col, Row, Select } from "antd";
import { AiFillTag } from "react-icons/ai";
import { QuantityComponent } from "../DetailProductComponent";
import { useAppDispatch, useAppSelector } from "../../app/Hook";
import { useState, useEffect } from "react";
import { cartAction, ProductSlI } from "../../app/splice/cartSlipe";
import { checkSale, formatNew, formatOld, sosanh } from "../../PriceFormat";
import { selectType } from "../CheckOut";
import { useRouter } from "next/router";
import { VoucherAPI } from "../../pages/api/voucherAPI";

export function CartDetail() {
  const dispactch = useAppDispatch();
  const cartList = useAppSelector((state) => state.cart.ProductSl);
  const cartId = useAppSelector((state) => state.cart.Cid);

  const listAddress = useAppSelector(
    (state) => state.auth.currentUser?.address
  );

  const address = useAppSelector((state) => state.auth.currentUser?.address);
  const [province, setProvince] = useState<selectType[]>([]);
  const [addressShow, setAddressShow] = useState<string>(
    address ? address[0] : "Chưa có địa chỉ nhận hàng"
  );
  const router = useRouter();
  const [list, setList] = useState<ProductSlI[]>([]);
  const [total, setTotal] = useState<string>();
  const [voucher, setVoucher] = useState<string>();
  const [code, setCode] = useState<{ name: string; discount: number }>();

  const [showChangeAddress, setShowChangeAddress] = useState(false);
  const [activeCheckOut, setActiveCheckOut] = useState(true);
  async function checkVoucher() {
    if (voucher) {
      const vc = await VoucherAPI.getVoucher(voucher);
      if (vc && sosanh(vc.end, vc.begin)) {
        localStorage.setItem(
          "voucher",
          JSON.stringify({ name: vc.content, discount: vc.reduce })
        );
        setCode({ name: vc.content, discount: vc.reduce });
        openNotification("applyVoucherSuccess", vc.discount);
      } else {
        openNotification("errorVoucher");
      }
    }
  }
  useEffect(() => {
    if (localStorage.getItem("voucher")) {
      const voucherLC = JSON.parse(localStorage.getItem("voucher") || "");
      setCode({ name: voucherLC.name, discount: voucherLC.discount });
    }
  }, []);
  const deleteCartItem = async (item: ProductSlI) => {
    dispactch(
      cartAction.deleteCartItem({
        id: item.Pid,
        quantity: item.quantity,
        cartId: cartId,
      })
    );
  };
  function checkArrays() {
    return cartList.every((item) => {
      const found = list.find(
        (listItem) =>
          listItem.Pid === item.Pid && listItem.quantity === item.quantity
      );
      return found !== undefined;
    });
  }
  const updateCart = () => {
    dispactch(cartAction.updateCart(list));
  };

  useEffect(() => {
    setList(cartList);
  }, [cartList]);
  useEffect(() => {
    if (listAddress && listAddress.length > 1) {
      setProvince(
        listAddress.map((item) => {
          return { value: item, label: item };
        })
      );
    }
  }, [listAddress]);
  useEffect(() => {
    setTotal(
      formatOld(
        list.reduce(
          (acc, item) => {
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
          },
          code ? -code?.discount : 0
        )
      )
    );
    let isActive = false;
    list.forEach((item) => {
      if (item.quantity > item.kho) {
        isActive = true;
      }
    });
    setActiveCheckOut(isActive);
  }, [list, code]);

  const setListQuantity = (id: string, quantity: number) => {
    setList((pr) =>
      pr.map((item) => {
        if (item.Pid === id) return { ...item, quantity: quantity };
        else return item;
      })
    );
  };
  return (
    <div className={css.cartContainer}>
      <div className={cssP.gridPoduct} style={{ marginTop: "40px" }}>
        <Row className={css.payContent}>
          <Col md={24} lg={14} className={css.line}>
            <div className={css.mainItem}>
              <table cellSpacing={0}>
                <thead>
                  <tr className={css.titleTable}>
                    <th colSpan={3}>Sản phẩm</th>
                    <th className={css.hide}>Giá</th>
                    <th>Số lượng</th>
                    <th className={css.hide}>Tổng</th>
                  </tr>
                </thead>
                <tbody className={css.tabBody}>
                  {list.map((item, index) => {
                    const priceFormat = formatOld(item.price);
                    const priceNow = formatNew(
                      item.price,
                      item.discount,
                      item.endSale,
                      item.beginSale
                    );
                    return (
                      <tr className={css.cartItem} key={index}>
                        <td>
                          <span
                            className={css.delete}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCartItem(item);
                            }}
                          >
                            x
                          </span>{" "}
                        </td>
                        <td>
                          <img
                            style={{ width: "80px", height: "80px" }}
                            src={item.image}
                          />
                        </td>
                        <td>
                          <span
                            className={css.nameProduct}
                            onClick={() => router.push("/product/" + item.Pid)}
                          >
                            {item.name}
                          </span>{" "}
                          <p className={css.extraPrice}>
                            <span>{item.quantity} x </span>
                            <span className={css.price}>
                              {priceNow ? priceNow : priceFormat}
                            </span>
                          </p>
                        </td>

                        <td className={css.hide}>
                          <span className={css.price}>
                            {priceNow ? priceNow : priceFormat}
                          </span>
                        </td>
                        <td className={css.waningQuantity}>
                          <QuantityComponent
                            changeQuantity={setListQuantity}
                            small={true}
                            cartDeltailItem={item}
                          ></QuantityComponent>
                          {item.kho < item.quantity && (
                            <span>Only {item.kho} products left</span>
                          )}
                        </td>
                        <td className={css.hide}>
                          <span className={css.price}>
                            <span className={css.price}>
                              {priceNow
                                ? formatNew(
                                    item.price * item.quantity,
                                    item.discount,
                                    item.endSale,
                                    item.beginSale
                                  )
                                : formatOld(item.price * item.quantity)}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={6} className={css.bntProduct}>
                      <div>
                        <Link href="/">
                          <span className={css.continueShop}>
                            ← Tiếp tục xem sản phẩm
                          </span>
                        </Link>
                        <div
                          className={cssS.button}
                          style={{ fontSize: "18px" }}
                        >
                          <p
                            style={{ padding: "8px 18px" }}
                            onClick={updateCart}
                          >
                            CẬP NHẬT GIỎ HÀNG
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>

          <Col md={24} lg={10} className={css.line}>
            <div className={css.mainItem}>
              <table cellSpacing={0} className={css.lableTable}>
                <thead>
                  <tr className={css.titleTable}>
                    <th colSpan={2}>Tổng số lượng</th>
                  </tr>
                </thead>
              </table>
              <table>
                <tbody className={css.tabBody}>
                  <tr className={css.cartItem}>
                    <td>Tổng phụ</td>
                    <td className={css.payRight}>
                      <span className={css.price}>{total}</span>
                    </td>
                  </tr>
                  <tr className={css.cartItem}>
                    <td>Giao hàng</td>
                    <td className={css.payRight} colSpan={2}>
                      <p>Giao hàng miễn phí</p>
                      <p>
                        <strong>
                          {" "}
                          {addressShow || "Chưa có địa chỉ nhận hàng"}
                        </strong>
                      </p>
                      {address && address.length > 1 && (
                        <p onClick={() => setShowChangeAddress((pr) => !pr)}>
                          Đổi địa chỉ
                        </p>
                      )}
                      {showChangeAddress && (
                        <Select
                          onSelect={(e: any) => {
                            setAddressShow(e);
                            setShowChangeAddress((pr) => !pr);
                          }}
                          className={[css.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                          size="large"
                          popupClassName={css.Drop}
                          style={{ width: "200px" }}
                          options={province}
                          defaultValue={
                            address ? addressShow : "Chưa có địa chỉ nhận hàng"
                          }
                        />
                      )}
                    </td>
                  </tr>
                  {code && (
                    <tr className={css.cartItem}>
                      <td>{code.name}</td>
                      <td className={css.payRight}>
                        <span className={css.price}>
                          -{formatOld(code.discount)}
                        </span>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>Tổng Cộng</td>
                    <td className={css.payRight}>
                      <span className={css.price}>{total}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div
                        onClick={() => {
                          checkArrays()
                            ? console.log(" không cần cập nhật")
                            : !activeCheckOut && updateCart();
                          activeCheckOut
                            ? openNotification("BansCheckOut")
                            : router.push("/checkout");
                        }}
                        className={[
                          cssS.button,
                          css.checkOut,
                          activeCheckOut && css.disible,
                        ].join(" ")}
                      >
                        <p>Tiến hành thanh toán</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className={css.FromDiscount}>
                        <div>
                          <h3>
                            {" "}
                            <AiFillTag
                              className={css.tag}
                              size={20}
                            ></AiFillTag>
                            Phiếu ưu đãi
                          </h3>
                          <input
                            className={[css.inputDiscount, cssD.boxInput].join(
                              " "
                            )}
                            type="text"
                            placeholder="Mã ưu đãi"
                            onChange={(e) => setVoucher(e.target.value)}
                          />{" "}
                          <input
                            onClick={() => checkVoucher()}
                            className={css.btnGray}
                            type="submit"
                            value="Áp dụng"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
