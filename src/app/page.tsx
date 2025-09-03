import { AIChatbot } from "@/components/ui/shadcn-io/ai/chatbot";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col">
      {/* Header with user info and logout */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold">Podio AI Chat Assistant</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>demo@example.com</span>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full">
        {/* Left Column - Conversation History */}
        <div className="w-80 border-r bg-muted/30">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Conversations</h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-background border cursor-pointer hover:bg-accent">
                <div className="font-medium text-sm">
                  React Development Help
                </div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
              <div className="p-3 rounded-lg bg-background border cursor-pointer hover:bg-accent">
                <div className="font-medium text-sm">Next.js Configuration</div>
                <div className="text-xs text-muted-foreground">1 day ago</div>
              </div>
              <div className="p-3 rounded-lg bg-background border cursor-pointer hover:bg-accent">
                <div className="font-medium text-sm">
                  TypeScript Best Practices
                </div>
                <div className="text-xs text-muted-foreground">3 days ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Chat Interface */}
        <div className="flex-1">
          <AIChatbot />
        </div>
      </div>
    </main>
  );
}
