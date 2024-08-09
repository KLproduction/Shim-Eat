import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/(Navbar)/Navbar";
import AdminSwitch from "@/components/AdminSwitch";
import NavbarMobileNew from "@/components/(Navbar)/NavbarMobileNew";
import NavbarMobileComponents from "@/components/(Navbar)/_components/NavbarMobile_compoent";
import { currentUser } from "@/lib/auth";

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
  const user = await currentUser();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="">
        <body className={roboto.className}>
          <div className="hidden sm:block">
            <Navbar />
          </div>
          <div className="sm:hidden">
            <NavbarMobileNew />
          </div>
          <AdminSwitch />
          {children}
          <div className="block sm:hidden">
            <Toaster position="top-center" />
          </div>
          <div className="hidden sm:block">
            <Toaster position="bottom-left" />
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
