import "antd/dist/reset.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import type { ReactElement, ReactNode } from "react";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <div>
      <Provider store={store}>
        {Component.getLayout ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        )}
      </Provider>
    </div>
  );
}
