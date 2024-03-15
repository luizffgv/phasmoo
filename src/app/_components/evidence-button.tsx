"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { useContext } from "react";
import Button from "./button";
import { EvidenceID, EvidenceLabels, EvidenceState } from "@/lib/phasmo";

function stateToButtonProps(
  state: EvidenceState,
): { weak: true } | { danger: true } | {} {
  if (state == EvidenceState.ABSENT) return { danger: true };
  if (state == EvidenceState.INDEFINITE) return { weak: true };
  return {};
}

export type Props = {
  evidenceID: EvidenceID;
};

export default function EvidenceButton({ evidenceID }: Props) {
  const { evidences, setEvidence } = useContext(EvidenceContext);

  return (
    <Button
      className="grow basis-0"
      onClick={() => {
        const state = evidences.value[evidenceID];
        const newState =
          state == EvidenceState.ABSENT
            ? EvidenceState.INDEFINITE
            : state == EvidenceState.INDEFINITE
              ? EvidenceState.PRESENT
              : EvidenceState.ABSENT;
        setEvidence(evidenceID, newState);
      }}
      {...stateToButtonProps(evidences.value[evidenceID])}
    >
      {EvidenceLabels[evidenceID]}
    </Button>
  );
}
