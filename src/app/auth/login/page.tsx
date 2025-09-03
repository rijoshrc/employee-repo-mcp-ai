"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handlePodioLogin = () => {
    // Redirect to our OAuth authorization endpoint
    window.location.href = "/api/auth/podio";
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "oauth_error":
        return "OAuth authentication failed. Please try again.";
      case "state_mismatch":
        return "Security validation failed. Please try again.";
      case "no_code":
        return "Authorization code not received. Please try again.";
      case "token_exchange_failed":
        return "Token exchange failed. Please try again.";
      case "profile_fetch_failed":
        return "Failed to fetch user profile. Please try again.";
      case "callback_error":
        return "Authentication callback failed. Please try again.";
      default:
        return "An error occurred during authentication. Please try again.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your Podio AI Chat Assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {getErrorMessage(error)}
            </div>
          )}

          {/* Podio OAuth Button */}
          <Button
            onClick={handlePodioLogin}
            className="w-full bg-[#2E5BBA] hover:bg-[#1E4BA0] text-white"
            size="lg"
          >
            <Zap className="mr-2 h-4 w-4" />
            Continue with Podio
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Don't have a Podio account?{" "}
              <a
                href="https://podio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Sign up at Podio.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
