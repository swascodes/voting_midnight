# Midnight Voting Counter

> A privacy-preserving voting contract on the Midnight network that lets users cast verifiable votes without revealing their identity or ballot token.

## Contract Address

| Network  | Address                          |
|----------|----------------------------------|
| Preview  | [PASTE ADDRESS AFTER DEPLOY]     |
| Preprod  | [PASTE ADDRESS AFTER DEPLOY]     |

> **Note:** Deploy with `npm run deploy -- --network preview` or `npm run deploy -- --network preprod`, then paste the contract address here.

## What This Does

This contract implements a privacy-preserving vote counter on the Midnight blockchain. Users cast votes by proving they hold a valid ballot token (a non-zero secret value). The contract:

1. **Validates eligibility** — the voter must supply a valid, non-zero `voteToken` as a private witness (zero-knowledge proof input).
2. **Increments a public counter** — every successful vote increases the on-chain `round` counter by exactly 1.
3. **Discloses only the increment** — only the fact that "1 vote was cast" is made public via `disclose(1)`. The voter's token, identity, or any other private data never touches the blockchain.

This means anyone can verify the total vote count on-chain, but no one can determine who voted or what token they used.

## Privacy Model

- **What is PUBLIC** (on-chain, visible to anyone):
  - `round` — the total number of votes cast (a running counter)
  - `lastPublicIncrement` — the most recent disclosed increment value (always `1` for a valid vote)

- **What is PRIVATE** (private witness, never on-chain):
  - `voteToken` — a secret ballot token proving the voter's eligibility, supplied off-chain at transaction time

- **What the user PROVES without revealing:**
  - The voter knows a valid `voteToken` (specifically, that it is non-zero) without exposing its actual value on-chain
  - Only the fact that exactly one vote was cast is reflected in the public counter — nothing about the voter's identity or token leaks

## Tech Stack

- **Midnight Network** — privacy-focused L1 blockchain with zero-knowledge proof support
- **Compact Language** — Midnight's domain-specific language for writing private smart contracts
- **Node.js v22+** — JavaScript runtime for tooling, tests, and deployment scripts
- **Docker** — runs the local proof server for ZK proof generation
- **Vitest** — test framework for contract circuit simulation
- **TypeScript** — type-safe development for all project scripts

## Prerequisites

Before running this project locally, ensure you have:

1. **Node.js v22 or later** — [Download](https://nodejs.org/)
   ```bash
   node --version   # Should print v22.x.x or higher
   ```

2. **Docker** — [Download](https://www.docker.com/)
   ```bash
   docker --version   # Should print Docker version 20+
   ```

3. **Compact Compiler** — Midnight's smart contract compiler
   ```bash
   # Install via npm (requires Midnight registry access) or use WSL
   compact --version   # Should print compact 0.5.x
   ```

4. **Midnight Proof Server** (Docker image)
   ```bash
   docker pull midnightnetwork/proof-server
   ```

5. **tNIGHT tokens** — required for deploying to Preview or Preprod testnets
   - Preview faucet: https://midnight-tmnight-preview.nethermind.dev
   - Preprod faucet: https://midnight-tmnight-preprod.nethermind.dev

## Setup

```bash
# 1. Clone the repository
git clone <YOUR_REPO_URL>
cd voting

# 2. Install dependencies
npm install

# 3. Start the proof server (required for deployment)
docker run -d -p 6300:6300 midnightnetwork/proof-server

# 4. Compile the Compact contract (via WSL if on Windows)
npm run compile
# Or if compact is available natively:
npm run compile:local

# 5. Verify compilation
ls managed/counter/contract/   # Should contain index.js, index.d.ts
ls managed/counter/keys/       # Should contain .prover and .verifier files
```

## Run Tests

```bash
# Run all tests
npm test

# Compile and run tests in one step
npm run test:compile
```

Expected output:
```
 ✓ tests/counter.test.ts (3 tests) 123ms
   ✓ Voting counter smart contract > generates initial ledger state deterministically
   ✓ Voting counter smart contract > transitions public state when casting a vote
   ✓ Voting counter smart contract > never exposes private witness values on the public ledger

 Test Files  1 passed (1)
      Tests  3 passed (3)
```

### What the tests cover:

| Test | What it verifies |
|------|-----------------|
| Deterministic initial state | Two fresh simulators produce identical ledger state |
| State transitions | Casting a vote increments `round` to 1 and sets `lastPublicIncrement` to 1 |
| Privacy guarantee | A secret token value (42) used as a witness never appears in the serialized public ledger |

## Deploy

```bash
# Deploy to Preview testnet
npm run deploy -- --network preview

# Deploy to Preprod testnet
npm run deploy -- --network preprod

# Check active network and last deployment
npm run network
```

The deploy script will:
1. Create (or restore) a wallet
2. Sync with the network
3. Wait for faucet funding if balance is zero
4. Register NIGHT UTXOs for DUST generation
5. Submit the contract deployment transaction
6. Print the deployed contract address

## Project Structure

```
voting/
├── contracts/
│   └── counter.compact          ← Compact smart contract source
├── managed/                     ← Auto-generated by compact compile
│   └── counter/
│       ├── contract/            ← Generated JS/TS bindings
│       ├── keys/                ← Prover/verifier keys
│       ├── compiler/            ← Compiler artifacts
│       └── zkir/                ← Zero-knowledge IR
├── src/
│   ├── deploy.ts                ← Deployment script
│   ├── network.ts               ← Network configuration & state management
│   ├── wallet.ts                ← Wallet creation & sync
│   ├── wallet-state.ts          ← Wallet state persistence
│   ├── check-balance.ts         ← Balance checking utility
│   └── witnesses.ts             ← Witness implementations
├── tests/
│   ├── counter.test.ts          ← Test suite (3 tests)
│   └── counter-simulator.ts     ← Contract simulator for testing
├── .github/
│   └── workflows/               ← CI/CD (placeholder)
├── package.json
├── tsconfig.json
└── README.md
```

## Initial Idea

[PLACEHOLDER — Fill this in manually with your original project concept and motivation]

## Screenshots

[PLACEHOLDER — Add screenshots of:
- Compact compiler output
- Test results
- Deployed contract address
- Any other relevant outputs]
