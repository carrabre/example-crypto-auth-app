import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "example auth",
  description:
    "example web3 auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://auth.thirdweb.com" />
        <link rel="preconnect" href="https://auth.thirdweb.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.thirdweb.com" />
        <link rel="preconnect" href="https://cdn.thirdweb.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://accounts.google.com" />
        <link rel="preconnect" href="https://accounts.google.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://apis.google.com" />
        <link rel="preconnect" href="https://apis.google.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mainnet.base.org" />
        <link rel="preconnect" href="https://mainnet.base.org" crossOrigin="anonymous" />
        <link rel="prefetch" href="/dashboard" />
      </head>
      <body className={inter.className}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
