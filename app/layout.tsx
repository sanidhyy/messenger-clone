import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

import ActiveStatus from "@/app/components/active-status";
import ToasterContext from "@/app/context/toaster-context";
import AuthContext from "@/app/context/auth-context";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "A Real-Time Messenger Clone using Next.js 14.",
};

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
