"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { EvidenceID, EvidenceState, EvidenceStateMap } from "@/lib/phasmo";
import { useState } from "react";

export interface Props {
  children?: React.ReactNode;
}

/** Provides an {@link EvidenceContext}. */
export default function EvidenceProvider({ children }: Props) {
  const [evidence, setEvidence] = useState<{ value: EvidenceStateMap }>({
    value: Object.assign(
      {},
      ...EvidenceID.map((id) => ({ [id]: EvidenceState.INDEFINITE }))
    ),
  });

  return (
    <EvidenceContext.Provider
      value={{
        setEvidence: (id, state) => {
          evidence.value[id] = state;
          setEvidence({ ...evidence });
        },
        evidences: evidence.value,
      }}
    >
      {children}
    </EvidenceContext.Provider>
  );
}
