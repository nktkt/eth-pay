"use client";

import { useAccount } from "wagmi";
import QRCode from "react-qr-code";
import { useState } from "react";

export default function ReceiveEth() {
  const { address, isConnected } = useAccount();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) return null;

  return (
    <div className="bg-eth-card border border-eth-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">受取</h2>

      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-xl">
          <QRCode value={address ?? ""} size={160} />
        </div>

        <div className="w-full">
          <label className="block text-sm text-gray-400 mb-1">
            あなたのアドレス
          </label>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-eth-dark border border-eth-border rounded-lg px-3 py-2 text-xs text-gray-300 truncate">
              {address}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 bg-eth-dark border border-eth-border hover:border-eth-blue text-gray-300 hover:text-white px-3 py-2 rounded-lg text-xs transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Sepolia テストネットのアドレスです
        </p>
      </div>
    </div>
  );
}
