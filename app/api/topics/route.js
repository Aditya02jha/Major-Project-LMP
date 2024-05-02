// import connectMongoDB from "@/libs/mongodb";
// import Topic from "@/models/topic";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const { title, description, variety } = await request.json();
//   await connectMongoDB();
//   await Topic.create({ title, description, variety });
//   return NextResponse.json({ message: "Topic Created" }, { status: 201 });
// }

import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Extract title, description, and variety from request body
    const { title, description, variety, read } = await request.json();

    // Log the received data
    // console.log("Received Data:", { title, description, variety, read });

    // Connect to MongoDB
    await connectMongoDB();

    // Create a new topic with the provided data
    await Topic.create({ title, description, variety, read });

    // Return success response
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error creating topic:", error);

    // Return error response
    return NextResponse.error("Failed to create topic", { status: 500 });
  }
}


export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}