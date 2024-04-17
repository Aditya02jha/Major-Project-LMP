import connectMongoDB from "@/libs/mongodb";
import Question from "@/models/questions";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const allQuestion = await Question.find();
    return NextResponse.json({ allQuestion });
}