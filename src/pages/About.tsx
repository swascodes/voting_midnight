import { Code, BookOpen, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight">How It Works</h2>
        <p className="text-xl text-gray-400">
          This application demonstrates the power of Midnight Network's data protection capabilities.
        </p>
      </div>

      <div className="space-y-8">
        <section className="glass-panel p-8 space-y-4">
          <div className="flex items-center space-x-3 text-primary mb-6">
            <ShieldCheck className="w-8 h-8" />
            <h3 className="text-2xl font-bold text-white">The Privacy Model</h3>
          </div>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <div>
              <h4 className="text-white font-semibold mb-1">Public Ledger State (Visible)</h4>
              <p>The total number of votes cast is tracked publicly on-chain. Anyone can verify the integrity of the election results by reading the ledger state.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Private Witnesses (Hidden)</h4>
              <p>The voter's identity and specific ballot choices remain entirely off-chain. They are supplied as a "private witness" directly to the zero-knowledge circuit running locally on the user's device.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">What is Proven?</h4>
              <p>The zero-knowledge circuit mathematically proves that the user holds a valid voting token, and exactly one vote was cast. The ledger accepts the proof and increments the counter, without ever "knowing" who voted or what they voted for.</p>
            </div>
          </div>
        </section>

        <section className="glass-panel p-8 space-y-4">
          <div className="flex items-center space-x-3 text-primary mb-6">
            <Code className="w-8 h-8" />
            <h3 className="text-2xl font-bold text-white">Tech Stack</h3>
          </div>
          <ul className="grid grid-cols-2 gap-4 text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Midnight Network</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Compact Smart Contracts</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>React & TypeScript</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Tailwind CSS</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Vite</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Midnight Wallet SDK</span>
            </li>
          </ul>
        </section>

        <section className="glass-panel p-8 space-y-4">
          <div className="flex items-center space-x-3 text-primary mb-6">
            <BookOpen className="w-8 h-8" />
            <h3 className="text-2xl font-bold text-white">Builder Challenge</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            This project was developed for the Midnight Builder Challenge to showcase how zero-knowledge proofs can solve real-world privacy problems, such as maintaining secret ballots in a decentralized, trustless environment while ensuring verifiable outcomes.
          </p>
        </section>
      </div>
    </div>
  );
}
