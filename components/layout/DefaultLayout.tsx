import Head from "next/head";
import { ReactNode } from "react";
import { DfFooter } from "../component/DfFooter";
import DfHeaderLogo from "../component/DfHeaderLogo";
import { DfHeaderNav } from "../component/DfHeaderNav";

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Head>
        <title>Ml</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <DfHeaderLogo></DfHeaderLogo>
      <DfHeaderNav></DfHeaderNav>
      {children}
      <DfFooter></DfFooter>
    </div>
  );
}
