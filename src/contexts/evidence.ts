"use client";

import { EvidenceID, EvidenceState, EvidenceStateMap } from "@/lib/phasmo";
import { createContext } from "react";

export interface EvidenceContext {
  /** Sets the state of an evidence. */
  setEvidence(id: EvidenceID, state: EvidenceState): void;
  /** Read-only list of evidences and their states. */
  evidences: { value: Readonly<EvidenceStateMap> };
}

export const EvidenceContext = createContext<EvidenceContext>({
  setEvidence: () => {},
  evidences: {
    value: Object.assign(
      {},
      ...EvidenceID.map((id) => ({ [id]: EvidenceState.INDEFINITE })),
    ),
  },
});
