"use client";

import { ConnectButton, useConnect } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { client } from "../client";
import { base } from "thirdweb/chains";

export default function Dashboard() {
  const { status } = useConnect();
  const router = useRouter();

  console.log("Current status:", status); // Debug log

  // Immediately show home page if not connected
  if (status === "disconnected") {
    router.push("/");
    return null;
  }

  // Show dashboard content for any other status
  return (
    <main className="min-h-[100vh] container max-w-screen-lg mx-auto">
      <nav className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <ConnectButton 
          client={client}
          buttonText="Sign In"
          chain={base}
          onDisconnect={() => router.push("/")}
        />
      </nav>
      
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center space-y-6">
          <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800">
            <h1 className="text-3xl font-bold mb-4">You're signed in! 🎉</h1>
            <p className="text-zinc-400">Click your profile in the top right to logout</p>
            <p className="mt-4 text-sm text-zinc-500">
              Connected to Base Network
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 