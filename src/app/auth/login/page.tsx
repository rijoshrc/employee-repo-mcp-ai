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

export default function LoginPage() {
  const handlePodioLogin = () => {
    // Temporarily disabled NextAuth
    console.log("Podio login clicked - NextAuth temporarily disabled");
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
