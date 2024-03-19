"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { useContext } from "react";
import Button from "./button";
import {
  EvidenceID,
  EvidenceLabels,
  EvidenceState,
  filter,
} from "@/lib/phasmo";
import { EvidenceCountContext } from "@/contexts/evidence-count";
import EvidenceIcon from "./evidence-icon";
import { GhostsContext } from "@/contexts/ghosts";

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
  const { ghosts } = useContext(GhostsContext);
  const { count } = useContext(EvidenceCountContext);

  let outline = "outline outline-3 outline-offset-[-3px] outline-transparent";
  if (evidences.value[evidenceID] == EvidenceState.INDEFINITE) {
    const ghostsIfPresent = ghosts.some(
      filter(
        { ...evidences.value, [evidenceID]: EvidenceState.PRESENT },
        count,
      ),
    );
    const ghostsIfAbsent = ghosts.some(
      filter({ ...evidences.value, [evidenceID]: EvidenceState.ABSENT }, count),
    );

    if (ghostsIfPresent && !ghostsIfAbsent)
      outline =
        "outline outline-3 outline-offset-[-3px] outline-stone-700 dark:outline-stone-100";
    else if (ghostsIfAbsent && !ghostsIfPresent)
      outline = "outline outline-3 outline-offset-[-3px] outline-red-400";
  }

  return (
    <Button
      className={`grow basis-0 ${outline}`}
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
      <EvidenceIcon evidence={evidenceID} useCurrentColor></EvidenceIcon>
    </Button>
  );
}
