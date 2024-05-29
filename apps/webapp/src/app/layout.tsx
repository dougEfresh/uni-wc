import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "@/context";
import {cookieToInitialState} from "wagmi";
import {configMain} from "@/config";
import {headers} from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WalletConnect",
  description: "Universal WalletConnect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(configMain, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
      <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}
