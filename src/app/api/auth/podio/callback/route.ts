import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface PodioTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

interface PodioUserProfile {
  user_id: number;
  name: string;
  mail: string;
  avatar_url?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // Get stored state from cookie
  const cookieStore = await cookies();
  const storedState = cookieStore.get("podio_oauth_state")?.value;

  // Clear the state cookie
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete("podio_oauth_state");

  // Handle OAuth errors
  if (error) {
    console.error("Podio OAuth error:", error);
    return NextResponse.redirect(
      new URL("/auth/login?error=oauth_error", request.url)
    );
  }

  // Validate state parameter for CSRF protection
  if (!state || !storedState || state !== storedState) {
    console.error("OAuth state mismatch");
    return NextResponse.redirect(
      new URL("/auth/login?error=state_mismatch", request.url)
    );
  }

  // Validate authorization code
  if (!code) {
    console.error("No authorization code received");
    return NextResponse.redirect(
      new URL("/auth/login?error=no_code", request.url)
    );
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await fetch("https://podio.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.PODIO_CLIENT_ID!,
        client_secret: process.env.PODIO_CLIENT_SECRET!,
        redirect_uri: process.env.PODIO_REDIRECT_URI!,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Token exchange failed:", errorData);
      return NextResponse.redirect(
        new URL("/auth/login?error=token_exchange_failed", request.url)
      );
    }

    const tokenData: PodioTokenResponse = await tokenResponse.json();

    // Fetch user profile from Podio
    const profileResponse = await fetch("https://api.podio.com/user/profile", {
      headers: {
        Authorization: `OAuth2 ${tokenData.access_token}`,
      },
    });

    if (!profileResponse.ok) {
      console.error("Failed to fetch user profile");
      return NextResponse.redirect(
        new URL("/auth/login?error=profile_fetch_failed", request.url)
      );
    }

    const userProfile: PodioUserProfile = await profileResponse.json();

    // Create session data
    const sessionData = {
      user: {
        id: userProfile.user_id.toString(),
        name: userProfile.name,
        email: userProfile.mail,
        avatar: userProfile.avatar_url,
      },
      tokens: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: Date.now() + tokenData.expires_in * 1000,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    };

    // Store session in secure cookie with base64 encoding
    const sessionCookie = Buffer.from(JSON.stringify(sessionData)).toString(
      "base64"
    );
    response.cookies.set("podio_session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/auth/login?error=callback_error", request.url)
    );
  }
}
