"use client";

import "./globals.css";
import axios from "axios";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/lib/store/store";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    async function tokenRefresher() {
      const isLogin = localStorage.getItem("loginState");
      if (isLogin == "false") {
        return;
      }
      try {
        const response = await axios.get("/api/auth");
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
      } catch (err) {
        console.log(err);
      }
    }

    const clearId = setInterval(tokenRefresher, 3600000 - 10000);
    tokenRefresher();

    return () => clearInterval(clearId);
  }, []);
  return (
    <Provider store={store}>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
