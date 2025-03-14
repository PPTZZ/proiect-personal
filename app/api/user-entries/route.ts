import dbConnect from "@/lib/dbConnect";
import Entry from "@/models/entrySchema";
import Product from "@/models/productSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const owner = searchParams.get("userId");
    const entries = await Entry.find({ owner: owner });
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message);
    } else {
      return NextResponse.json("An unknown error occurred");
    }
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const data = await req.json();
    const { product, grams, date, owner } = data;
    const { title, calories } = await Product.findOne({
      title: product,
    });
    const productCalories = (calories / 100) * grams;
    const newEntry = new Entry({
      productName: title,
      grams,
      date,
      kcal: productCalories,
      owner,
    });
    await newEntry.save();
    const entries = await Entry.find({ owner: owner });
    return NextResponse.json(entries, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error creating entry:", err.message);
      return NextResponse.json(
        { message: "Failed to create entry", error: err.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", err);
      return NextResponse.json(
        {
          message: "Failed to create entry",
          error: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
};


export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();
    console.log("Database connected");

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }
    
    const deletedEntry = await Entry.findOneAndDelete({ _id: id });

    if (!deletedEntry) {
      return NextResponse.json({ message: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error removing entry:", err.message);
      return NextResponse.json(
        { message: "Failed to remove entry", error: err.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", err);
      return NextResponse.json(
        {
          message: "Failed to remove entry",
          error: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
};

