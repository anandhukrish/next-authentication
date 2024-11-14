import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import connect from "@/dbConfig/db";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  //body data

  try {
    const reqBody: {
      body: { username: string; password: string; email: string };
    } = await request.json();

    const { username, password, email } = reqBody.body;

    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "All fields (username, password, email) are required." },
        { status: 400 }
      );
    }

    // if user exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exist" });
    }

    //encrypt the password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //craete user

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    await sendMail(email, "VERIFY", savedUser._id);

    return NextResponse.json({
      user: savedUser,
      message: "successfully created",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
