import Image from "next/image";
import blob from "@/public/blob.svg";
import banana from "@/public/banana.png";
import strawberry from "@/public/strawberry-web.png";
import leafs from "@/public/leafs.png";
import leafsTab from "@/public/leafs-tab.png";
import Modal from "@/ui/modal/modal";
import { calculateUserKcal, userCredetials } from "@/lib/actions";

const Home = async () => {
  const dataSession = await userCredetials();
  const bannedFoods = dataSession.bannedFoods;
  return (
    <>
      <Modal bannedProductsList={bannedFoods}></Modal>
      <div className="flex flex-col h-fit sm:w-4/5 md:w-[38rem] px-5 sm:px-8 md:px-4">
        <h1 className="font-bold text-lg mt-8 sm:text-4xl sm:mt-24 z-10 ">
          Calculate your daily calorie intake right now
        </h1>
        <form
          action={calculateUserKcal}
          className="bg-transparent grid grid-cols-1 sm:grid-cols-2 sm:place-items-start mt-8 z-10"
        >
          <div className="flex flex-col gap-8">
            <input
              type="number"
              name="height"
              placeholder="Enter your height *"
              required
              className="w-full border-b-2 border-neutral-400 text-secondary font-semibold focus-visible:outline-none sm:py-5"
            />
            <input
              type="number"
              name="age"
              placeholder="Enter your age *"
              required
              className="w-full border-b-2 border-neutral-400 text-secondary font-semibold focus-visible:outline-none  sm:py-5"
            />
            <input
              type="number"
              name="currentWeight"
              placeholder="Enter your weight *"
              required
              className="w-full border-b-2 border-neutral-400 text-secondary font-semibold focus-visible:outline-none sm:py-5"
            />
          </div>
          <div className="mt-8 flex flex-col gap-1 sm:m-0">
            <input
              type="number"
              name="desiredWeight"
              placeholder="Enter your goal weight *"
              required
              className="w-full border-b-2 border-neutral-400 text-secondary font-semibold focus-visible:outline-none sm:py-5"
            />
            <div>
              <p className="w-full mt-8 text-neutral-500 font-semibold sm:border-b-2 border-neutral-400   sm:py-5 sm:mt-[28px]">
                Blood type *
              </p>
              <div className="flex justify-around w-full items-center gap-1 sm:mt-5">
                {[1, 2, 3, 4].map((num) => (
                  <label
                    key={num}
                    className="flex justify-center space-x-1 items-center cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="bloodType"
                      id={`bld${num}`}
                      value={num}
                      className="hidden peer "
                      required
                    />
                    <span className="size-5 border-2 b border-neutral-400order-gra border-neutral-400y-500 rounded-full flex items-center justify-center peer-checked:border-pri border-neutral-400mary peer-checked:bg-primary peer-checked:ring-inset peer-checked:ring-2 peer-checked:ring-white transition-all"></span>
                    <span className="text-gray-800 peer-checked:text-primary">
                      {num}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button className="btn-calculator cursor-pointer">
            Start losing weight
          </button>
        </form>
        <Image
          src={blob}
          alt="blob"
          className=" hidden md:block md:absolute md:-bottom-48 md:-right-8 lg:-right-0 lg:bottom-0 lg:-w[38rem] lg:h-[51rem]"
        />
        <Image
          width={498}
          height={450}
          src={banana}
          alt="banana image"
          className="hidden md:block md:absolute md:-bottom-28 md:right-0 lg:-top-4"
        />
        <Image
          width={286}
          height={279}
          src={strawberry}
          alt="strawberry image"
          className="hidden md:block md:absolute md:bottom-48 md:right-10 lg:bottom-0 lg:right-32"
        />
        <Image
          width={530}
          height={531}
          src={leafsTab}
          alt="leafs image image"
          className="hidden md:block md:absolute md:-bottom-0 md:left-4 lg:hidden"
        />
        <Image
          width={746}
          height={846}
          src={leafs}
          alt="leafs image image"
          className="hidden lg:block lg:absolute lg:right-56 lg:top-0"
        />
      </div>
    </>
  );
};

export default Home;
