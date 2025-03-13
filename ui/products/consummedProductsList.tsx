"use client";
import ConsumedProduct from "./consummedProducts";
import { EntryProps } from "@/lib/definitions";

const ConsummedProductsList = ({ entryList }: EntryProps) => {
  return (
    <div className="lg:w-4/5 mt-16 h-60 overflow-scroll relative">
      {entryList.map((entry, index) => (
        <ConsumedProduct
          key={index}
          id={entry.id}
          productName={entry.productName}
          grams={entry.grams}
          cals={entry.kcal}
        />
      ))}
    </div>
  );
};

export default ConsummedProductsList;
