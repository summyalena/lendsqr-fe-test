import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ProtectedRoute from "@/components/utils/ProtectedRoute";
import LayoutWithAuth from "@/components/ui/LayoutWithAuth";
import { ApiProvider } from "@/components/utils/context/apiContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "We help thousands of lenders to reach millions of customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <LayoutWithAuth>
          <ApiProvider>
            {children}
            </ApiProvider>
          </LayoutWithAuth>
      </body>
    </html>
  );
}
