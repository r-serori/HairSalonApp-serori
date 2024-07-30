// _app.tsx

import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store"; // Assuming your store file is named index.ts or store.ts
import "../styles/globals.css";
import Header from "../components/header/Header";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="min-h-screen overflow-x-auto  overflow-y-auto">
        <Header></Header>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
