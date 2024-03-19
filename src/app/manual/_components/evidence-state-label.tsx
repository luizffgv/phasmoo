"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { EvidenceID, EvidenceState } from "@/lib/phasmo";
import { useContext } from "react";

export interface Props {
  evidence: EvidenceID;
}

const STATE_LABELS = {
  [EvidenceState.INDEFINITE]: "Indefinite",
  [EvidenceState.ABSENT]: "Absent",
  [EvidenceState.PRESENT]: "Present",
} satisfies { [state in EvidenceState]: string };

/** Shows a label for the state of an evidence given the evidence context. */
export default function EvidenceStateLabel({ evidence }: Props) {
  const { evidences } = useContext(EvidenceContext);

  const state = evidences.value[evidence];

  return <span>{STATE_LABELS[state]}</span>;
}
