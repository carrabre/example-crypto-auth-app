"use client";

import { ConnectButton, useActiveAccount, useConnect } from "thirdweb/react";
import { client } from "./client";
import { inAppWallet } from "thirdweb/wallets";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { base } from "thirdweb/chains";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "apple", "email"],
    },
  }),
];

export default function Home() {
  const { isConnecting } = useConnect();
  const account = useActiveAccount();
  const router = useRouter();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (account && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      router.replace("/dashboard");
    }
  }, [account, router]);

  return (
    <main className="min-h-[100vh] container max-w-screen-lg mx-auto">
      {/* Hidden prefetch link to warm the dashboard route */}
      <Link href="/dashboard" prefetch className="hidden" aria-hidden="true">
        Prefetch Dashboard
      </Link>

      {/* Navigation bar with sign in button */}
      <nav className="p-4 flex justify-end">
        <ConnectButton
          client={client}
          wallets={wallets}
          chain={base}
          onConnect={() => {
            try { window.localStorage.setItem("tw_last_wallet", "inapp"); } catch {}
            if (!hasNavigatedRef.current) {
              hasNavigatedRef.current = true;
              router.replace("/dashboard");
            }
          }}
          onDisconnect={() => { try { window.localStorage.removeItem("tw_last_wallet"); } catch {} }}
          appMetadata={{
            name: "Example App",
            url: "https://example.com",
          }}
        />
      </nav>

      {/* Main content */}
      <div className="flex items-center justify-center">
        <div className="py-20">
          <Header />
          <ThirdwebResources />
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        example auth
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Next.js </span>
      </h1>

    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="Link 1"
        href="https://openai.com"
        description="example description"
      />

      <ArticleCard
        title="Link 2"
        href="https://openai.com"
        description="example description"
      />

      <ArticleCard
        title="Link 3"
        href="https://google.com"
        description="example description"
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
