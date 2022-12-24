import { Button, Form, Input, Row, Col, Select } from "antd";
import cssD from "../DetailProductComponent/DecriptionStyle.module.scss";

import cssP from "../HomeComponent/ProductStyle.module.scss";

import { CreateAc, layout, validateMessages } from "./CreateAc";
import cssC from "./CreatAcStyle.module.scss";

import css from "./checkOutStyle.module.scss";
import { useEffect, useRef, useState } from "react";
import { LocalAPI } from "../../pages/api/provincesAPI";

interface selectType {
  value: string;
  label: string;
}
export function CheckOut() {
  const [province, setProvince] = useState<selectType[]>([]);
  const [p, setP] = useState<number | undefined>(undefined);
  const [districts, setDistricts] = useState<selectType[]>([]);
  const [d, setD] = useState<number | undefined>(undefined);
  const [wards, setWards] = useState<selectType[]>([]);

  const [form] = Form.useForm();
  // const [W, setW] = useState();

  useEffect(() => {
    form.setFieldValue("districts", null);
    form.setFieldValue("wards", null);
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
          <CreateAc></CreateAc>
          <Row>
            <Col xs={24} md={24} lg={14}>
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
                      name={"email"}
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
                      name={["password"]}
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
                    showSearch={true}
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
                    popupClassName={css.Drop}
                    style={{ width: "100%" }}
                    showSearch={true}
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
                    showSearch={true}
                    options={wards}
                  />
                </Form.Item>
                <Button
                  className={[css.button, css.Submit].join(" ")}
                  form="myformX"
                  htmlType="submit"
                >
                  Đâng Nhập
                </Button>
              </Form>
            </Col>
            <Col xs={24} md={24} lg={10}>
              <div className={css.content}>x</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
