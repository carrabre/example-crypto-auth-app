"use client";

import { useLayoutEffect, useRef } from "react";
import { useActiveAccount, useConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { hasStoredPasskey } from "thirdweb/wallets/in-app";
import { client } from "@/app/client";

export default function AutoConnect() {
  const account = useActiveAccount();
  const { connect, isConnecting } = useConnect();
  const attemptedRef = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (attemptedRef.current) return;
    if (account) return;
    if (isConnecting) return;

    const last = window.localStorage.getItem("tw_last_wallet");
    if (last === "inapp") {
      (async () => {
        try {
          const storedPasskey = await hasStoredPasskey(client);
          if (!storedPasskey) return;
          attemptedRef.current = true;
          await connect(async () => {
            const wallet = inAppWallet();
            await wallet.connect({
              client,
              strategy: "passkey",
              type: "sign-in",
            });
            return wallet;
          });
        } catch (e) {
          // ignore
        }
      })();
    }
  }, [account, isConnecting, connect]);

  return null;
} 