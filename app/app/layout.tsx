import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tinybird Demo - User-facing dashboard",
  description: "A user-facing dashboard demo using Tinybird",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full md:w-3/4 m-0 mx-4 md:mx-auto">
          <h1 className="text-lg text-black my-4">Tinybird Demo - User-facing dashboard</h1>
          {children}
        </main>
      </body>
    </html>
  );
}
