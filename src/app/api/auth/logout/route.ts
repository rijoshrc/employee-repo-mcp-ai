import { NextRequest, NextResponse } from "next/server";
import { clearSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    // Clear the session
    await clearSession();

    // Redirect to login page
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
