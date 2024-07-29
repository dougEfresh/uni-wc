import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import pino from "pino";

const logger = pino({level: 'debug'});

const inter = Inter({ subsets: ["latin"] });

const connectOptions = {
  dryRun: false,
  client: undefined,
  disableProviderPing: true,
  logger: logger,
  metadata: {
    name: "uni-walletconnect",
    description: "just use walletconnect",
    url: "https://github.com/dougEfresh",
    icons: [],
    verifyUrl: undefined,
    redirect: undefined,
  },
  projectId: "80a11e83ad1dfde39aff286eb6d74554",
  storage: undefined,
  sessionProposalCallback: async (uri: string) => {
    console.log(`Session proposed with URI: ${uri}`);
  },
};


export const metadata: Metadata = {
  title: "Bride USDC",
  description: "Circle CCTP protocol for USDC cross chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
