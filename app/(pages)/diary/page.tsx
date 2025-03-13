"use client";
import { addNewEntry, getEntryList } from "@/lib/actions";
import leafsTab from "@/public/leafs-tab.png";
import leafs from "@/public/leafs.png";
import Image from "next/image";
import ConsummedProductsList from "@/ui/products/consummedProductsList";
import { formattedDate } from "@/lib/services";
import { useEffect, useState } from "react";

const Diary = () => {
  const dateToday = formattedDate();
  const [entryList, setEntryList] = useState();
  useEffect(() => {
    
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    entryList = await addNewEntry(formData);
  };

  return (
    <div className="w-3/5 mt-24 container">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="date"
          name="entryDate"
          className="text-3xl w-1/3"
          defaultValue={dateToday}
        />
        <div className="flex mt-16 gap-12">
          <input
            className="border-b-2 w-60 placeholder:font-semibold"
            type="text"
            name="productName"
            placeholder="Enter roduct name"
          />
          <input
            className="border-b-2 w-28 placeholder:text-right placeholder:font-semibold"
            type="number"
            name="grams"
            placeholder="Grams"
          />
          <button className="size-14 bg-primary text-5xl text-white rounded-full flex justify-center aspect-square">
            +
          </button>
        </div>
      </form>
      <ConsummedProductsList entryList={entryList} />
      <Image
        width={530}
        height={531}
        src={leafsTab}
        alt="leafs image image"
        className="hidden md:block md:absolute md:-bottom-64 md:-right-48 lg:hidden"
      />
      <Image
        width={746}
        height={846}
        src={leafs}
        alt="leafs image image"
        className="hidden lg:block lg:absolute lg:-right-80 lg:top-56 rotate-45"
      />
    </div>
  );
};

export default Diary;
