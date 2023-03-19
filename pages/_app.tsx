import "antd/dist/reset.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import type { NextPage } from "next";
import { useRouter } from "next/router";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function LoadingPage() {
  return (
    <div className="spinner-wrapper">
      <div className="loader-content">
        <div className="loader"></div>
      </div>
    </div>
  );
}

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading ? (
    <div className="spinner-wrapper">
      <div className="loader-content">
        <div className="loader"></div>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
     
        <div>
          <Provider store={store}>
            <Loading />
            {Component.getLayout ? (
              getLayout(<Component {...pageProps} />)
            ) : (
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            )}
          </Provider>
        </div>
  
    </>
  );
}
