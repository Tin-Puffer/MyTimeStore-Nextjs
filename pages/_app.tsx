import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../app/store";
import { Provider } from "react-redux";
export default function App({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  //  const { emotionCache,  clientSideEmotionCache } = props;
  // const { emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
