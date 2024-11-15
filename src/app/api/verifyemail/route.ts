import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const token = reqBody.body;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gte: Date.now() },
    });

    if (!user)
      return NextResponse.json({ error: "token expired" }, { status: 500 });

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "user verified" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
