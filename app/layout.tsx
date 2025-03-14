import type { Metadata } from "next";
import "./globals.css";
import { jostFont } from "@/lib/fonts";
import Navbar from "@/ui/navigation/navigation";
import leafsTab from "@/public/leafs-tab.png";
import leafs from "@/public/leafs.png";
import Image from "next/image";
import menu from "@/public/menu.svg";
import { logoutUser, userCredetials } from "@/lib/actions";
import { formattedDate } from "@/lib/services";
import { log } from "console";

export const metadata: Metadata = {
  title: "Slim Mom",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await userCredetials();
  const name = session.userName;
  const getDate = () => {
    let currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      year: 'numeric',
      month: '2-digit'
    };
    const formattedDate = currentDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  };
  const date = getDate().toString();
  return (
    <html lang="en">
      <body className="min-w-[18.75rem] flex">
        <div
          className={`${jostFont.className} antialiased  h-[40.5rem] lg:max-w-[80rem] lg:mx-auto  pt-5 lg:pt-20`}
        >
          <Navbar />
          {children}
        </div>
        <div className="w-1/3 h-screen left-1/4 bg-neutral-300 lg:pt-24 overflow-hidden">
          <div className="flex absolute items-center right-20 lg:right-56 gap-5">
            <p className="font-bold text-xs leading-4 text-textColor z-10 lg:relative lg:top-5 lg:right-12 hidden lg:block ">
              {name}
            </p>
            <p
              onClick={logoutUser}
              className="font-bold text-xs leading-4 text-secondary cursor-pointer lg:relative lg:top-5 lg:right-12 border-l-2 pl-5 border-neutral-200 z-10 hidden lg:block"
            >
              Exit
            </p>
            <Image src={menu} alt="menu icon" className="lg:hidden" />
          </div>
          <div>
            <p>Summary for {date}</p>
          </div>
          <div className="relative">
            <Image
              src={leafsTab}
              alt="leafs image image"
              className="hidden md:block md:absolute md:-bottom-64 md:-right-48 lg:hidden"
            />
            <Image
              src={leafs}
              alt="leafs image image"
              className="hidden lg:block lg:absolute lg:-right-80 lg:top-56 "
            />
          </div>
        </div>
      </body>
    </html>
  );
}
