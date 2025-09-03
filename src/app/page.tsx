import { AIChatbot } from "@/components/ui/shadcn-io/ai/chatbot";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { clearSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/auth/login");
  }

  async function handleLogout() {
    "use server";
    try {
      // Clear the session directly
      await clearSession();
      // Redirect to login page
      redirect("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      redirect("/auth/login");
    }
  }

  return (
    <main className="flex h-screen w-screen flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Podio AI Chat Assistant</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{session.user.email}</span>
          </div>
          <form action={handleLogout}>
            <Button variant="outline" size="sm" type="submit">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <AIChatbot />
      </div>
    </main>
  );
}
