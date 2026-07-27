import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Loader2, CheckCircle2 } from 'lucide-react';
import { blockchainService, Candidate } from '../lib/blockchain';

export default function Vote() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    blockchainService.getElectionState().then(state => {
      setCandidates(state.candidates);
    });
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const w = await blockchainService.connectWallet();
      setWallet(w.address);
      const voted = await blockchainService.getVoteStatus(w.address);
      setHasVoted(voted);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;
    setIsVoting(true);
    try {
      const result = await blockchainService.castVote(selectedCandidate);
      setTxHash(result.txHash);
      setHasVoted(true);
    } catch (err) {
      console.error(err);
      alert('Voting failed. Did you already vote?');
    } finally {
      setIsVoting(false);
    }
  };

  if (!wallet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
          <Wallet className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold">Connect Wallet to Vote</h2>
        <p className="text-gray-400 max-w-md text-center">
          You need to connect your Midnight compatible wallet to prove your eligibility using zero-knowledge proofs.
        </p>
        <button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="btn-primary"
        >
          {isConnecting && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
          <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
        </button>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/30 text-green-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-center">Vote Submitted Successfully</h2>
        <p className="text-gray-400 max-w-md text-center">
          Your vote has been verified via ZK proof and the public counter has been incremented. Your privacy remains secure.
        </p>
        {txHash && (
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg w-full max-w-lg overflow-hidden text-center">
            <span className="text-sm text-gray-500 block mb-1">Transaction Hash</span>
            <code className="text-primary font-mono text-sm break-all">{txHash}</code>
          </div>
        )}
        <button 
          onClick={() => navigate('/results')}
          className="btn-secondary"
        >
          View Live Results
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Cast Your Vote</h2>
          <p className="text-gray-400 mt-2">Select an option below. Your choice remains private.</p>
        </div>
        <div className="text-sm px-4 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-gray-300">
          {wallet.slice(0, 10)}...{wallet.slice(-4)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map(candidate => (
          <div 
            key={candidate.id}
            onClick={() => setSelectedCandidate(candidate.id)}
            className={`glass-panel p-6 cursor-pointer transition-all border-2 ${
              selectedCandidate === candidate.id 
                ? 'border-primary shadow-primary/20 shadow-xl' 
                : 'border-transparent hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{candidate.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{candidate.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-8 border-t border-white/10">
        <button 
          onClick={handleVote}
          disabled={!selectedCandidate || isVoting}
          className="btn-primary"
        >
          {isVoting && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
          <span>{isVoting ? 'Generating ZK Proof...' : 'Submit Secret Vote'}</span>
        </button>
      </div>
    </div>
  );
}
