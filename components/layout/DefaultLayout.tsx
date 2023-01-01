import { auth } from "../../FireBase/config";
import Head from "next/head";
import { ReactNode } from "react";
import { DfFooter, DfHeaderNav, DefaultHeaderLogo } from "../LayoutComponent";
import { signOut } from "firebase/auth";

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="deflultLayout" style={{ maxHeight: "100vh" }}>
      <Head>
        <title>Ml</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <button
        onClick={() => {
          document.cookie =
            "islogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          signOut(auth);
        }}
      >
        Logout
      </button>
      <DefaultHeaderLogo></DefaultHeaderLogo>
      <DfHeaderNav></DfHeaderNav>
      {children}
      <DfFooter></DfFooter>
    </div>
  );
}
