"use client"
import React from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications

function OauthTemplate() {
  

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      const result = await signIn(provider, { callbackUrl: "/compiler/javascript", redirect: false });
    } catch (error) {
      // console.error(`${provider} sign-in error:`, error);
      toast.error(`An error occurred during ${provider} sign-in`);
    }
  };

  return (
    <div>
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <motion.button
          onClick={() => handleOAuthSignIn("google")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full inline-flex justify-center items-center py-2 px-4 border border-muted rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted/50"
        >
          <span className="sr-only">Sign in with Google</span>
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          Google
        </motion.button>

        <motion.button
          onClick={() => handleOAuthSignIn("github")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full inline-flex justify-center items-center py-2 px-4 border border-muted rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted/50"
        >
          <span className="sr-only">Sign in with GitHub</span>
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </motion.button>
      </div>
    </div>
  </div>
  );
}

export default OauthTemplate;