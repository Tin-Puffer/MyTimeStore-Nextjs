import css from "./totalStyle.module.scss";
import cssC from "./checkOutStyle.module.scss";
import { useState, useEffect } from "react";
import { Radio, Space } from "antd";
import { RadioChangeEvent } from "antd";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import { useAppSelector } from "../../app/Hook";
import { checkSale, formatNew, formatOld } from "../../PriceFormat";

export function Total({ code }: { code?: { name: string; discount: number } }) {


  const [value, setValue] = useState(1);
  const list = useAppSelector((state) => state.cart.ProductSl);
  const [total, setTotal] = useState<string>();
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
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
  }, [list, total]);
  return (
    <div className={css.container}>
      <h3 className={cssC.titleLable}>Đơn hàng của bạn</h3>
      <table className={css.tableCheckOut}>
        <thead>
          <tr>
            <th className={css.titleLeft}>Sản phẩm</th>
            <th>Tổng</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td className={[css.titleLeft, css.productItem].join(" ")}>
                {item.name}&nbsp; <span>× {item.quantity}</span>{" "}
              </td>
              <td>
                <span>
                  {formatNew(
                    item.price * item.quantity,
                    item.discount,
                    item.endSale,
                    item.beginSale
                  ) || formatOld(item.price * item.quantity)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className={[css.titleLeft, css.fade].join(" ")}>Tổng phụ</th>
            <td>
              <span>{total}</span>
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <table style={{ width: "100%" }}>
                <tbody className={css.tableShip}>
                  <tr>
                    <td className={css.titleLeft}>Giao hàng</td>
                    <td
                      style={{
                        textAlign: "right",
                        paddingRight: 0,
                        fontWeight: "normal",
                      }}
                    >
                      <label>Giao hàng miễn phí</label>{" "}
                    </td>
                  </tr>
                  {code && (
                    <tr>
                      <td className={css.titleLeft}>{code.name}</td>
                      <td
                        style={{
                          textAlign: "right",
                          paddingRight: 0,
                          fontWeight: "normal",
                        }}
                      >
                        <label>-{formatOld(code.discount)}</label>{" "}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <th className={[css.titleLeft, css.fade].join(" ")}>Tổng</th>
            <td>
              <strong>
                <span>{total}</span>
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className={css.payments}>
        <Radio.Group
          onChange={onChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Radio value={1}>Trả tiền mặt khi nhận hàng</Radio>
            {value == 1 && <p>Trả tiền mặt khi giao hàng.</p>}

            <div
              style={{ paddingTop: "10px", borderTop: "1px solid #ececec" }}
            ></div>
            <Radio value={2}>Chuyển khoản ngân hàng</Radio>
            {value == 2 && (
              <p>
                Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi.
                Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh
                toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.
              </p>
            )}
          </Space>
        </Radio.Group>
        <button
          form="myformX"
          className={cssS.button}
          style={{
            marginTop: "15px",
            fontSize: "18px",
            backgroundColor: "#d26e4b",
            width: "100%",
            maxWidth: "200px",
            textAlign: "center",
            border: "none",
          }}
        >
          <p
            style={{
              padding: "11px 18px",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Đặt Hàng
          </p>
        </button>
      </div>
    </div>
  );
}
