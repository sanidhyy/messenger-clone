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
  keywords: [
    "reactjs",
    "nextjs",
    "vercel",
    "react",
    "messenger clone",
    "chat app",
    "realtime",
    "next-auth",
    "zustand",
    "socket.io",
    "clsx",
    "react-hot-toast",
    "next-cloudinary",
    "headlessui",
    "nosql",
    "bcrypt",
    "mongodb",
    "prisma",
    "react-icons",
    "react-select",
    "react-spinners",
    "axios",
    "postcss",
    "prettier",
    "react-dom",
    "tailwindcss",
    "tailwindcss-animate",
    "ui/ux",
    "js",
    "javascript",
    "typescript",
    "eslint",
    "html",
    "css",
  ],
  authors: {
    name: "Sanidhya Kumar Verma",
    url: "https://github.com/sanidhyy",
  },
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
