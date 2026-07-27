import { useState, useEffect } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { blockchainService, Candidate } from '../lib/blockchain';

export default function Results() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const fetchResults = async () => {
    setIsRefreshing(true);
    try {
      const state = await blockchainService.getElectionState();
      setCandidates(state.candidates);
      setTotalVotes(state.totalVotes);
      setContractAddress(blockchainService.getContractAddress());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center space-x-3">
            <Activity className="w-8 h-8 text-primary" />
            <span>Live Results</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Verifiable vote counts pulled directly from the public ledger state.
          </p>
        </div>
        <button 
          onClick={fetchResults}
          disabled={isRefreshing}
          className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Ledger</span>
        </button>
      </div>

      <div className="glass-panel p-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="text-sm text-gray-400 mb-1">Total Public Votes</div>
            <div className="text-5xl font-mono font-bold text-white tracking-tight">{totalVotes}</div>
          </div>
          {contractAddress && (
            <div className="text-right hidden sm:block">
              <div className="text-sm text-gray-500 mb-1">Contract</div>
              <div className="font-mono text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20">
                {contractAddress.slice(0, 15)}...{contractAddress.slice(-10)}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {candidates.sort((a, b) => b.votes - a.votes).map((candidate, index) => {
            const percentage = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;
            return (
              <div key={candidate.id} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-lg flex items-center space-x-3">
                    {index === 0 && candidate.votes > 0 && <span className="text-yellow-400 text-lg">🏆</span>}
                    <span>{candidate.name}</span>
                  </span>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl font-bold font-mono">{candidate.votes}</span>
                    <span className="text-gray-500 font-mono w-12 text-right">{percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Results are mathematically guaranteed by Midnight's zero-knowledge proofs.</p>
        <p>Who voted for whom remains permanently mathematically hidden.</p>
      </div>
    </div>
  );
}
