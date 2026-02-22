"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-eth-border bg-eth-card/50 backdrop-blur-sm">
      <h1 className="text-xl font-bold text-white tracking-tight">
        <span className="text-eth-blue">ETH</span> Pay
      </h1>
      <ConnectButton />
    </header>
  );
}
