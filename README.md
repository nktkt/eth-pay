# ETH Pay

A web application for sending and receiving ETH on the Sepolia testnet.

## Features

- Wallet connection via RainbowKit (MetaMask, WalletConnect, etc.)
- ETH balance display
- Send ETH with gas estimation
- Receive ETH with QR code and address copy
- Transaction history via Etherscan API

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **wagmi v2** + **viem v2** — Ethereum interactions
- **RainbowKit v2** — Wallet connection UI
- **Tailwind CSS v3** — Styling
- **react-qr-code** — QR code generation
- **bun** — Package manager

## Setup

### Prerequisites

- [Bun](https://bun.sh/) installed
- [MetaMask](https://metamask.io/) or another Ethereum wallet

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment variables

Copy the example and fill in your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
ETHERSCAN_API_KEY=your_api_key_here
```

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | [Reown (WalletConnect)](https://cloud.reown.com/sign-in) |
| `ETHERSCAN_API_KEY` | [Etherscan](https://etherscan.io/apis) |

> **Important:** Never commit `.env.local` to version control. It is already included in `.gitignore`.

### 3. Run the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout + Providers
│   ├── page.tsx                  # Main dashboard
│   └── api/transactions/
│       └── route.ts              # Etherscan API proxy
├── components/
│   ├── Providers.tsx             # WagmiProvider + RainbowKit
│   ├── Header.tsx                # Header with ConnectButton
│   ├── BalanceDisplay.tsx        # ETH balance card
│   ├── SendEth.tsx               # Send form + gas estimation
│   ├── ReceiveEth.tsx            # Address + QR code
│   └── TransactionHistory.tsx    # Transaction list
├── config/
│   └── wagmi.ts                  # wagmi + RainbowKit config
├── lib/
│   └── etherscan.ts              # Etherscan API utility
└── types/
    └── index.ts                  # Type definitions
```

## Security Notes

- `ETHERSCAN_API_KEY` is **server-side only** — it is never exposed to the browser. API calls to Etherscan go through the `/api/transactions` proxy route.
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is intentionally public (required by the WalletConnect SDK on the client side).
- The API route validates that the `address` parameter is a valid Ethereum address before forwarding requests.

## License

MIT
