import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import config from "./../config/config.json";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const envMode = config.ENV_MODE;

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
