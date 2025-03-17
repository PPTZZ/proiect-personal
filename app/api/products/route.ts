import dbConnect from "@/lib/dbConnect";
import Product from "@/models/productSchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const searchQuery = searchParams.get("bloodType") || 0;
    const querry = { [`groupBloodNotAllowed.${searchQuery}`]: true };

    const products = await Product.distinct("categories", querry);

    return NextResponse.json(products, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }

    return NextResponse.json(err);
  }
};
