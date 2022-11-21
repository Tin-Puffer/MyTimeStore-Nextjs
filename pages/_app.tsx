import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../app/store";
import { Provider } from "react-redux";
export default function App({ Component, pageProps, ...rest }: AppProps) {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
