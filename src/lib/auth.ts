// Temporarily disabled NextAuth to isolate the issue
// Will be re-enabled once we resolve the OpenID client compatibility issues
export const handlers = {
  GET: () => new Response("NextAuth temporarily disabled", { status: 200 }),
  POST: () => new Response("NextAuth temporarily disabled", { status: 200 }),
};
export const auth = async () => null;
export const signIn = async () => null;
export const signOut = async () => null;
