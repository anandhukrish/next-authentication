import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/db";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    console.log(reqBody);
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    sendMail(email, "FORGET", user._id);

    return NextResponse.json({
      message: "email send succesfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
