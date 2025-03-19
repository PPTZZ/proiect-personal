"use client"
import { addNewEntry } from "@/lib/actions";
import { formattedDate } from "@/lib/services";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useRef } from "react";

interface MobileFormProps {
  setEntryList: (entries: any) => void;
}

const MobileForm = ({ setEntryList }: MobileFormProps) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("mf");
  const router = useRouter();
  const dateToday = formattedDate();

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeForm = () => {
    router.replace("/diary");
  };

  const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      setEntryList(await addNewEntry(formData));
      (e.target as HTMLFormElement).reset();
      closeForm();
    };

  const mobileForm: JSX.Element | null =
    showDialog === "y" ? <dialog ref={dialogRef} className="w-screen h-screen bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col mt-32 ">
        <input
          type="date"
          name="entryDate"
          className="text-3xl max-w-60"
          defaultValue={dateToday}
        />
        <div className="flex flex-col mt-16 gap-12">
          <input
            className="border-b-2 border-neutral-300 placeholder:font-semibold "
            type="text"
            name="productName"
            placeholder="Enter roduct name"
          />
          <input
            className="border-b-2 border-neutral-300 placeholder:font-semibold "
            type="number"
            name="grams"
            placeholder="Grams"
          />
          <button className="size-14 bg-primary text-5xl text-white rounded-full flex justify-center aspect-square self-center cursor-pointer">
            +
          </button>
        </div>
      </form>
    </dialog> : null;

  return mobileForm;
};

export default MobileForm;
