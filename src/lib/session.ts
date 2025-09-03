import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export interface PodioSession {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
  expires: string;
}

export async function getSession(
  request?: NextRequest
): Promise<PodioSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("podio_session");

    if (!sessionCookie?.value) {
      return null;
    }

    // Use base64 encoding for session data
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, "base64").toString()
    );

    // Check if session has expired
    if (new Date(sessionData.expires) < new Date()) {
      return null;
    }

    // Check if access token has expired
    if (Date.now() > sessionData.tokens.expires_at) {
      // Token expired, try to refresh
      const refreshedSession = await refreshSession(
        sessionData.tokens.refresh_token
      );
      return refreshedSession;
    }

    return sessionData;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function refreshSession(
  refreshToken: string
): Promise<PodioSession | null> {
  try {
    const response = await fetch("https://podio.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.PODIO_CLIENT_ID!,
        client_secret: process.env.PODIO_CLIENT_SECRET!,
      }),
    });

    if (!response.ok) {
      console.error("Token refresh failed");
      return null;
    }

    const tokenData = await response.json();

    // Fetch updated user profile
    const profileResponse = await fetch("https://api.podio.com/user/profile", {
      headers: {
        Authorization: `OAuth2 ${tokenData.access_token}`,
      },
    });

    if (!profileResponse.ok) {
      console.error("Failed to fetch user profile during refresh");
      return null;
    }

    const userProfile = await profileResponse.json();

    // Create new session data
    const sessionData: PodioSession = {
      user: {
        id: userProfile.user_id.toString(),
        name: userProfile.name,
        email: userProfile.mail,
        avatar: userProfile.avatar_url,
      },
      tokens: {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token || refreshToken,
        expires_at: Date.now() + tokenData.expires_in * 1000,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    // Update session cookie with base64 encoding
    const cookieStore = await cookies();
    const sessionCookie = Buffer.from(JSON.stringify(sessionData)).toString(
      "base64"
    );
    cookieStore.set("podio_session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    });

    return sessionData;
  } catch (error) {
    console.error("Error refreshing session:", error);
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  // Delete the session cookie
  cookieStore.delete("podio_session");
}

// Utility function to get access token for API calls
export async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  return session?.tokens.access_token || null;
}

// Utility function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
