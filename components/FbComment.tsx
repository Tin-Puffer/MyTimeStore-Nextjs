import { useEffect } from "react";
import React from "react";
import { FacebookProvider, Comments } from "react-facebook";

function loadFacebookSDK() {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: "483581390556812",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v12.0",
    });
  };

  (function (d, s, id) {
    var js: any,
      fjs: any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
}

function MyFacebookComments({ url = "" }: { url: string }) {
  useEffect(() => {
    loadFacebookSDK();
  }, [url]);
  console.log("my:", url);
  return (
    <FacebookProvider appId={"483581390556812"}>
      <Comments href={url} width={"100%"} />
    </FacebookProvider>
  );
}
export default React.memo(MyFacebookComments);
