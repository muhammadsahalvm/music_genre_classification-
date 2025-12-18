"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData).catch((error) => {
            let toastTitle = "";
            if (error.message.includes("Invalid password")) {
              toastTitle = "Invalid password. Please try again.";
            } else {
              toastTitle =
                flow === "signIn"
                  ? "Could not sign in, did you mean to sign up?"
                  : "Could not sign up, did you mean to sign in?";
            }
            toast.error(toastTitle);
            setSubmitting(false);
          });
        }}
      >
        <input
          className="auth-input-field"
          type="email"
          name="email"
          placeholder="Email address"
          required
        />
        <input
          className="auth-input-field"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="auth-button" type="submit" disabled={submitting}>
          {flow === "signIn" ? "Log In" : "Sign Up"}
        </button>
        <div className="text-center text-sm text-[#b3b3b3]">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-white hover:text-[#1DB954] hover:underline font-bold transition-colors cursor-pointer ml-1"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up for Music AI" : "Log in"}
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center my-6">
        <div className="h-px bg-[#282828] flex-grow"></div>
        <span className="mx-4 text-xs font-bold text-[#b3b3b3] uppercase tracking-widest">OR</span>
        <div className="h-px bg-[#282828] flex-grow"></div>
      </div>

      <button
        className="w-full px-4 py-3 rounded-full border border-[#535353] text-white font-bold uppercase tracking-widest hover:border-white hover:scale-105 transition-all"
        onClick={() => void signIn("anonymous")}
      >
        Continue Anonymously
      </button>
    </div>
  );
}
