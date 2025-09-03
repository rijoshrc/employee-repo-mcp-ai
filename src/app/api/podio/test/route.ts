import { NextRequest, NextResponse } from "next/server";
import { getPodioUserProfile, getPodioWorkspaces } from "@/lib/podio-api";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get user profile and workspaces to demonstrate API access
    const [userProfile, workspaces] = await Promise.all([
      getPodioUserProfile(),
      getPodioWorkspaces(),
    ]);

    return NextResponse.json({
      user: session.user,
      profile: userProfile,
      workspaces: workspaces.slice(0, 5), // Limit to first 5 workspaces
      tokenInfo: {
        expiresAt: new Date(session.tokens.expires_at).toISOString(),
        isExpired: Date.now() > session.tokens.expires_at,
      },
    });
  } catch (error) {
    console.error("API test error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Podio data" },
      { status: 500 }
    );
  }
}
