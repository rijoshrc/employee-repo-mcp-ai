import { NextRequest, NextResponse } from "next/server";
import { clearSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    // Clear the session
    await clearSession();

    return NextResponse.json({
      success: true,
      message: "Session cleared successfully",
    });
  } catch (error) {
    console.error("Test logout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear session",
      },
      { status: 500 }
    );
  }
}
