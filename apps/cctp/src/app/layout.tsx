import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ClientContextProvider} from "@/contexts/ClientContext";
import AppLayout from "@/components/AppLayout";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import {NamespaceContextProvider} from "@/contexts/NamespaceContext";
import {SessionContextProvider} from "@/contexts/SessionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "USDC Bridge",
  description: "Circle CCTP protocol for USDC cross chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppRouterCacheProvider>
        <NamespaceContextProvider>
          <ClientContextProvider>
            <SessionContextProvider>
              <AppLayout>
                {children}
              </AppLayout>
            </SessionContextProvider>
          </ClientContextProvider>
        </NamespaceContextProvider>
      </AppRouterCacheProvider>

      </body>
    </html>
  );
}
