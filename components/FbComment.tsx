import { useEffect, useState } from "react";
import React from "react";
import { FacebookProvider, Comments } from "react-facebook";
import { useRouter } from "next/router";
declare global {
  interface Window {
    FB: any;
  }
}
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

export default function MyFacebookComments() {
  const router = useRouter();
  const [id, setId] = useState<any>();

  useEffect(() => {
    setId(router.query.id);
  }, [router.query.id]);
  useEffect(() => {
    loadFacebookSDK();
    console.log("mypath:", router.query.id);
  }, []);
  useEffect(() => {
    if (window.FB) window.FB.XFBML.parse();
  }, [id]);
  return (
    <FacebookProvider appId={"483581390556812"}>
      <Comments
        href={"https://mytimestore.vercel.app/news/" + id}
        width={"100%"}
      />
    </FacebookProvider>
  );
}
