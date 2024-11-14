import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const { token, password } = reqBody;

  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: { $gte: Date.now() },
  });

  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  const hashedPassword = await bcryptjs.hash(password, 10);

  user.password = hashedPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;

  await user.save();

  return NextResponse.json({ message: "password changed" });
}
