// import connectMongoDB from "@/libs/mongodb";
// import User from "@/models/user";
// import { NextResponse } from "next/server";

// export async function PUT(request,{ params }) {
//     // if (req.method !== "POST") {
//     //     return res.status(405).json({ message: "Method Not Allowed" });
//     // }

//     const { id } = params;
//     // console.log("request", request.body);
//     // const { badge } = request.body;

//     // const badge = await request.json().value;
//     const { badge } = JSON.parse(request.json());
// console.log(badge); // Output: Beginner

//     try {
//         await connectMongoDB();


//         // Find the user by userId and update the badge
//         console.log("ba",badge);
//         const user = await User.findByIdAndUpdate(id, { badge }, { new: true });

//         if (!user) {
//             // return res.status(404).json({ message: "User not found" });
//             return NextResponse.json({message: "User not found"  });
//         }

//         // return res.status(200).json({ message: "Badge updated successfully", user });
//         return NextResponse.json({ message: "Badge updated successfully" }, { user });
//     } catch (error) {
//         console.error("Error updating badge:", error);
//         return res.status(500).json({ error: "Server error" });
//     }
// }


import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    console.log(request)
    const { id } = params;
    // const { badge } = request.query;
    const urlParams = new URLSearchParams(request.url.split('?')[1]);
    // const userId = urlParams.get('userId');
    const badge = urlParams.get('badge');
    console.log("Badge:", badge); // Output: Beginner


    try {
        await connectMongoDB();

        // Find the user by userId and update the badge
        console.log("Badge:", badge);
        const user = await User.findByIdAndUpdate(id, { badge }, { new: true });

        if (!user) {
            return NextResponse.json({ message: "User not found" });
        }

        return NextResponse.json({ message: "Badge updated successfully" }, { user });
    } catch (error) {
        console.error("Error updating badge:", error);
        return NextResponse.error({ statusCode: 500, message: "Server error" });
    }
}
