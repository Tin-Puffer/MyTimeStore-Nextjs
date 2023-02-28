import { notification } from "antd";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  FrownOutlined,
} from "@ant-design/icons";

const openNotification = (type: string) => {
  switch (type) {
    case "DeleteItemInCart": {
      notification.success({
        message: "Deleted Item In Cart ",
        duration: 1,
        className: 'SUCSESS-notyfication',
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
