import connectMongoDB from "@/app/lib/mongodb";
import AiArt from "@/app/models/AiArt";
import NextAuth from "next-auth"

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
      ],
      callbacks: {
        async signIn({ user, account }) {
          if (account.provider === "google" || account.provider === "github") {
            const { name, email } = user;
            try {
              await connectMongoDB();
              const userExists = await AiArt.findOne({ email });
    
              if (!userExists) {
                const res = await fetch(`http://localhost:3000/api/user`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    email,
                  }),
                });
    
                if (res.ok) {
                  return true;
                }
              } else {
                return true;
              }
            } catch (error) {
              console.log(error);
              return false;
            }
          }
          return false;
        },
        async session({ session, token }) {
          await connectMongoDB()
          const dbUser = await AiArt.findOne({ email: session.user.email });
    
          if (dbUser) {
            session.user.id = dbUser._id.toString(); // Add userId to session
            console.log(session.user.id)
          }
    
          return session;
        },
      },
})

export { handler as GET, handler as POST }