"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function TestPage() {
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/debug/session");
      const data = await response.json();
      setSessionInfo(data);
    } catch (error) {
      setSessionInfo({ error: "Failed to check session" });
    }
    setLoading(false);
  };

  const testLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/test/logout", { method: "POST" });
      const data = await response.json();
      setSessionInfo(data);
      // Check session again after logout
      setTimeout(checkSession, 100);
    } catch (error) {
      setSessionInfo({ error: "Failed to logout" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Session Test</CardTitle>
          <CardDescription>
            Test session management and logout functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={checkSession} disabled={loading}>
              Check Session
            </Button>
            <Button onClick={testLogout} disabled={loading} variant="outline">
              Test Logout
            </Button>
          </div>

          {sessionInfo && (
            <div className="p-3 text-sm bg-gray-50 border rounded-md">
              <pre className="whitespace-pre-wrap text-xs">
                {JSON.stringify(sessionInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <p>Check browser console for middleware logs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
