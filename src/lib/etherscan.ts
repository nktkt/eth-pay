import { EtherscanResponse } from "@/types";

const ETHERSCAN_API_BASE = "https://api-sepolia.etherscan.io/api";

export async function getTransactions(
  address: string
): Promise<EtherscanResponse> {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const url = `${ETHERSCAN_API_BASE}?module=account&action=txlist&address=${encodeURIComponent(address)}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc&apikey=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) {
    throw new Error("Etherscan API request failed");
  }
  return res.json();
}
