// import connectMongoDB from "@/libs/mongodb";
// import Point from "@/models/points";
// import { NextResponse } from "next/server";

// export  async function GET(request) {
    

//     try {
//         await connectMongoDB();

//         // console.log("idddd", id)
//         // Find the user's points by userId
//         const userPoints = await Point.findOne({ user: id });

//         if (!userPoints) {
//             return NextResponse.json({ points: 0 }); // Return 0 points if no points document found
//         }

//         return NextResponse.json({ points: userPoints.points });
//     } catch (error) {
//         console.error("Error fetching user points:", error);
//         return NextResponse.json({ error: 'Server error' }, { status: 500 });
//     }
// }


// import connectMongoDB from "@/libs/mongodb";
// import Point from "@/models/points";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//     try {
//         await connectMongoDB();

//         // Retrieve the userId from localStorage
//         const userId = localStorage.getItem("userId");

//         if (!userId) {
//             return NextResponse.json({ error: "User ID not found in localStorage" }, { status: 400 });
//         }

//         // Find the user's points by userId
//         const userPoints = await Point.findOne({ user: userId });

//         if (!userPoints) {
//             return NextResponse.json({ points: 0 }); // Return 0 points if no points document found
//         }

//         return NextResponse.json({ points: userPoints.points });
//     } catch (error) {
//         console.error("Error fetching user points:", error);
//         return NextResponse.json({ error: 'Server error' }, { status: 500 });
//     }
// }

// pages/api/userPoints.js

import connectMongoDB from "@/libs/mongodb";
import Point from "@/models/points";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectMongoDB();

        // Parse the URL search parameters from the request URL
        const urlParams = new URLSearchParams(request.url.split('?')[1]);
        const userId = urlParams.get('userId');

        // console.log("idd", userId)
        if (!userId) {
            return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
        }

        // Find the user's points by userId
        const userPoints = await Point.findOne({ user: userId });

        if (!userPoints) {
            return NextResponse.json({ points: 0 }); // Return 0 points if no points document found
        }

        return NextResponse.json({ points: userPoints.points });
    } catch (error) {
        console.error("Error fetching user points:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
