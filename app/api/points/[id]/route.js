// pages/api/points/[userId].js

import connectMongoDB from "@/libs/mongodb";
import Point from "@/models/points";
import { NextResponse } from "next/server";

export  async function GET(request, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();

        // console.log("idddd", id)
        // Find the user's points by userId
        const userPoints = await Point.findOne({ user: id });

        if (!userPoints) {
            return NextResponse.json({ points: 0 }); // Return 0 points if no points document found
        }

        return NextResponse.json({ points: userPoints.points });
    } catch (error) {
        console.error("Error fetching user points:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
