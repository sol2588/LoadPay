import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
  if (req.method == "POST") {
    const headers = new Headers();
    headers.append("Set-Cookie", "access-token=; HttpOnly; Path=/; Max-Age=0; SameSite=strict");
    return NextResponse.json({ message: "로그아웃 되었습니다." }, { headers });
  } else {
    return NextResponse.json({ message: "Invalid request method" }, { status: 405 });
  }
}
