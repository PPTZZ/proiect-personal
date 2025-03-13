"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect, JSX } from "react";
import { TModalProps } from "@/lib/definitions";
import close from "@/public/close.svg";
import Image from "next/image";

import React from "react";
import { useRouter } from "next/navigation";

const Modal: React.FC<TModalProps> = ({
  onOK,
  children,
  bannedProductsList,
}) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("sd");
  const router = useRouter();
  const recomandedCalories = searchParams.get("recomandedCalories");

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeModal = () => {
    router.replace("/calculator");
  };

    const data = bannedProductsList || [];

  const looseWeight = async () => {
    if (onOK) {
      onOK();
    }
    closeModal();
  };

  const modal: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="backdrop:bg-neutral-700/50 mx-auto my-auto shadow-xl"
      >
        <div className="relative flex flex-col items-center w-[42rem] h-[35.75rem] pt-16 ">
          <h2 className="font-bold text-2xl text-center mb-5 leading-[140%]">
            Your recommended daily
            <br />
            calorie intake is
          </h2>
          <p className="tracking-wider font-bold text-5xl">
            {recomandedCalories}
            <span className="text-xl"> kcal</span>
          </p>
          <div className="w-2/4 border-t-2 border-neutral-200 mt-8 pt-2">
            <p className="font-semibold">Foods you should not eat</p>
            <div className="mt-5">
              {data?.length ? (
                data.map((product: string, index: number) => (
                  <p key={index} className="text-neutral-500">
                    {index + 1}. {product.toString()}
                  </p>
                ))
              ) : (
                <p>{children}</p>
              )}
            </div>
          </div>
          <button
            onClick={closeModal}
            className="rounded-full bg-neutral-100 absolute top-8 right-8 cursor-pointer"
          >
            <Image width={24} height={24} src={close} alt="close btn" />
          </button>
          <button
            onClick={looseWeight}
            className="btn-calculator cursor-pointer"
          >
            Start loosing weight
          </button>
        </div>
      </dialog>
    ) : null;

  return modal;
};

export default Modal;
