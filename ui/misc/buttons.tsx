"use client";

import Image from "next/image";
import menu from "@/public/menu.svg";
import { useRouter } from "next/navigation";

const MenuButton = () => {
  const router = useRouter();
  const openMenu = () => {
    router.push("?mn=y");
  };
  return (
    <button onClick={openMenu}>
      <Image src={menu} alt="menu icon" className="lg:hidden cursor-pointer" />
    </button>
  );
};

export default MenuButton;
