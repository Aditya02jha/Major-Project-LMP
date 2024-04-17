// import connectMongoDB from "@/libs/mongodb";
// import User from "@/models/user";

// export async function PUT(request) {
//     // if (req.method !== "POST") {
//     //     return res.status(405).json({ message: "Method Not Allowed" });
//     // }

//     console.log("request", request);
//     const { userId } = req.query;
//     const { badge } = req.body;

//     try {
//         await connectMongoDB();

//         // Find the user by userId and update the badge
//         const user = await User.findByIdAndUpdate(userId, { badge }, { new: true });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // return res.status(200).json({ message: "Badge updated successfully", user });
//         return NextResponse.json({ message: `Badge updated successfully to ${badge}` }, { user });
//     } catch (error) {
//         console.error("Error updating badge:", error);
//         return res.status(500).json({ error: "Server error" });
//     }
// }


import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request) {
    // console.log(request)
    
    // const { badge } = request.query;
    // const urlParams = new URLSearchParams(request.url.split('?')[1]);
    // const id = urlParams.get('userId');
    // const badge = urlParams.get('badge');
    // console.log("req:", request); // Output: Beginner
    const urlParams = new URLSearchParams(request.url.split('?')[1]);
const id = urlParams.get('userId');
const badge = urlParams.get('badge');



try {
    await connectMongoDB();
    
    // Find the user by userId and update the badge
    // console.log("Badge:", badge); // Output: Noob
        // console.log("Badge:, id", badge, id);
        const user = await User.findByIdAndUpdate(id, { badge }, { new: true });

        if (!user) {
            return NextResponse.json({ message: "User not found" });
        }


        return NextResponse.json({ message: "Badge updated successfully" }, { user },{"badge":badge});
    } catch (error) {
        console.error("Error updating badge:", error);
        return NextResponse.error({ statusCode: 500, message: "Server error" });
    }
}
