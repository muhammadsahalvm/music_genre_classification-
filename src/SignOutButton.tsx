"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      className="px-6 py-2 rounded-full bg-black text-white font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all"
      onClick={() => void signOut()}
    >
      Log Out
    </button>
  );
}
