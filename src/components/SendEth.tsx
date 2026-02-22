"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useEstimateGas,
} from "wagmi";
import { parseEther, isAddress } from "viem";

export default function SendEth() {
  const { isConnected } = useAccount();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const isValidAddress = to !== "" && isAddress(to);
  const isValidAmount = amount !== "" && parseFloat(amount) > 0;

  const { data: gasEstimate } = useEstimateGas(
    isValidAddress && isValidAmount
      ? {
          to: to as `0x${string}`,
          value: parseEther(amount),
        }
      : undefined
  );

  const {
    data: txHash,
    sendTransaction,
    isPending: isSending,
    error: sendError,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isConfirmed) {
      setStatusMessage("送金完了!");
      setTo("");
      setAmount("");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (sendError) {
      setStatusMessage(`エラー: ${sendError.message.split("\n")[0]}`);
    }
  }, [sendError]);

  const handleSend = () => {
    if (!isValidAddress || !isValidAmount) return;
    setStatusMessage("");
    sendTransaction({
      to: to as `0x${string}`,
      value: parseEther(amount),
    });
  };

  if (!isConnected) return null;

  return (
    <div className="bg-eth-card border border-eth-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">送金</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">送金先アドレス</label>
          <input
            type="text"
            placeholder="0x..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full bg-eth-dark border border-eth-border rounded-lg px-4 py-3 text-white placeholder-gray-600 font-mono text-sm focus:outline-none focus:border-eth-blue transition-colors"
          />
          {to && !isValidAddress && (
            <p className="text-red-400 text-xs mt-1">無効なアドレスです</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">金額 (ETH)</label>
          <input
            type="number"
            placeholder="0.01"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-eth-dark border border-eth-border rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-eth-blue transition-colors"
          />
        </div>

        {gasEstimate && (
          <p className="text-xs text-gray-500">
            推定ガス: {gasEstimate.toLocaleString()} units
          </p>
        )}

        <button
          onClick={handleSend}
          disabled={!isValidAddress || !isValidAmount || isSending || isConfirming}
          className="w-full bg-eth-blue hover:bg-eth-blue/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
        >
          {isSending
            ? "署名中..."
            : isConfirming
            ? "確認中..."
            : "送金する"}
        </button>

        {statusMessage && (
          <p
            className={`text-sm text-center ${
              statusMessage.startsWith("エラー")
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {statusMessage}
          </p>
        )}

        {txHash && (
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs text-eth-blue hover:underline"
          >
            Etherscanで確認
          </a>
        )}
      </div>
    </div>
  );
}
