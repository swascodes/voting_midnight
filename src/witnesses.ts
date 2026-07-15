import type { WitnessContext } from '@midnight-ntwrk/compact-runtime';
import type { Ledger } from '../managed/counter/contract/index.js';

export type CounterPrivateState = {
  privateCounter: number;
};

/**
 * Default witnesses for the voting counter contract.
 *
 * Each witness receives a WitnessContext and returns a tuple:
 *   [nextPrivateState, result]
 *
 * voteToken: returns a default token value of 1 (non-zero = valid).
 */
export const witnesses = {
  voteToken(context: WitnessContext<Ledger, CounterPrivateState>): [CounterPrivateState, bigint] {
    return [context.privateState, 1n];
  },
};
