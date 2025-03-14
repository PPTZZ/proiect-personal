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
  const [entryList, setEntryList] = useState<
    { id: string; productName: string; grams: number; cals: number }[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const entries = await getEntryList();
      setEntryList(entries);
    };
    fetchData();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setEntryList(await addNewEntry(formData));
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
    
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <input
            type="date"
            name="entryDate"
            className="text-3xl max-w-60"
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
        <ConsummedProductsList
          entryList={entryList}
          setEntryList={setEntryList}
        />
        <Image
          src={leafsTab}
          alt="leafs image image"
          className="hidden md:block md:absolute md:-bottom-64 md:-right-48 lg:hidden -z-10"
        />
        <Image
          src={leafs}
          alt="leafs image image"
          className="hidden lg:block lg:absolute lg:-right-80 lg:top-56 rotate-45 -z-10"
        />
   
    </>
  );
};

export default Diary;
