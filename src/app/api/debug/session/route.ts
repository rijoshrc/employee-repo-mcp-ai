import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("podio_session");

  if (sessionCookie?.value) {
    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionCookie.value, "base64").toString()
      );

      return NextResponse.json({
        hasSession: true,
        user: sessionData.user,
        tokenExpires: new Date(sessionData.tokens.expires_at).toISOString(),
        sessionExpires: sessionData.expires,
        isTokenExpired: Date.now() > sessionData.tokens.expires_at,
        isSessionExpired: new Date(sessionData.expires) < new Date(),
      });
    } catch (error) {
      return NextResponse.json({
        hasSession: true,
        error: "Failed to parse session data",
        rawValue: sessionCookie.value.substring(0, 100) + "...",
      });
    }
  } else {
    return NextResponse.json({
      hasSession: false,
      message: "No session cookie found",
    });
  }
}
