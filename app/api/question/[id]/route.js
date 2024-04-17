import connectMongoDB from "@/libs/mongodb";
import Question from "@/models/questions";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const { id } = params;

        let { text, options, correctOptionIndex } = await request.json();

        // console.log("new ques",text)
        await connectMongoDB();

        correctOptionIndex = correctOptionIndex +1;
        if (!text || !options || !correctOptionIndex) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newQuestion = await Question.create({
            topic: id, // Reference to the specified topic ID
            text,
            options,
            correctOptionIndex,
        });

        return NextResponse.json({ newQuestion });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// export async function GET(request, { params }) {
//     const { id } = params;
//     await connectMongoDB();
//     const question = await Question.findOne({ _id: id });
//     console.log("id",id)
//     return NextResponse.json({ question }, { status: 200 });
// }

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    try {
        const question = await Question.find({ topic: id });
        // console.log("Question:", question);
        if (!question) {
            return NextResponse.json({ message: "Question not found" }, { status: 404 });
        }
        return NextResponse.json({ question }, { status: 200 });
    } catch (error) {
        console.error("Error fetching question:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
