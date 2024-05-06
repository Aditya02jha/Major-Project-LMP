import connectMongoDB from "@/libs/mongodb";
import Question from "@/models/questions";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const allQuestion = await Question.find();
    return NextResponse.json({ allQuestion });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Question.findByIdAndDelete(id);
    return NextResponse.json({ message: "Question deleted" }, { status: 200 });
  }