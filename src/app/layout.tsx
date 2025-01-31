import { Inter } from "next/font/google";

import Header from "@components/common/Header";
import Container from "@components/common/Container";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WASMBLE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
