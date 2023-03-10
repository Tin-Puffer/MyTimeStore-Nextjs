import { Form, Input, Row, Col, Select, Checkbox } from "antd";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import { CreateAc, layout, validateMessages } from "./CreateAc";
import cssC from "./CreatAcStyle.module.scss";
import css from "./checkOutStyle.module.scss";
import { useEffect, useState } from "react";
import { LocalAPI } from "../../pages/api/provincesAPI";
import { Total } from "./Total";
import { CartAPI } from "../../pages/api/Cart";
import { useAppDispatch, useAppSelector } from "../../app/Hook";
import { cartAction, oderNow, ProductSlI } from "../../app/splice/cartSlipe";
import { ItemList, ItemOder } from "../../app/saga/cartSaga";
import { checkSale } from "../../PriceFormat";

export interface selectType {
  value: string;
  label: string;
}

const { TextArea } = Input;
export function CheckOut() {
  const [province, setProvince] = useState<selectType[]>([]);
  const [p, setP] = useState<number | undefined>(undefined);
  const [districts, setDistricts] = useState<selectType[]>([]);
  const [d, setD] = useState<number | undefined>(undefined);
  const [wards, setWards] = useState<selectType[]>([]);
  const [addressList, setAddressList] = useState<selectType[]>([]);
  const [address, setAddress] = useState<string>("");
  const [OpenCreate, SetOpenCreate] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();
  const dispach= useAppDispatch()
  const [code, setCode] = useState<{ name: string; discount: number }>();
  const auth = useAppSelector((state) => state.auth.isLogin);
  const user = useAppSelector((state) => state.auth.currentUser);
  const listProduct: ProductSlI[] = useAppSelector(
    (state) => state.cart.ProductSl
  );

  useEffect(() => {
    if (user) {
      const tmp = user.address.map((e) => {
        return { value: e, label: e };
      });
      tmp.push({ value: "NewAddress", label: "NewAddress" });
      setAddressList(tmp);
      setAddress(tmp[0].label);
    }
  }, [user]);
  useEffect(() => {
    form.setFieldValue("districts", null);
    form.setFieldValue("wards", null);
    setWards([]);
    (async () => {
      if (p) {
        await LocalAPI.getDistricts(p).then((data) => {
          const tmp = data.map((x: any) => {
            return {
              label: x.name,
              value: x.code,
            };
          });
          setDistricts(tmp);
        });
      }
    })();
  }, [p]);
  useEffect(() => {
    form.setFieldValue("wards", null);
    (async () => {
      if (d) {
        await LocalAPI.getwards(d).then((data) => {
          const tmp = data.map((x: any) => {
            return {
              label: x.name,
              value: x.code,
            };
          });
          setWards(tmp);
        });
      }
    })();
  }, [d]);
  useEffect(() => {
    (async () => {
      await LocalAPI.getProvinces().then((data) => {
        const tmp = data.map((x: any) => {
          return {
            label: x.name,
            value: x.code,
          };
        });
        setProvince(tmp);
      });
    })();
  }, []);

  const onFinish = async (values: oderNow) => {
    const ItemList: ItemOder[] = listProduct.map((e) => {
      return {
        Image: e.image,
        Name: e.name,
        Price: e.price,
        Quantity: e.quantity,
        ProductID: e.Pid,
      };
    });
    values.Total = listProduct.reduce(
      (acc, item) => {
        return (
          acc +
          (checkSale(item.price, item.discount, item.endSale, item.beginSale) ||
            item.price) *
            item.quantity
        );
      },
      code ? -code?.discount : 0
    );
    values.uid = user?.uid || "";
    values.ItemList = ItemList;
    values.voucher=code?.name;
    values.discount=code?.discount;
    
    console.log(values);
    dispach(cartAction.oderNow(values));
  };
  return (
    <div className={css.container}>
      <div className={cssP.gridPoduct} style={{ marginTop: "30px" }}>
        <div className={css.content}>
          <div className={css.content}>
            {auth && <CreateAc setCode={setCode}></CreateAc>}
          </div>
          <Row>
            <Col xs={24} md={24} lg={14}>
              <div className={css.content}>
                <h3
                  className={css.titleLable}
                  style={{ borderTop: "2px solid #dddddd" }}
                >
                  Thông tin thanh toán
                </h3>
                <Form
                  form={form}
                  layout="vertical"
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                  validateMessages={validateMessages}
                  id="myformX"
                >
                  {!user ? (
                    <>
                      <Row gutter={40}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            className={cssC.nameInput}
                            name={"Ho"}
                            label="Họ"
                            rules={[{ required: true }]}
                          >
                            <Input
                              className={[
                                cssC.inputDiscount,
                                cssD.boxInput,
                              ].join(" ")}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            className={cssC.nameInput}
                            name={["Ten"]}
                            label="Tên"
                            rules={[{ required: true }]}
                          >
                            <Input
                              className={[
                                cssC.inputDiscount,
                                cssD.boxInput,
                              ].join(" ")}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        className={cssC.nameInput}
                        name={"province"}
                        label="Tỉnh /Thành phố "
                        rules={[{ required: true }]}
                      >
                        <Select
                          onSelect={(e: any) => setP(e)}
                          className={[css.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                          size="large"
                          popupClassName={css.Drop}
                          // defaultValue="lucy"
                          style={{ width: "100%" }}
                          // showSearch={true}
                          options={province}
                        />
                      </Form.Item>
                      <Form.Item
                        className={cssC.nameInput}
                        name={"districts"}
                        label="Quận /Huyện"
                        rules={[{ required: true }]}
                      >
                        <Select
                          onSelect={(e: any) => setD(e)}
                          className={[css.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                          size="large"
                          disabled={districts.length ? false : true}
                          popupClassName={css.Drop}
                          style={{ width: "100%" }}
                          // showSearch={true}
                          options={districts}
                        />
                      </Form.Item>
                      <Form.Item
                        className={cssC.nameInput}
                        name={"wards"}
                        label="Phường /Xã"
                        rules={[{ required: true }]}
                      >
                        <Select
                          className={[css.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                          size="large"
                          popupClassName={css.Drop}
                          // defaultValue="lucy"
                          style={{ width: "100%" }}
                          // showSearch={true}
                          disabled={wards.length ? false : true}
                          options={wards}
                        />
                      </Form.Item>
                      <Form.Item
                        className={cssC.nameInput}
                        name={"adress"}
                        label="Địa chỉ"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        className={cssC.nameInput}
                        name={"SDT"}
                        label="Số điện thoại"
                        rules={[{ required: true }]}
                      >
                        <Input
                          type="tel"
                          autoComplete="tel"
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        className={cssC.nameInput}
                        name={"Email"}
                        label="Địa chỉ email"
                        rules={[{ type: "email" }]}
                      >
                        <Input
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                        />
                      </Form.Item>
                    </>
                  ) : (
                    <>
                      <Form.Item
                        initialValue={user?.name || ""}
                        className={cssC.nameInput}
                        name={"name"}
                        label="Tên Người Nhận Hàng"
                        rules={[{ required: true }]}
                      >
                        <Input
                          defaultValue={user?.name}
                          value={111}
                          disabled={true}
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                        />
                      </Form.Item>

                      <Form.Item
                        className={cssC.nameInput}
                        initialValue={user?.email || ""}
                        name={"Email"}
                        label="Email"
                        rules={[{ required: true }]}
                      >
                        <Input
                          defaultValue={user?.email || ""}
                          disabled={user?.email ? true : false}
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        initialValue={user?.phone || ""}
                        className={cssC.nameInput}
                        name={"PhoneNumber"}
                        label="Số Điện Thoại"
                        rules={[{ required: true }]}
                      >
                        <Input
                          defaultValue={user?.phone || ""}
                          disabled={user?.phone ? true : false}
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        className={cssC.nameInput}
                        name={"Address"}
                        label="Địa chỉ nhận hàng"
                        rules={[{ required: true }]}
                      >
                        <Select
                          onSelect={(e: any) => {
                            console.log(e);
                            setAddress(e);
                          }}
                          className={[css.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                          size="large"
                          popupClassName={css.Drop}
                          defaultValue={address}
                          style={{ width: "100%" }}
                          options={addressList}
                        />
                      </Form.Item>
                      {address === "NewAddress" && (
                        <>
                          <Form.Item
                            className={cssC.nameInput}
                            name={"province"}
                            label="Tỉnh /Thành phố "
                            rules={[{ required: true }]}
                          >
                            <Select
                              onSelect={(e: any) => setP(e)}
                              className={[
                                css.inputDiscount,
                                cssD.boxInput,
                              ].join(" ")}
                              size="large"
                              popupClassName={css.Drop}
                              // defaultValue="lucy"
                              style={{ width: "100%" }}
                              // showSearch={true}
                              options={province}
                            />
                          </Form.Item>
                          <Form.Item
                            className={cssC.nameInput}
                            name={"districts"}
                            label="Quận /Huyện"
                            rules={[{ required: true }]}
                          >
                            <Select
                              onSelect={(e: any) => setD(e)}
                              className={[
                                css.inputDiscount,
                                cssD.boxInput,
                              ].join(" ")}
                              size="large"
                              disabled={districts.length ? false : true}
                              popupClassName={css.Drop}
                              style={{ width: "100%" }}
                              // showSearch={true}
                              options={districts}
                            />
                          </Form.Item>
                          <Form.Item
                            className={cssC.nameInput}
                            name={"wards"}
                            label="Phường /Xã"
                            rules={[{ required: true }]}
                          >
                            <Select
                              className={[
                                css.inputDiscount,
                                cssD.boxInput,
                              ].join(" ")}
                              size="large"
                              popupClassName={css.Drop}
                              // defaultValue="lucy"
                              style={{ width: "100%" }}
                              // showSearch={true}
                              disabled={wards.length ? false : true}
                              options={wards}
                            />
                          </Form.Item>
                          <Form.Item
                            className={cssC.nameInput}
                            name={"adress"}
                            label="Địa chỉ"
                            rules={[{ required: true }]}
                          >
                            <Input
                              className={[
                                cssC.inputDiscount,
                                cssD.boxInput,
                              ].join(" ")}
                            />
                          </Form.Item>
                        </>
                      )}
                    </>
                  )}

                  {OpenCreate && !auth && (
                    <>
                      <Checkbox onChange={() => SetOpenCreate((pr) => !pr)}>
                        Tạo tài khoản mới?
                      </Checkbox>
                      <Form.Item
                        style={{ marginTop: "10px" }}
                        className={cssC.nameInput}
                        name={"Password"}
                        label="Tạo mật khẩu của tài khoản"
                      >
                        <Input.Password
                          visibilityToggle={{
                            visible: passwordVisible,
                            onVisibleChange: setPasswordVisible,
                          }}
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
                        />
                      </Form.Item>
                    </>
                  )}
                  <Form.Item
                    style={{ marginTop: "10px" }}
                    className={cssC.nameInput}
                    name={"note"}
                    label="Ghi chú đơn hàng (tuỳ chọn)"
                  >
                    <TextArea
                      rows={4}
                      className={[cssC.inputDiscount, cssD.boxInput].join(" ")}
                    />
                  </Form.Item>
                </Form>
              </div>
            </Col>
            <Col xs={24} md={24} lg={10}>
              <div className={css.content}>
                <Total code={code}></Total>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
