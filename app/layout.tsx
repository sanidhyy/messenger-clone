import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

import ActiveStatus from "@/app/components/active-status";
import ToasterContext from "@/app/context/toaster-context";
import AuthContext from "@/app/context/auth-context";
import { siteConfig } from "@/app/config/site";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0284C7",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          {/* react hot toast */}
          <aside>
            <ToasterContext />
          </aside>

          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
