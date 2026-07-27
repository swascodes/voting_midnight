export interface MidnightWalletAPI {
  connect: () => Promise<MidnightDAppAPI>;
  name?: string;
  version?: string;
}

export interface WalletState {
  address: string;
  network: string | number;
  balances?: Record<string, string | number>;
}

export interface MidnightDAppAPI {
  state?: any; // Could be a function returning an observable, or the observable itself, or just an object
  state$?: any; // Sometimes named state$
  signTransaction: (tx: unknown) => Promise<unknown>;
  submitTransaction: (tx: unknown) => Promise<unknown>;
}

declare global {
  interface Window {
    midnight?: {
      mnLace?: MidnightWalletAPI;
      [key: string]: MidnightWalletAPI | undefined;
    };
  }
}

class BlockchainService {
  private api: MidnightDAppAPI | null = null;
  private currentAddress: string | null = null;
  private currentNetwork: string | number | null = null;
  private currentBalances: Record<string, string | number> | null = null;
  private stateSubscription: { unsubscribe: () => void } | null = null;

  async connectWallet(): Promise<{ address: string; network: string | number; balances: any }> {
    if (this.api && this.currentAddress) {
      return { 
        address: this.currentAddress, 
        network: this.currentNetwork || 'unknown', 
        balances: this.currentBalances 
      };
    }

    if (!window.midnight) {
      throw new Error("Please install or enable a Midnight compatible wallet (like Lace).");
    }

    // Dynamically discover the wallet provider (Lace injects a UUID key)
    const walletKeys = Object.keys(window.midnight);
    if (walletKeys.length === 0) {
      throw new Error("Midnight wallet object found, but no providers are available.");
    }
    
    // Grab the first available wallet provider
    const walletKey = walletKeys[0];
    const wallet = window.midnight[walletKey];

    if (!wallet || typeof wallet.connect !== 'function') {
      throw new Error("Invalid wallet API detected (missing connect method).");
    }

    try {
      this.api = await wallet.connect();
      
      return await new Promise((resolve, reject) => {
        // Try to find the state observable or state object
        let stateObj = this.api!.state || this.api!.state$;
        if (typeof stateObj === 'function') {
          // If it's a function (like api.state()), call it to get the observable
          stateObj = stateObj();
        }

        if (stateObj && typeof stateObj.subscribe === 'function') {
          this.stateSubscription = stateObj.subscribe({
            next: (state: WalletState) => {
              console.log("Wallet state received:", state);
              this.currentAddress = state.address;
              this.currentNetwork = state.network;
              this.currentBalances = state.balances || {};
              resolve({
                address: this.currentAddress,
                network: this.currentNetwork,
                balances: this.currentBalances
              });
            },
            error: (err: Error) => reject(new Error(err.message || "Network unavailable or wallet error."))
          });
        } else if (stateObj && stateObj.address) {
          // Fallback if it's just a static object
          this.currentAddress = stateObj.address;
          this.currentNetwork = stateObj.network || 'unknown';
          this.currentBalances = stateObj.balances || {};
          resolve({
            address: this.currentAddress,
            network: this.currentNetwork,
            balances: this.currentBalances
          });
        } else {
          console.error("Wallet API state object:", stateObj, "API:", this.api);
          reject(new Error("Wallet API does not support state() or the state object is missing 'address'. Please check the console."));
        }
      });
    } catch (e: any) {
      console.error("Connection Error Details:", e);
      if (e.message && e.message.toLowerCase().includes('locked')) {
        throw new Error("Wallet is locked. Please unlock Lace and try again.");
      }
      // Preserve the actual error message to help with debugging
      throw new Error(e.message || "Wallet connection failed or was rejected by the user.");
    }
  }

  async disconnectWallet(): Promise<void> {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
      this.stateSubscription = null;
    }
    this.api = null;
    this.currentAddress = null;
    this.currentNetwork = null;
    this.currentBalances = null;
  }

  isConnected(): boolean {
    return this.api !== null && this.currentAddress !== null;
  }

  getAddress(): string | null {
    return this.currentAddress;
  }

  getNetwork(): string | number | null {
    return this.currentNetwork;
  }

  getBalance(): Record<string, string | number> | null {
    return this.currentBalances;
  }

  async signTransaction(tx: unknown): Promise<unknown> {
    if (!this.api) throw new Error("Wallet not connected.");
    throw new Error("Contract not deployed");
  }

  async submitTransaction(tx: unknown): Promise<unknown> {
    if (!this.api) throw new Error("Wallet not connected.");
    throw new Error("Contract not deployed");
  }

  // Backwards compatibility for the UI mock state structure 
  async getElectionState(): Promise<any> {
    return {
      totalVotes: 0,
      candidates: [
        { id: '1', name: 'Option A: Deploy to Preview', description: 'Proceed with deploying the contract to the preview testnet.', votes: 0 },
        { id: '2', name: 'Option B: Stay Local', description: 'Keep the contract on the local development node.', votes: 0 }
      ],
      isActive: true,
    };
  }

  async getVoteStatus(walletAddress: string): Promise<boolean> {
    return false; // Users haven't voted yet
  }

  async castVote(candidateId: string): Promise<any> {
    if (!this.api) throw new Error("Wallet not connected.");
    throw new Error("Contract not deployed");
  }
}

export const blockchainService = new BlockchainService();
