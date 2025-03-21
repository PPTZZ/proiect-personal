"use server";
import axios from "axios";
import {
  axiosPost,
  calculateConsummedCals,
  calorieCalculator,
  defaultSession,
  fetchBannedProducts,
  sessionOptions,
} from "./services";
import { TSessionData } from "./definitions";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export const registerUser = async (formData: FormData): Promise<void> => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!password) {
    throw new Error("Password is required");
  }
  try {
    await axios.post("http://localhost:3000/api/register", {
      name,
      email,
      password,
    });
    return;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(String(error));
  }
};

export const loginUser = async (
  prevState: string | null,
  formData: FormData
) => {
  const session = await userCredetials();
  const email = formData.get("email") as FormDataEntryValue;
  const password = formData.get("password") as FormDataEntryValue;
  if (!email || !password) {
    return "Email and password are required";
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
    return response?.error;
  }
};

export const calculateUserKcal = async (formData: FormData): Promise<void> => {
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
  if (!storeData.isLoggedIn) {
    redirect(`/?${params.toString()}`);
  } else {
    redirect(`/calculator?${params.toString()}`);
  }
};

export const getEntryList = async () => {
  try {
    const session = await userCredetials();
    const userId = session.userId;
    const response = await axios.get(
      `http://localhost:3000/api/user-entries?userId=${userId}`
    );
    const consummedCals = calculateConsummedCals(response.data);
    session.consumedCals = consummedCals;
    await session.save();
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addNewEntry = async (
  formData: FormData
): Promise<
  { id: string; productName: string; grams: number; cals: number }[]
> => {

  const session = await userCredetials();
  const productName = formData.get("productName") as string;
  const grams = formData.get("grams") as string;
  const entryDate = formData.get("entryDate") as string;
  const response = await axios.post("http://localhost:3000/api/user-entries", {
    product: productName,
    grams,
    date: entryDate,
    owner: session.userId,
  });
  const consummedCals = calculateConsummedCals(response.data);
  session.consumedCals = consummedCals;
  await session.save();
  return response.data;
};

export const deleteEntry = async (
  formData: FormData
): Promise<object[] | null> => {
  try {
    const dataSession = await userCredetials();
    const id = formData.get("id") as string;

    if (!id) {
      throw new Error("Missing ID in formData");
    }

    const response = await axios.delete(
      `http://localhost:3000/api/user-entries?id=${id}`
    );

    if (response.status === 204 || response.status === 200) {
      try {
        const userId = dataSession.userId;
        const newList = await axios.get(
          `http://localhost:3000/api/user-entries?userId=${userId}`
        );
        const consummedCals = calculateConsummedCals(newList.data);
        dataSession.consumedCals = consummedCals;
        await dataSession.save();
        return newList.data;
      } catch (error) {
        console.error("Error fetching updated list:", error);
        throw error;
      }
    }

    return null;
  } catch (error) {
    console.error("Error deleting entry:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  const session = await userCredetials();
  session.destroy();
  redirect("/");
};
