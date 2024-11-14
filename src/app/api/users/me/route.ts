import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    return NextResponse.json({ userId });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message });
  }
}
