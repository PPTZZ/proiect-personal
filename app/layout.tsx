import type { Metadata } from "next";
import "./globals.css";
import { jostFont } from "@/lib/fonts";
import Navbar from "@/ui/navigation/navigation";
import leafs from "@/public/leafs.png";
import Image from "next/image";
import { logoutUser, userCredetials } from "@/lib/actions";
import MobileNav from "@/ui/modal/mobileNavigation";

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
  const bannedList: string[] = session.bannedFoods || [];
  const dailyRate: number = Math.round(session.recomandedCals ?? 0);
  const consumed: number =
    dailyRate > 0 ? Math.round(session.consumedCals ?? 0) : 0;
  const left = dailyRate - consumed;
  const percent = dailyRate > 0 ? Math.round((consumed / dailyRate) * 100) : 0;

  const getDate = () => {
    let currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    };
    const formattedDate = currentDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  };
  const date = getDate().toString();
  return (
    <html lang="en">
      <body className="min-w-[18.75rem] flex flex-col lg:flex-row">
        <div
          className={`${jostFont.className} antialiased  h-[40.5rem] lg:max-w-[80rem] lg:mx-auto  pt-5 lg:pt-20`}
        >
          <MobileNav />
          <Navbar />
          {session.userId && (
            <div className="h-9 w-full bg-neutral-200 flex gap-4 items-center justify-end px-4 lg:hidden ">
              <p className="font-bold text-xs leading-4 text-textColor z-10 lg:relative lg:top-5 lg:right-12  ">
                {name}
              </p>
              <p
                onClick={logoutUser}
                className="font-bold text-xs leading-4 text-secondary cursor-pointer lg:relative lg:top-5 lg:right-12 border-l-2 pl-5 border-neutral-400"
              >
                Exit
              </p>
            </div>
          )}
          {children}
        </div>
        {!session.userId && (
          <div className="hidden lg:block lg:w-1/3 lg:h-screen bg-transparent lg:pt-24 overflow-hidden"></div>
        )}
        {session.userId && (
          <div className=" lg:w-1/3 lg:h-screen bg-neutral-200 lg:pt-24 overflow-hidden">
            <div className="flex absolute items-center right-20 lg:right-56 gap-5">
              <p className="font-bold text-xs leading-4 text-textColor z-10 lg:relative lg:top-5 lg:right-12 hidden lg:block ">
                {name}
              </p>
              <p
                onClick={logoutUser}
                className="font-bold text-xs leading-4 text-secondary cursor-pointer lg:relative lg:top-5 lg:right-12 border-l-2 pl-5 border-neutral-400 hidden lg:block z-20"
              >
                Exit
              </p>
            </div>
            <div className="lg:mt-52 px-8 sm:pl-20 w-full lg:max-w-2/3 flex flex-col md:flex-row md:justify-around py-24 lg:py-0 lg:flex-col z-10">
              <div className="space-y-2 lg:w-full mb-10">
                <p className="font-bold tracking-wide">Summary for {date}</p>
                <p className="text-neutral-400 font-semibold tracking-wider w-full flex justify-between">
                  <span>Left</span>
                  <span>{left} cal</span>
                </p>
                <p className="text-neutral-400 font-semibold tracking-wider w-full flex justify-between">
                  <span>Consumed</span>
                  <span>{consumed} cal</span>
                </p>
                <p className="text-neutral-400 font-semibold tracking-wider w-full flex justify-between ">
                  <span>Daily rate</span>
                  <span>{dailyRate} cal</span>
                </p>
                <p className="text-neutral-400 font-semibold tracking-wider w-full flex justify-between">
                  <span>n% of normal</span>
                  <span>{percent}%</span>
                </p>
              </div>
              <div className="lg:mt-10 space-y-2">
                <p className="font-bold tracking-wide">Food not recomanded</p>
                {bannedList?.map((product: string) => (
                  <p
                    key={product}
                    className="text-neutral-400 font-semibold tracking-wider"
                  >
                    {product}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src={leafs}
                alt="leafs image image"
                className="hidden lg:block lg:absolute lg:-right-40 h-[53rem] lg:-top-[38rem] "
              />
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
