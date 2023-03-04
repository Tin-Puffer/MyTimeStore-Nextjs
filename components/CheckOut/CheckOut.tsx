import {  Form, Input, Row, Col, Select, Checkbox } from "antd";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";
import cssP from "../HomeComponent/ProductStyle.module.scss";
import { CreateAc, layout, validateMessages } from "./CreateAc";
import cssC from "./CreatAcStyle.module.scss";
import css from "./checkOutStyle.module.scss";
import { useEffect, useState } from "react";
import { LocalAPI } from "../../pages/api/provincesAPI";
import { Total } from "./Total";

interface selectType {
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
  const [OpenCreate, SetOpenCreate] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();
  // const [W, setW] = useState();

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

  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div className={css.container}>
      <div className={cssP.gridPoduct} style={{ marginTop: "30px" }}>
        <div className={css.content}>
          <div className={css.content}>
            <CreateAc></CreateAc>
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
                  <Row gutter={40}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        className={cssC.nameInput}
                        name={"Ho"}
                        label="Họ"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
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
                          className={[cssC.inputDiscount, cssD.boxInput].join(
                            " "
                          )}
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
                      className={[css.inputDiscount, cssD.boxInput].join(" ")}
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
                      className={[css.inputDiscount, cssD.boxInput].join(" ")}
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
                      className={[css.inputDiscount, cssD.boxInput].join(" ")}
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
                      className={[cssC.inputDiscount, cssD.boxInput].join(" ")}
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
                      className={[cssC.inputDiscount, cssD.boxInput].join(" ")}
                    />
                  </Form.Item>
                  <Form.Item
                    className={cssC.nameInput}
                    name={"Email"}
                    label="Địa chỉ email"
                    rules={[{ type: "email" }]}
                  >
                    <Input
                      className={[cssC.inputDiscount, cssD.boxInput].join(" ")}
                    />
                  </Form.Item>

                  <Checkbox onChange={() => SetOpenCreate((pr) => !pr)}>
                    Tạo tài khoản mới?
                  </Checkbox>
                  {OpenCreate && (
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
                <Total></Total>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
