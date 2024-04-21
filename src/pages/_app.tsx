import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const App = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  const Layout = Component.Layout ? Component.Layout : ({ children }: any) => <>{children}</>;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
