"use client";
import ConsumedProduct from "./consummedProducts";
import { Entry } from "@/lib/definitions";
import { useRouter } from "next/navigation";

const ConsummedProductsList = ({
  entryList,
  setEntryList,
}: {
  entryList: Entry[];
  setEntryList: (entries: object[]) => void;
}) => {
  const router = useRouter();
  const handleClick =()=>{
    router.push('?mf=y')
  }
  return (
    <>
      <div className="mt-16 md:h-60 overflow-scroll">
        {entryList.map((entry, index) => (
          <ConsumedProduct
            key={index}
            id={entry._id}
            productName={entry.productName}
            grams={Number(entry.grams)}
            cals={Number(entry.kcal)}
            setEntryList={setEntryList}
          />
        ))}
      </div>
      <button className="size-12 rounded-full aspect-square bg-primary sm:hidden text-4xl text-white flex justify-center mx-auto mt-10 cursor-pointer" onClick={handleClick}>
        +
      </button>
    </>
  );
};

export default ConsummedProductsList;
