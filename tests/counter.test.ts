import { CounterSimulator } from './counter-simulator.js';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { describe, it, expect } from 'vitest';

setNetworkId('undeployed');

describe('Voting counter smart contract', () => {
  it('generates initial ledger state deterministically', () => {
    const simulator0 = new CounterSimulator();
    const simulator1 = new CounterSimulator();
    expect(simulator0.getLedger()).toEqual(simulator1.getLedger());
  });

  it('transitions public state when casting a vote', () => {
    const simulator = new CounterSimulator();
    const initialLedger = simulator.getLedger();
    expect(initialLedger.round).toEqual(0n);
    expect(initialLedger.lastPublicIncrement).toEqual(0n);

    const nextLedger = simulator.castVote();
    expect(nextLedger.round).toEqual(1n);
    expect(nextLedger.lastPublicIncrement).toEqual(1n);
  });

  it('never exposes private witness values on the public ledger', () => {
    const secretToken = 42n;
    const secretWitnesses = {
      voteToken: (ctx: any): [any, bigint] => [ctx.privateState, secretToken],
    };

    const simulator = new CounterSimulator({ privateCounter: 0 }, secretWitnesses);
    const nextLedger = simulator.castVote();
    const ledgerJson = JSON.stringify(nextLedger, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );

    // The vote should register (round incremented)
    expect(nextLedger.round).toEqual(1n);
    // But the secret token value (42) must never appear in public ledger state
    expect(ledgerJson).not.toContain('42');
    expect(ledgerJson).not.toContain(String(secretToken));
  });
});
