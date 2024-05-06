import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";



export async function GET(request) {
  await connectMongoDB();
  const user = await User.find();
  return NextResponse.json({ user }, { status: 200 });
}