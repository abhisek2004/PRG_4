import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/dbConnect";
import bcrypt from "bcryptjs";


// Function to create or find a user
async function findOrCreateUser(email: string, name: string) {
  // console.log("oAuth", email,name, profileURL);
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && user.password) {
    throw new Error("Invalid user");
  }

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        isVerified:true,
      },
    });
  }

  return user;
}

// Extend the session and JWT types to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      profielURL:string
    };
  }
  
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const { email, password } = credentials;
  
          const user = await prisma.user.findUnique({
            where: { email },
          });
  
          if (!user) {
            throw new Error("No user found with this email");
          }
  
          if(!user.isVerified){
            throw new Error("Please verify your account before logging in");
          }

          if(!user.password){
            throw new Error("You are not sign Up with Email");
          }
  
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password!!
          );
          if (isPasswordCorrect) return user;
          else throw new Error("Incorrect password");

        } catch (error:any) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("signin",user, account, profile);

      if (account?.provider !== "credentials" && profile && typeof profile === 'object') {
        const email = user.email || "";
        const name = user.name || "";
        
        const dbUser = await findOrCreateUser(email, name);
        if (dbUser) {
          user.id = dbUser.id;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // console.log("jwt", token, user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("session", session, token);
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.profielURL = token.picture as string
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    error: "/sign-in"
  },
};
