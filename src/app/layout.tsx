import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header/Header";
import QueryProvider from "../components/QueryProvider/QueryProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Campers of your dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Ось тут ми кажемо додатку: "використовуй React Query для всього, що всередині" */}
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
