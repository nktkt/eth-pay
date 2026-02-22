import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
import { getTransactions } from "@/lib/etherscan";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");

  if (!address || !isAddress(address)) {
    return NextResponse.json(
      { status: "0", message: "Valid Ethereum address is required", result: [] },
      { status: 400 }
    );
  }

  try {
    const data = await getTransactions(address);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: "0", message: "Failed to fetch transactions", result: [] },
      { status: 500 }
    );
  }
}
