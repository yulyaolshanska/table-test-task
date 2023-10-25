import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
