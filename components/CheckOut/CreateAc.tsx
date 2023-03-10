import { Button, Form, Input, Row, Col } from "antd";
import { useState, useRef, useEffect } from "react";
import cssS from "../HomeComponent/SliderProductStyle.module.scss";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import css from "./CreatAcStyle.module.scss";
import { useAppSelector } from "../../app/Hook";
import { VoucherAPI } from "../../pages/api/voucherAPI";
import { sosanh } from "../../PriceFormat";
import openNotification from "../Notifycation/Notification";

export const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
export const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export function CreateAc({ setCode }: { setCode: any }) {
  const [open, setOpen] = useState(false);
  const [openVoucher, setOpenVoucher] = useState(false);
  const auth = useAppSelector((state) => state.auth.isLogin);
  const ref = useRef<HTMLDivElement>(null);
  const refv = useRef<HTMLDivElement>(null);
  const [voucher, setVoucher] = useState<string>();
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
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Row>
        <div className={css.container}>
          <div className={css.LableContent}>
            {!auth && (
              <div className={css.lable}>
                Bạn đã có tài khoản?{" "}
                <span
                  onClick={() => setOpen((pr) => !pr)}
                  className={css.showLogin}
                >
                  Ấn vào đây để đăng nhập
                </span>
              </div>
            )}
          </div>
          <div
            className={css.createBox}
            ref={ref}
            style={
              open && ref.current?.scrollHeight
                ? { height: ref.current.scrollHeight + "px" }
                : { height: "0px" }
            }
            // style={open ? { height: "auto" } : { height: "0px" }}
          >
            <div className={css.dropContent}>
              <p className={css.LableDecript}>
                Nếu trước đây bạn đã mua hàng của chúng tôi, vui lòng điền đầy
                đủ thông tin đăng nhập dưới đây. Nếu bạn là khách hàng mới, vui
                lòng tiếp tục các bước tiếp theo.
              </p>
              <Form
                layout="vertical"
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                id="myform"
              >
                <Row gutter={40}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      className={css.nameInput}
                      name={"email"}
                      label="Tên đăng nhập hoặc email "
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input
                        className={[css.inputDiscount, cssD.boxInput].join(" ")}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      className={css.nameInput}
                      name={["password"]}
                      label="Mật khẩu"
                      rules={[{ required: true }]}
                    >
                      <Input
                        className={[css.inputDiscount, cssD.boxInput].join(" ")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Button
                className={[cssS.button, css.Submit].join(" ")}
                form="myform"
                htmlType="submit"
              >
                Đâng Nhập
              </Button>
              <label>
                <input
                  style={{ margin: "3px 10px 16px 4px" }}
                  name="rememberme"
                  type="checkbox"
                  id="rememberme"
                  value="forever"
                />
                <span className={css.remember}>Ghi nhớ mật khẩu</span>
              </label>
              <p className={css.fogot}>Quên mật khẩu?</p>
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <div className={css.LableContent} style={{ width: "100%" }}>
          <div className={css.lable} style={{ margin: "10px 0" }}>
            Bạn có mã ưu đãi?{" "}
            <span
              onClick={() => setOpenVoucher((pr) => !pr)}
              className={css.showLogin}
            >
              Ấn vào đây để nhập mã
            </span>{" "}
          </div>
          <div
            className={css.createBox}
            ref={refv}
            style={
              openVoucher && refv.current?.scrollHeight
                ? { height: refv.current.scrollHeight + "px" }
                : { height: "0px" }
            }
            // style={open ? { height: "auto" } : { height: "0px" }}
          >
            <div className={css.voucherContainer}>
              <p className={css.LableDecript}>
                Nếu bạn có mã giảm giá, vui lòng điền vào phía bên dưới.
              </p>
              <Row gutter={[0, 15]}>
                <Col xs={24} md={24} lg={21}>
                  <input
                    className={[css.inputDiscount, cssD.boxInput].join(" ")}
                    type="text"
                    placeholder="Mã ưu đãi"
                    onChange={(e) => setVoucher(e.target.value)}
                  />{" "}
                </Col>
                <Col xs={24} md={24} lg={3}>
                  <div
                    className={cssS.button}
                    style={{
                      fontSize: "14px",
                      textTransform: "uppercase",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{ padding: "11px 10px" }}
                      onClick={() => checkVoucher()}
                    >
                      Áp dụng
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
}
