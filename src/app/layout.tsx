import { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@components/common/Header";
import Container from "@components/common/Container";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WASMBLE",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full">
        <Container>
          <Header />
          <main className="flex-grow">{children}</main>
        </Container>
      </body>
    </html>
  );
}
