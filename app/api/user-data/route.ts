import dbConnect from "@/lib/dbConnect";
import Product from "@/models/productSchema";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const searchQuery = searchParams.get("bloodType") || 0;
    const querry = { [`groupBloodNotAllowed.${searchQuery}`]: true };
    const data = await Product.distinct("categories", querry);
    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
    return NextResponse.json(err);
  }
};

export const PATCH = async (request: Request) => {
  try {
    await dbConnect();
    const data = await request.json();
    const user = await User.findOne({ _id: data.id });
    user.userData.bannedProducts = data.bannedProducts;
    user.userData.recomandedKcal = data.recomandedKcal;
    await user.save();
    return NextResponse.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    } else {
      console.log(err);
    }
    return NextResponse.json(err);
  }
};
