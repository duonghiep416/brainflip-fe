import { parseDuration } from "@/utils/dateTime";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Gọi API backend
    const response = await fetch(`${process.env.SERVER_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": request.headers.get('cookie') || ''
      }
    });

    const data = await response.json();
    console.log('dataLogout', data)
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Tạo response
    const res = NextResponse.json({ message: "Logout successful" });

    // Đặt cookie thủ công qua header "Set-Cookie"
    // (Hoặc bạn có thể dùng cookies() từ "next/headers" để thao tác cookies)

    const maxAgeAccess = parseDuration('0d');
    const maxAgeRefresh = parseDuration('0d');

    res.headers.set(
      "Set-Cookie",
      `accessToken=${data?.accessToken?.token}; HttpOnly; Path=/; Max-Age=${maxAgeAccess}; SameSite=Strict;${
        process.env.NODE_ENV !== "development" ? " Secure;" : ""
      }`
    );

    res.headers.append(
      "Set-Cookie",
      `refreshToken=${data?.refreshToken?.token}; HttpOnly; Path=/; Max-Age=${maxAgeRefresh}; SameSite=Strict;${
        process.env.NODE_ENV !== "development" ? " Secure;" : ""
      }`
    );

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "An unknown error occurred" },
      { status: 500 }
    );
  }
}
