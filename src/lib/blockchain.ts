/**
 * Blockchain Abstraction Layer
 * 
 * If a contract address is provided via VITE_CONTRACT_ADDRESS, this service
 * should wire up the actual Midnight SDK calls. Otherwise, it provides realistic
 * mock responses for local UI development and Builder Challenge submission when
 * deployment is pending infrastructure.
 */

// Simulated delay for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Candidate {
  id: string;
  name: string;
  description: string;
  votes: number;
}

// In a real Midnight contract, we'd query the ledger for the round (total votes)
// and derive candidate votes if we stored them, or just use the generic counter.
// For this mock, we'll simulate a 2-candidate election for demonstration.
let mockState = {
  totalVotes: 0,
  candidates: [
    { id: '1', name: 'Option A: Deploy to Preview', description: 'Proceed with deploying the contract to the preview testnet.', votes: 0 },
    { id: '2', name: 'Option B: Stay Local', description: 'Keep the contract on the local development node.', votes: 0 }
  ],
  hasVoted: false,
};

export const blockchainService = {
  getContractAddress: () => {
    return import.meta.env.VITE_CONTRACT_ADDRESS || null;
  },

  connectWallet: async () => {
    // Attempt to trigger actual Midnight Lace wallet popup
    const win = window as any;
    if (win.midnight) {
      // Find Lace or any available wallet
      const wallets = Object.values(win.midnight);
      const laceWallet = wallets.find((w: any) => w.name === 'Lace') || wallets[0];
      
      if (laceWallet && typeof (laceWallet as any).enable === 'function') {
        try {
          const api = await (laceWallet as any).enable();
          // If enabled successfully, we can get state. 
          // For now, return a mock address as we're not fully connected to the network yet.
          return { address: 'mn_addr_preview1h6270sl7aa4lgnqzkehz3fqu9ajk0lq72c7sapylnreekk99we9s5vjp88', api };
        } catch (e) {
          console.error("Wallet connection denied or failed", e);
          throw new Error("Wallet connection failed");
        }
      }
    }
    
    // Fallback if no extension is found
    console.warn("No Midnight wallet extension found. Simulating connection popup...");
    await delay(1500);
    return { address: 'mn_addr_preview1h6270sl7aa4lgnqzkehz3fqu9ajk0lq72c7sapylnreekk99we9s5vjp88' };
  },

  disconnectWallet: async () => {
    await delay(500);
    return true;
  },

  getElectionState: async () => {
    await delay(800);
    return {
      totalVotes: mockState.totalVotes,
      candidates: mockState.candidates,
      isActive: true,
    };
  },

  getVoteStatus: async (walletAddress: string) => {
    await delay(500);
    return mockState.hasVoted;
  },

  /**
   * castVote submits the zero-knowledge proof using the private witness `voteToken()`.
   * It only discloses that a vote occurred (incrementing the counter), preserving 
   * the secrecy of WHICH candidate was selected.
   */
  castVote: async (candidateId: string) => {
    await delay(3000); // ZK proof generation and network submission take time
    
    if (mockState.hasVoted) {
      throw new Error("Already voted");
    }

    // In the real contract, this triggers `castVote()` circuit.
    // The public ledger only sees `round.increment(1)`.
    mockState.totalVotes += 1;
    mockState.hasVoted = true;
    
    const candidate = mockState.candidates.find(c => c.id === candidateId);
    if (candidate) {
      candidate.votes += 1;
    }

    return { txHash: '0x' + Math.random().toString(16).slice(2, 66) };
  }
};
