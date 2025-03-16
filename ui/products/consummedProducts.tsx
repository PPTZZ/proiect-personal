"use client";
import { deleteEntry } from "@/lib/actions";
import { ConsumedProductProps } from "@/lib/definitions";
import { FC } from "react";

const ConsumedProduct: FC<ConsumedProductProps> = ({
  id,
  productName,
  grams,
  cals,
  setEntryList,
}) => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newList = await deleteEntry(formData);
    setEntryList(newList);
  };

  return (
    <div className=" h-10 flex justify-between gap-2 md:gap-8 mb-3">
      <p className="border-b-2 pb-2 border-neutral-200 w-60 text-textColor font-semibold">
        {productName}
      </p>
      <p className="border-b-2 pb-2 border-neutral-200 w-28 flex justify-end text-textColor font-semibold">
        {grams} g
      </p>
      <p className="border-b-2 pb-2 border-neutral-200 w-28 flex justify-end text-textColor font-semibold">
        {Math.round(cals)} cal
      </p>
      <form onSubmit={handleSubmit} className="sm:ml-8">
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="mr-10 cursor-pointer font-bold">
          X
        </button>
      </form>
    </div>
  );
};

export default ConsumedProduct;
