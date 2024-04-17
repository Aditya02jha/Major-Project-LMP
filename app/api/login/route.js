import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        // Extract email and password from the request body
        const { email, password } = await request.json();

        // Connect to MongoDB
        await connectMongoDB();

        // Find the user with the provided email
        const user = await User.findOne({ email });

        // If user not found or password doesn't match, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Return success response with token
        return NextResponse.json({ token, user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
