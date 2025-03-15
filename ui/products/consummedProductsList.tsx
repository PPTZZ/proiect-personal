"use client";
import ConsumedProduct from "./consummedProducts";
import { EntryProps } from "@/lib/definitions";

const ConsummedProductsList = ({ entryList,setEntryList }: EntryProps) => {
  return (
    <div className="mt-16 h-60 overflow-scroll relative">
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
  );
};

export default ConsummedProductsList;
