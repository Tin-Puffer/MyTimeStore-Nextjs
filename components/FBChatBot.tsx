import React from "react";
import { FacebookProvider, SendToMessenger, MessageUs } from "react-facebook";
import { useEffect, useState } from "react";

const MyChatBot = () => {
  return (
    <FacebookProvider appId="123456789">
      <MessageUs messengerAppId="100333009685772" pageId="100333009685772" />
    </FacebookProvider>
  );
};

export const MyChatBotFB = () => {
  function loadFacebookSDK() {
    var chatbox: any = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "100333009685772");
    chatbox.setAttribute("attribution", "biz_inbox");

    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v16.0",
      });
    };
    (function (d, s, id) {
      var js: any,
        fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
  useEffect(() => {
    loadFacebookSDK();
  }, []);
  return (
    <>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat"></div>
      
    </>
  );
};

export default MyChatBot;
