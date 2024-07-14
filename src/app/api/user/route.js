import connectMongoDB from "@/app/lib/mongodb";
import AiArt from "@/app/models/AiArt";


import { NextResponse } from "next/server";

export async function POST(request){
    const { name, email } = await request.json();
    await connectMongoDB();
    try {
      await AiArt.create({ name, email });
      return NextResponse.json({ message: "AiArt Registered" }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Registration failed: " + error.message }, { status: 500 });
    }
}