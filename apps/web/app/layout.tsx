import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DefaultLayout from "@/layouts/default-layout";
const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
