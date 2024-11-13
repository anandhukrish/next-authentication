import { NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout success full",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    if (error instanceof Error)
      NextResponse.json({ error: error.message }, { status: 500 });
  }
}
