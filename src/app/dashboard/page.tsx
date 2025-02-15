"use client";

import { ConnectButton, useConnect } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { client } from "../client";
import { base } from "thirdweb/chains";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function Dashboard() {
  const { status } = useConnect();
  const router = useRouter();

  console.log("Current status:", status); // Debug log

  // Show loading state while connecting
  if (status === "connecting" || status === "unknown") {
    return (
      <main className="min-h-[100vh] container max-w-screen-lg mx-auto">
        <div className="flex items-center justify-center h-[100vh]">
          <div className="text-center space-y-6">
            <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800">
              <LoadingAnimation />
              <h2 className="text-xl font-semibold mt-4">Connecting...</h2>
              <p className="text-zinc-400 text-sm mt-2">Please wait while we complete your sign in</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Immediately show home page if not connected
  if (status === "disconnected") {
    router.push("/");
    return null;
  }

  // Show dashboard content for connected status
  return (
    <main className="min-h-[100vh] container max-w-screen-lg mx-auto">
      <nav className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <ConnectButton 
          client={client}
          buttonText="Sign In"
          connectText="Sign In"
          disconnectText="Sign Out"
          chain={base}
          onDisconnect={() => router.push("/")}
        />
      </nav>
      
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center space-y-6">
          <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800">
            <h1 className="text-3xl font-bold mb-4">You're signed in! 🎉</h1>
            <p className="text-zinc-400">Click your profile in the top right to sign out</p>
            <p className="mt-4 text-sm text-zinc-500">
              Connected to Base Network
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 