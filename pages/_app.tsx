import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";

import "../styles/globals.css";
import "../styles/flaticon.css";
import "../styles/progress.css";

import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { generateString } from "../utils/generateString";
import { GetServerSideProps } from "next";
import checkIp from "../middleware/checkIp";
import Head from "next/head";

export const DataContext = createContext({} as any);

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState({
    sessionId: generateString(10),
  });
  return (
    <DataContext.Provider value={{ data, setData }}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </DataContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
    ...(!valid ? {
      redirect: {
        destination: process.env.NEXT_PUBLIC_EXIT_URL,
        permanent: false,
      },
    } : {})
  };
};

export default MyApp;
