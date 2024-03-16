import { createContext } from "react";

export interface EvidenceCountContext {
  /** Sets {@link count} if properly implemented by the provider. */
  setCount(count: 1 | 2 | 3): void;
  /** Number of evidences the ghost may provide. */
  readonly count: 1 | 2 | 3;
}

export const EvidenceCountContext = createContext<EvidenceCountContext>({
  setCount: () => {},
  count: 3,
});
