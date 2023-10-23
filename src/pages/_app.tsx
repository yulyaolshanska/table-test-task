import type { AppProps } from "next/app";
import { wrapper } from "../redux/store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
