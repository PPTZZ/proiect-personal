"use client";
import ConsumedProduct from "./consummedProducts";
import { EntryProps } from "@/lib/definitions";

const ConsummedProductsList = ({ entryList, setEntryList }: EntryProps) => {
  return (
    <>
      <div className="mt-16 md:h-60 overflow-scroll">
        {entryList.map((entry, index) => (
          <ConsumedProduct
            key={index}
            id={entry._id}
            productName={entry.productName}
            grams={entry.grams}
            cals={entry.kcal}
            setEntryList={setEntryList}
          />
        ))}
      </div>
      <button className="size-12 rounded-full aspect-square bg-primary sm:hidden text-4xl text-white flex justify-center mx-auto mt-10">
        +
      </button>
    </>
  );
};

export default ConsummedProductsList;
