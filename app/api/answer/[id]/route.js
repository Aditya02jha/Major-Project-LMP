// import connectMongoDB from "@/libs/mongodb";
// import Question from "@/models/questions";
// import User from "@/models/user";
// import Answer from "@/models/answer";
// import { NextResponse } from "next/server";

// export async function POST(request, { params }) {
//     try {
//         const { id } = params;

//         const { selectedOptionIndex, user } = await request.json(); // Assuming you pass userId in the request

//         await connectMongoDB();

//         // Check if selectedOptionIndex and userId are present
//         if (!selectedOptionIndex || !user) {
//             return NextResponse.json({ message: "Select an option and provide a user ID" }, { status: 400 });
//         }

//         // Find the question by its ID
//         const question = await Question.findById(id);

//         // Check if the question exists
//         if (!question) {
//             return NextResponse.json({ message: "Question not found" }, { status: 404 });
//         }

//         // Create a new answer
//         const newAnswer = await Answer.create({
//             user,
//             question: question._id,
//             selectedOptionIndex,
//         });

//         return NextResponse.json({ newAnswer });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Server error' }, { status: 500 });
//     }
// }



import connectMongoDB from "@/libs/mongodb";
import Question from "@/models/questions";
import Point from "@/models/points";
import Answer from "@/models/answer";
import { NextResponse } from "next/server";

const updateUserPoints = async (userId, correctAnswer) => {
    try {
        // Retrieve user's current points
        let userPoints = await Point.findOne({ user: userId });
        
        if (!userPoints) {
            // If userPoints document doesn't exist, create a new one
            userPoints = await Point.create({ user: userId });
        }

        // Define the points to be awarded or deducted
        const pointsDelta = correctAnswer ? 5 : -2;

        // Update the user's points
        userPoints.points += pointsDelta;

        // Save the updated user points to the database
        await userPoints.save();
    } catch (error) {
        console.error("Error updating user points:", error);
    }
};


export async function POST(request, { params }) {
    try {
        const { id } = params;

        let { selectedOptionIndex, user } = await request.json();

        await connectMongoDB();
        // console.log(selectedOptionIndex)

        selectedOptionIndex = selectedOptionIndex + 1;
        // Check if selectedOptionIndex and user are present
        if (!selectedOptionIndex || !user) {
            return NextResponse.json({ message: "Select an option and provide a user ID" }, { status: 400 });
        }

        // Find the question by its ID
        const question = await Question.findById(id);

        // Check if the question exists
        if (!question) {
            return NextResponse.json({ message: "Question not found" }, { status: 404 });
        }

        // Check if the selected option index matches the correct option index
        const newAnswer = await Answer.create({
            user,
            question: question._id,
            selectedOptionIndex,
        });

        const isCorrect = selectedOptionIndex === question.correctOptionIndex;

        await updateUserPoints(user, isCorrect);

        if (isCorrect) {
            return NextResponse.json({ message: "Correct answer!", newAnswer });
        } else {
            return NextResponse.json({ message: "Incorrect answer. Try again!", newAnswer });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
