"use client";

import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

export default function BalanceDisplay() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });

  if (!isConnected) {
    return (
      <div className="bg-eth-card border border-eth-border rounded-xl p-6">
        <p className="text-gray-400 text-center">
          ウォレットを接続してください
        </p>
      </div>
    );
  }

  return (
    <div className="bg-eth-card border border-eth-border rounded-xl p-6">
      <h2 className="text-sm font-medium text-gray-400 mb-2">残高</h2>
      {isLoading ? (
        <div className="animate-pulse h-10 bg-eth-border rounded w-48" />
      ) : (
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">
            {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : "0"}
          </span>
          <span className="text-lg text-gray-400">ETH</span>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2 font-mono truncate">
        {address}
      </p>
    </div>
  );
}
