import ThemeProvider from "@/design-system/provider/index.provider";
import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";

import "./globals.css";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lorem Ipsum",
  description: "Your Description Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mavenPro.variable}`} style={{ margin: "0" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
