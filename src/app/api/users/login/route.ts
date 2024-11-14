import bcryptjs from "bcryptjs";
import connect from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody: { body: { email: string; password: string } } =
      await request.json();
    const {
      body: { email, password },
    } = reqBody;

    //check user

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "invalid email" }, { status: 500 });
    }

    //check password

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "invalid password" }, { status: 500 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        error: "failed to login try again",
      },
      { status: 500 }
    );
  }
}
