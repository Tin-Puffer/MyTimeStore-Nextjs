import Head from "next/head";
import { ReactNode } from "react";
import { DfFooter, DfHeaderNav, DefaultHeaderLogo } from "../LayoutComponent";

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="deflultLayout" style={{maxHeight:"100vh"}}>
      <Head>
        <title>Ml</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <DefaultHeaderLogo></DefaultHeaderLogo>
      <DfHeaderNav></DfHeaderNav>
      {children}
      <DfFooter></DfFooter>
    </div>
  );
}
