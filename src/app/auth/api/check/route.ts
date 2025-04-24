"use server";

import { LoginOne } from "@/type";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.has("access_token");
  const refreshToken = cookieStore.has("refresh_token");
  const getHeaders = await headers();
  const host = getHeaders.get("host") ?? "";
  if (accessToken || refreshToken) {
    const res = await fetch(`${process.env.API_URL}/auth/check`, {
      method: "GET",
      headers: {
        "User-Agent": getHeaders.get("user-agent") ?? "",
        Cookie: cookieStore.toString(),
        Host: host,
      },
    });
    if (!res.ok) {
      return NextResponse.json(null);
    }
    const data = (await res.json()) as LoginOne;
    return NextResponse.json(data.data);
  } else {
    return NextResponse.json(null);
  }
}
