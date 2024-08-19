import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balance Account",
  description: "LoadPay is virtual account for check payments",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
