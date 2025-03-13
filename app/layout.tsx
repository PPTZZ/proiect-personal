import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { jostFont } from "@/lib/fonts";
import Navbar from "@/ui/navigation/navigation";

export const metadata: Metadata = {
  title: "Slim Mom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <html lang="en">
        <body className="min-w-[18.75rem]">
          <div
            className={`${jostFont.className} antialiased  h-[40.5rem] lg:max-w-[80rem] lg:mx-auto  pt-5 lg:pt-20`}
          >
            <Navbar />
            {children}
          </div>
        </body>
      </html>
   
  );
}
