// Temporarily disabled NextAuth to isolate the issue
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Podio",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (credentials?.email && credentials?.password) {
//           return {
//             id: "1",
//             email: credentials.email,
//             name: credentials.email.split("@")[0],
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       if (token.user && session.user) {
//         (session.user as any).id = token.user.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
// });

// Temporary mock exports
export const handlers = {
  GET: () => new Response(),
  POST: () => new Response(),
};
export const auth = async () => null;
export const signIn = async () => null;
export const signOut = async () => null;
