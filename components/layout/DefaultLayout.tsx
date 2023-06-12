import Head from "next/head";
import { ReactNode } from "react";
import { DfFooter, DfHeaderNav, DefaultHeaderLogo } from "../LayoutComponent";
export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="deflultLayout">
      <Head>
        <title>My Time Store</title>
       <meta name="facebook-domain-verification" content="ylnl7euwxtr1becf0crg8xy4m79vmt" />
      </Head>
      <DefaultHeaderLogo></DefaultHeaderLogo>
      <DfHeaderNav></DfHeaderNav>
      {children}
      <DfFooter></DfFooter>
    </div>
  );
}
