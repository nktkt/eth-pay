"use client";

import { useAccount } from "wagmi";
import Header from "@/components/Header";
import BalanceDisplay from "@/components/BalanceDisplay";
import SendEth from "@/components/SendEth";
import ReceiveEth from "@/components/ReceiveEth";
import TransactionHistory from "@/components/TransactionHistory";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-eth-dark">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <BalanceDisplay />

        {isConnected && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <SendEth />
              <ReceiveEth />
            </div>

            <div className="mt-6">
              <TransactionHistory />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
