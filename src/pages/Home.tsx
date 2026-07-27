import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { blockchainService } from '../lib/blockchain';

export default function Home() {
  const contractAddress = blockchainService.getContractAddress();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <div className="space-y-6 max-w-3xl">
        {contractAddress ? (
          <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-medium mb-4">
            Live on Midnight Preview
          </div>
        ) : (
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-medium mb-4">
            Deployment Pending Infrastructure
          </div>
        )}
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Privacy-Preserving Voting
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A zero-knowledge voting application built on the Midnight Network. 
          Prove you are eligible to vote without revealing your identity or your ballot.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left">
        <div className="glass-panel p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Zero-Knowledge Proofs</h3>
          <p className="text-gray-400">Uses Compact's private witnesses to validate your vote token without exposing it to the ledger.</p>
        </div>
        <div className="glass-panel p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Publicly Verifiable</h3>
          <p className="text-gray-400">The total vote count is maintained in the public ledger, ensuring transparent and immutable results.</p>
        </div>
        <div className="glass-panel p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Seamless UX</h3>
          <p className="text-gray-400">Abstracts away the complex cryptography so users simply click, sign, and vote instantly.</p>
        </div>
      </div>

      <div className="pt-8">
        <Link 
          to="/vote" 
          className="btn-primary space-x-2 text-lg"
        >
          <span>Enter the Voting Booth</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
