import connectMongoDB from "@/libs/mongodb";
import Question from "@/models/questions";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const { id } = params;

        let { text, options, correctOptionIndex, level } = await request.json();

        // console.log("new ques",text)
        await connectMongoDB();

        correctOptionIndex = correctOptionIndex +1;
        if (!text || !options || !correctOptionIndex ||!level) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newQuestion = await Question.create({
            topic: id, // Reference to the specified topic ID
            text,
            options,
            correctOptionIndex,
            level
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
    // console.log("req", request);
    // const urlParams = new URLSearchParams(request.url.split('?')[1]);
    // const level = urlParams.get('level');
    // console.log("level", level);

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


// export async function GET(request, { params }) {
//     const { id } = params;
//     const urlParams = new URLSearchParams(request.url.split('?')[1]);
//     const level = urlParams.get('level');
//     console.log(request);

//     await connectMongoDB();
//     try {
//         // Fetch questions based on the topic ID and level
//         const questions = await Question.find({ topic: id, level: level });
        
//         if (!questions || questions.length === 0) {
//             return NextResponse.json({ message: "Questions not found for the specified level" }, { status: 404 });
//         }
        
//         return NextResponse.json({ questions }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching questions:", error);
//         return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//     }
// }
