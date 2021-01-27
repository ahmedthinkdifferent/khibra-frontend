import Head from "next/head";
import NavBar from "./navbar";
import Footer from "./footer";
const Layout = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>{`KHIBRA | ${pageTitle}`}</title>
    </Head>
    <div className="container-fluid">
      <NavBar />
      <>{children}</>
      <Footer />
    </div>
  </>
);

export default Layout;
