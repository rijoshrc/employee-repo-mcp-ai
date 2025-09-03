import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state") || crypto.randomUUID();

  // Podio OAuth 2.0 Authorization URL
  const podioAuthUrl = new URL("https://podio.com/oauth/authorize");
  podioAuthUrl.searchParams.set("client_id", process.env.PODIO_CLIENT_ID!);
  podioAuthUrl.searchParams.set(
    "redirect_uri",
    process.env.PODIO_REDIRECT_URI!
  );
  podioAuthUrl.searchParams.set("response_type", "code");
  podioAuthUrl.searchParams.set("state", state);
  podioAuthUrl.searchParams.set("scope", "openid profile email");

  // Store state in a secure cookie for CSRF protection
  const response = NextResponse.redirect(podioAuthUrl.toString());
  response.cookies.set("podio_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });

  return response;
}
