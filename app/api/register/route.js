// import connectMongoDB from "@/libs/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export async function POST(request) {
//     const { name, email, password } = await request.json();
//     await connectMongoDB();
//     await User.create({ name, email, password });
//     return NextResponse.json({ message: "User Created" }, { status: 201 });
// }


// export async function POST(request) {
//     try {
        
//         const { email, password } = await request.json();
//         await connectMongoDB();

//         const user = await User.findOne({ email });

//         if (!user || !(await compare(password, user.password))) {
//             return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//         }
//         // const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
//         //     expiresIn: '1h'
//         // });

//         return NextResponse.json({ token });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Server error' }, { status: 500 });
//     }
// }

// Import necessary modules

import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        // Extract data from the request body
        const { name, email, password } = await request.json();

        // Connect to MongoDB
        await connectMongoDB();

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });

        // If user already exists, return an error
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ name, email, password: hashedPassword });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Return success response with token
        return NextResponse.json({ token }, {newUser});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
