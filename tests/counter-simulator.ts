import {
  type CircuitContext,
  sampleContractAddress,
  createConstructorContext,
  createCircuitContext,
} from '@midnight-ntwrk/compact-runtime';
import {
  Contract,
  type Ledger,
  ledger,
} from '../managed/counter/contract/index.js';
import { type CounterPrivateState, witnesses } from '../src/witnesses.js';

export class CounterSimulator {
  readonly contract: Contract<CounterPrivateState>;
  circuitContext: CircuitContext<CounterPrivateState>;

  constructor(
    privateState: CounterPrivateState = { privateCounter: 0 },
    witnessImpl: typeof witnesses = witnesses,
  ) {
    this.contract = new Contract(witnessImpl);
    const { currentPrivateState, currentContractState, currentZswapLocalState } =
      this.contract.initialState(createConstructorContext(privateState, '0'.repeat(64)));
    this.circuitContext = createCircuitContext(
      sampleContractAddress(),
      currentZswapLocalState,
      currentContractState,
      currentPrivateState,
    );
  }

  public getLedger(): Ledger {
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public getPrivateState(): CounterPrivateState {
    return this.circuitContext.currentPrivateState;
  }

  public castVote(): Ledger {
    this.circuitContext = this.contract.impureCircuits.castVote(this.circuitContext).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }
}
