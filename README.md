# Midnight Voting

A privacy-preserving voting application built on the Midnight Network for the Midnight Builder Challenge.

## Description

This project demonstrates a zero-knowledge voting system where eligibility is proven and votes are cast securely without revealing the voter's identity or their specific choice. By leveraging Midnight's Compact language, the application ensures that the public ledger only sees a valid proof and an incremented counter, completely abstracting the complex cryptography behind a seamless user experience.

## Initial Product Idea

Traditional voting systems force a trade-off between transparency and privacy. Our zero-knowledge voting application resolves this by utilizing Midnight Network's unique privacy features. Voters can cryptographically prove their right to vote and their adherence to the rules without exposing their ballot or identity, ensuring a verifiable, tamper-proof election where privacy remains paramount.

## Features

- **Zero-Knowledge Voting**: Prove eligibility and cast a vote without exposing the choice to the public ledger.
- **Publicly Verifiable Ledger**: The total vote count is transparent and immutable.
- **Glassmorphism UI**: A polished, modern, responsive interface inspired by the Midnight brand.
- **Real-Time Results**: Live updates pulled directly from the blockchain state.
- **Blockchain Abstraction**: Clean separation of frontend and ledger communication.

## Tech Stack

- **Blockchain**: Midnight Network, Compact Smart Contracts
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons
- **Wallet**: Midnight Wallet SDK, NightHawk/Lace Integration

## Architecture

The application is structured into two main layers:
1. **Smart Contract (`contracts/counter.compact`)**: Defines the public ledger state (total votes) and the zero-knowledge circuit that verifies a voter's private witness before allowing the state to increment.
2. **Frontend UI (`src/`)**: A React application that manages user interaction. It uses a blockchain abstraction service (`src/lib/blockchain.ts`) to connect to the wallet, generate proofs locally using the SDK, and broadcast transactions to the Midnight node.

## Privacy Model

- **Public Ledger State**: The total number of votes cast is tracked publicly on-chain. Anyone can verify the integrity of the election results.
- **Private Witnesses**: The voter's identity and specific ballot choices remain entirely off-chain. They are supplied as a "private witness" directly to the zero-knowledge circuit running locally on the user's device.
- **What is Proven?**: The zero-knowledge circuit mathematically proves that the user holds a valid voting token and exactly one vote was cast. The ledger accepts the proof and increments the counter, without ever "knowing" who voted or what they voted for.

## Contract Address

**Preview:** Pending Deployment
**Preprod:** Pending Deployment

## Local Setup

### Prerequisites
- Node.js >= 22
- Docker (for local Midnight Proof Server)
- Midnight Compact Compiler

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Compile the Compact contract:
```bash
npm run compile:local
```

3. Run the test suite to verify the circuits:
```bash
npm run test
```

4. Start the frontend development server:
```bash
npm run dev
```

## Running Tests

Tests are written using Vitest and utilize the Compact simulator to verify both valid state transitions and privacy-preserving invalid states (e.g., attempting to vote twice).

```bash
npm run test
```

## Screenshots

- ![Compile Output](compile-output.png)
<<<<<<< HEAD
- ![Home Screen - Cyber Forest Theme](home.png)
- ![Connect Wallet Screen](connect-wallet.png)
- ![Vote Submitted successfully with Transaction Hash](vote-submitted.png)
- ![Live Results from Public Ledger](results.png)
=======
- ![Deployment](deployment.png)
- ![Home Screen](<img width="1411" height="686" alt="image" src="https://github.com/user-attachments/assets/885008ec-cfbe-4bde-bdc0-2a5131352144" />
)
- ![Voting Interface](vote.png)
- ![Results Page](results.png)
>>>>>>> 90e1dad014cfbee865d5f349b976c3b9d6ac9a4d

## Live Demo

**Vercel:** [Pending Deployment](#)

## Future Improvements

- Implementing dynamic ballot generation with multiple verifiable races.
- Integrating a decentralized identity (DID) provider for voter registration.
- Expanding the frontend to support historical election data and analytics.
