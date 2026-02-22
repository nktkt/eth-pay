"use client";

import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { Transaction } from "@/types";

export default function TransactionHistory() {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!address) return;

    const fetchTxs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/transactions?address=${address}`);
        const data = await res.json();
        if (data.status === "1") {
          setTransactions(data.result);
        } else {
          setTransactions([]);
        }
      } catch {
        setError("履歴の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchTxs();
  }, [address]);

  if (!isConnected) return null;

  const formatDate = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortenAddress = (addr: string) =>
    addr && addr.length > 10
      ? `${addr.slice(0, 6)}...${addr.slice(-4)}`
      : addr || "Contract Creation";

  return (
    <div className="bg-eth-card border border-eth-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        トランザクション履歴
      </h2>

      {loading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-14 bg-eth-border rounded-lg" />
          ))}
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && transactions.length === 0 && !error && (
        <p className="text-gray-500 text-sm text-center py-4">
          トランザクションはありません
        </p>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {transactions.map((tx) => {
          const isSent =
            tx.from.toLowerCase() === address?.toLowerCase();
          return (
            <a
              key={tx.hash}
              href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-eth-dark rounded-lg hover:bg-eth-border transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    isSent
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {isSent ? "↑" : "↓"}
                </div>
                <div>
                  <p className="text-sm text-white">
                    {isSent ? "送金" : "受取"}
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    {isSent
                      ? `To: ${shortenAddress(tx.to)}`
                      : `From: ${shortenAddress(tx.from)}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    isSent ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {isSent ? "-" : "+"}
                  {parseFloat(formatEther(BigInt(tx.value))).toFixed(4)} ETH
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(tx.timeStamp)}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
