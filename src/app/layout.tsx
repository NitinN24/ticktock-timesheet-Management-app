import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import SessionWrapper from "../app/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ticktock",
  description: "Timesheet management app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
