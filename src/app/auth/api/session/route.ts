"use server";
import { getIronSession } from "iron-session";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { SESSION_OPTIONS } from "@/constants";
import { SessionData } from "@/type";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as SessionData;
  const session = await getIronSession<SessionData>(await cookies(), SESSION_OPTIONS);
  session.is_authenticated = true;
  session.occupation = payload.occupation;
  session.preferred_name = payload.preferred_name;
  session.username = payload.username;
  session.sso = payload.sso;
  session.access_token = payload.access_token;
  session.refresh_token = payload.refresh_token;
  session.roles = payload.roles;
  session.permissions = payload.permissions;
  session.created_at = payload.created_at;
  await session.save();
  return Response.json(session);
}

export async function GET() {
  const session = await getIronSession<SessionData>(await cookies(), SESSION_OPTIONS);
  return Response.json(session);
}

export async function DELETE() {
  const session = await getIronSession<SessionData>(await cookies(), SESSION_OPTIONS);
  session.destroy();
  const cookieStore = await cookies();
  const getHeaders = await headers();
  const host = getHeaders.get("host") ?? "";
  const domain = extractRootDomain(host);
  const appAccessToken = cookieStore.get("app_access_token");
  if (appAccessToken) {
    cookieStore.set({
      name: "access_token",
      value: "",
      path: "/",
      domain: `.${domain}`,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: -1,
    });
    cookieStore.set({
      name: "refresh_token",
      value: "",
      path: "/",
      domain: `.${domain}`,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: -1,
    });
  } else {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
  }
  cookieStore.delete("app_access_token");
  return Response.json(true);
}

function extractRootDomain(host: string) {
  if (host !== "") {
    const parts = host.split(".");
    return parts.length > 2 ? parts.slice(-2).join(".") : host;
  } else {
    return host;
  }
}
