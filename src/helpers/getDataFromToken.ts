import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getDataFromToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  const user = jwt.verify(token, process.env.SECRET_TOKEN!);

  if (typeof user === "object" && "id" in user) return user.id;
  return user;
}
