import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  // Temporarily disabled NextAuth
  // Redirect to login for now
  redirect("/auth/login");
}
