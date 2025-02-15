"use client";

import Image from "next/image";
import { ConnectButton, useConnect } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { inAppWallet } from "thirdweb/wallets";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { base } from "thirdweb/chains";

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "email",
        "google",
        "telegram",
        "facebook",
        "x",
      ],
    },
  }),
];

export default function Home() {
  const { status } = useConnect();
  const router = useRouter();

  console.log("Home status:", status); // Debug log

  useEffect(() => {
    if (status === "connected") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <main className="min-h-[100vh] container max-w-screen-lg mx-auto">
      {/* Navigation bar with sign in button */}
      <nav className="p-4 flex justify-end">
        <ConnectButton
          connectModal={{ 
            size: "wide",
            centerModal: true 
          }}
          client={client}
          wallets={wallets}
          buttonText="Sign In"
          connectText="Sign In"
          disconnectText="Sign Out"
          chain={base}
          onConnect={() => router.push("/dashboard")}
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
      {/* <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      /> */}

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
