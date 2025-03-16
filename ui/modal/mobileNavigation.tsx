"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useRef } from "react";

const MobileNav = () => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("mn");

  
  const router = useRouter();

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeForm = () => {
    router.replace("/calculator");
  };

  const links = [
    { name: "CALCULATOR", destination: "/calculator" },
    { name: "DIARY", destination: "/diary" },
  ];

  const mobileNav: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="w-full h-full bg-cyan-950 text-white font-bold z-20 absolute top-0 flex flex-col items-center gap-4 py-4"
      >
        {links.map((link,index) => (
          <Link key={index} href={link.destination}>{link.name}</Link>
        ))}
      </dialog>
    ) : null;

  return mobileNav;
};

export default MobileNav;
