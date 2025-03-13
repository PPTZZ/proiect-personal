"use client";
import { NextPage } from "next";
import Image from "next/image";
import blob from "@/public/blob.svg";
import banana from "@/public/banana.png";
import strawberry from "@/public/strawberry-web.png";
import leafs from "@/public/leafs.png";
import leafsTab from "@/public/leafs-tab.png";
import Link from "next/link";
import { useActionState } from "react";
import { loginUser } from "@/lib/actions";
import { useRouter } from "next/navigation";

const Login: NextPage = ({}) => {
  const [state, formAction] = useActionState<any, FormData>(
    loginUser,
    undefined
  );
  const router = useRouter();
  const handleClick = () => {
    router.replace("/register");
  };
  return (
    <div>
      <form
        action={formAction}
        className="bg-transparent mt-10 z-10 flex flex-col sm:w-96 items-center px-5 sm:items-start"
      >
        <h2 className="font-semibold text-primary">LOG IN</h2>
        <input
          type="text"
          name="email"
          placeholder="Email *"
          required
          className="w-full sm:w-2/3 border-b-2 text-secondary font-semibold focus-visible:outline-none py-5 mt-14"
        />
        <input
          type="password"
          name="password"
          placeholder="Password *"
          required
          className="w-full sm:w-2/3 border-b-2 text-secondary font-semibold focus-visible:outline-none py-5"
        />
        {state?.error && <p>{state.error}</p>}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-8">
          <button type="submit" className="btn-normal">
            Log in
          </button>
          <button onClick={handleClick} className="btn-outline">
            Register
          </button>
        </div>
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
  );
};

export default Login;
