"use server";
import axios from "axios";
import {
  axiosPost,
  calorieCalculator,
  defaultSession,
  fetchBannedProducts,
  sessionOptions,
} from "./services";
import { TSessionData } from "./definitions";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export const userCredetials = async () => {
  const sessionCookies = await cookies();
  const session = await getIronSession<TSessionData>(
    sessionCookies,
    sessionOptions
  );
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const registerUser = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password") as string;

  if (!password) {
    throw new Error("Password is required");
  }
  try {
    const response = await axios.post("http://localhost:3000/api/register", {
      name,
      email,
      password,
    });
    return response.status;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(String(error));
  }
};

export const loginUser = async (
  prevState: { error: undefined | string },
  formData: FormData
): Promise<any> => {
  const session = await userCredetials();
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  const response = await axiosPost("api/login", email, password);
  if (response?.status === 200) {
    session.userId = response.user._id;
    session.userName = response.user.name;
    session.userEmail = response.user.email;
    session.isLoggedIn = true;
    await session.save();
    redirect("/calculator");
  } else {
    return { error: response?.error };
  }
};

export const calculateUserKcal = async (formData: FormData): Promise<any> => {
  const storeData = await userCredetials();
  const params = new URLSearchParams();
  const height = formData.get("height") as string;
  const age = formData.get("age") as string;
  const currentWeight = formData.get("currentWeight") as string;
  const desiredWeight = formData.get("desiredWeight") as string;
  const bloodType = formData.get("bloodType");
  const recomandedCalories = calorieCalculator(
    height ? parseFloat(height) : 0,
    age ? parseFloat(age) : 0,
    currentWeight ? parseFloat(currentWeight) : 0,
    desiredWeight ? parseFloat(desiredWeight) : 0
  );
  const bannedProducts = await fetchBannedProducts(Number(bloodType));
  if (bannedProducts) {
    storeData.bannedFoods = bannedProducts;
    storeData.recomandedCals = recomandedCalories;
    await storeData.save();
  }
  params.set("recomandedCalories", recomandedCalories.toString());
  params.set("bloodType", formData.get("bloodType") as string);
  params.set("sd", "y");
  redirect(`/calculator?${params.toString()}`);
};

export const addNewEntry = async (formData: FormData): Promise<any> => {
  const session = await userCredetials();
  const productName = formData.get("productName") as string;
  const grams = formData.get("grams") as string;
  const entryDate = formData.get("entryDate") as string;
  await axios.post("http:/localhost:3000/api/user-entries", {
    product: productName,
    grams,
    date: entryDate,
    owner: session.userId,
  });
  revalidateTag("user-entries");
  redirect("/diary");
};

export const deleteEntry = async (formData: FormData): Promise<any> => {
  const id = formData.get("id");
  await axios.delete("http://localhost:3000/api/user-entries", {
    data: { _id: id },
  });
  revalidateTag("user-entries");
  redirect("/diary");
};

export const logoutUser = async () => {
  const session = await userCredetials();
  session.destroy();
  redirect("/");
};
