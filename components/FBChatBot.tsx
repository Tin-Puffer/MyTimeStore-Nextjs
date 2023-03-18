import React from "react";
import { FacebookProvider, SendToMessenger, MessageUs } from "react-facebook";

const MyChatBot = () => {
  return (
    <FacebookProvider appId="123456789">
      <SendToMessenger
        messengerAppId="100333009685772"
        pageId="100333009685772"
      />
    </FacebookProvider>
  );
};

export default MyChatBot;
