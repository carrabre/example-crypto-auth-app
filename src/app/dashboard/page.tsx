"use client";

import dynamic from "next/dynamic";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { client } from "../client";
import { base } from "thirdweb/chains";
import { useEffect, useState } from "react";

const LoadingAnimation = dynamic(() => import("@/components/LoadingAnimation"), { ssr: false });

export default function Dashboard() {
  const account = useActiveAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (account === undefined) {
      const id = setTimeout(() => setTimedOut(true), 4000);
      return () => clearTimeout(id);
    } else {
      setTimedOut(false);
    }
  }, [account]);

  if (!mounted) return null;

  // If still unknown after timeout, send to home to retry connect
  if (account === undefined && timedOut) {
    router.replace("/");
    return null;
  }

  // Show loading state while connecting/unknown
  if (account === undefined) {
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
  if (account === null) {
    router.replace("/");
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
          chain={base}
          onConnect={() => { try { window.localStorage.setItem("tw_last_wallet", "inapp"); } catch {} }}
          onDisconnect={() => { try { window.localStorage.removeItem("tw_last_wallet"); } catch {} ; router.replace("/"); }}
        />
      </nav>
      
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center space-y-6">
          <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800">
            <h1 className="text-3xl font-bold mb-4">You&apos;re signed in! 🎉</h1>
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