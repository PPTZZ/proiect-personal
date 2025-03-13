import { deleteEntry } from "@/lib/actions";

const ConsumedProduct = ({
  productName,
  grams,
  cals,
  id,
}: {
  productName: string;
  grams: number;
  cals: number;
  id: string;
}) => {
  return (
    <div className="w-full h-10 flex justify-between items-center mb-3">
      <p className="border-b-2 pb-2 border-neutral-200 w-60 text-textColor font-semibold">
        {productName}
      </p>
      <p className="border-b-2 pb-2 border-neutral-200 w-28 flex justify-end text-textColor font-semibold">
        {grams} g
      </p>
      <p className="border-b-2 pb-2 border-neutral-200 w-28 flex justify-end text-textColor font-semibold">
        {Math.round(cals)} kcal
      </p>
      <form action={deleteEntry}>
        <input type="hidden" name="id" value={id} />
        <button className="mr-10 cursor-pointer font-bold">X</button>
      </form>
    </div>
  );
};

export default ConsumedProduct;
