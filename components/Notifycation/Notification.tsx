import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const openNotification = (type: string, quantity?: number) => {
  switch (type) {
    case "UdateCartSuccess": {
      notification.success({
        message: `Update Cart Success `,
        duration: 1,
        className: "SUCSESS-notyfication",
        placement: "top",
      });
      break;
    }
    case "applyVoucherSuccess": {
      notification.success({
        message: `Apply Voucher Success `,
        duration: 1,
        className: "Your order is " + quantity + " discount",
        placement: "top",
      });
      break;
    }
    case "errorVoucher": {
      notification.error({
        message: `incorrect or expired voucher`,
        duration: 1.5,
        className: "SUCSESS-notyfication",
        placement: "top",
      });
      break;
    }
    case "BansCheckOut": {
      notification.warning({
        message: `Not enough products for your order `,
        duration: 1,
        className: "SUCSESS-notyfication",
        placement: "top",
      });
      break;
    }
    case "AddItemInCart": {
      notification.success({
        message: `Added ${quantity || "1"} Item  In Your Cart `,
        duration: 1,
        className: "SUCSESS-notyfication",
        placement: "top",
      });
      break;
    }
    case "DeleteItemInCart": {
      notification.success({
        message: `Delete ${quantity || ""} Item  In Your Cart `,
        duration: 1,
        className: "SUCSESS-notyfication",
        placement: "top",
      });
      break;
    }
    case "notify": {
      notification.error({
        message: "message",
        duration: 1,
        // className: 'NOTIFY',
      });
      break;
    }
    case "Wanning": {
      notification.error({
        message: "message",
        duration: 1.5,
        closeIcon: <div />,
        description: "",
        icon: <FrownOutlined className="icon" />,
        className: "Wanning",
      });
    }
  }
};
export default openNotification;
