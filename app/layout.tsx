import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import AdminSwitch from "@/components/AdminSwitch";
import NavbarMobile from "@/components/NavbarMobile";
import NavbarMobileNew from "@/components/NavbarMobileNew";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "shim-Eat",
  description: "Your Salad on the run",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="">
        <body className={roboto.className}>
          <div className="hidden sm:block">
            <Navbar />
          </div>
          <div className="sm:hidden">
            {/* <NavbarMobile /> */}
            <NavbarMobileNew />
          </div>
          <AdminSwitch />
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
