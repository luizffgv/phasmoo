"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { useContext, useMemo, useRef } from "react";
import Button from "./button";
import {
  EvidenceID,
  EvidenceLabels,
  EvidenceState,
  evidenceFilter,
} from "@/lib/phasmo";
import { EvidenceCountContext } from "@/contexts/evidence-count";
import EvidenceIcon from "./evidence-icon";
import { GhostsContext } from "@/contexts/ghosts";
import { StatusContext } from "@/contexts/status-context";
import { GhostSpeedsContext } from "@/contexts/ghost-speeds";
import { VariantProps, cva } from "class-variance-authority";

const outlineCVA = cva(["outline", "outline-3", "outline-offset-[-3px]"], {
  variants: {
    presenceHint: {
      none: ["outline-transparent"],
      mustBePresent: ["outline-stone-700", "dark:outline-stone-100"],
      mustBeAbsent: ["outline-red-400"],
    },
  },
  defaultVariants: {
    presenceHint: "none",
  },
});

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
  const { setStatus } = useContext(StatusContext);
  const { speedFilter } = useContext(GhostSpeedsContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const presenceHint = useMemo(() => {
    let presenceHint: VariantProps<typeof outlineCVA>["presenceHint"] = "none";
    if (evidences.value[evidenceID] == EvidenceState.INDEFINITE) {
      const speedFilteredGhosts = ghosts.filter(speedFilter);

      const ghostsIfPresent = speedFilteredGhosts.some(
        evidenceFilter(
          { ...evidences.value, [evidenceID]: EvidenceState.PRESENT },
          count,
        ),
      );
      const ghostsIfAbsent = speedFilteredGhosts.some(
        evidenceFilter(
          { ...evidences.value, [evidenceID]: EvidenceState.ABSENT },
          count,
        ),
      );

      if (ghostsIfPresent && !ghostsIfAbsent) presenceHint = "mustBePresent";
      else if (ghostsIfAbsent && !ghostsIfPresent)
        presenceHint = "mustBeAbsent";
    }

    return presenceHint;
  }, [count, ghosts, evidenceID, evidences, speedFilter]);

  return (
    <div className="grow basis-0 *:w-full" ref={containerRef}>
      <Button
        className={`${outlineCVA({ presenceHint })}`}
        onClick={() => {
          new Animation(
            new KeyframeEffect(containerRef.current, [{ scale: 0.9 }, {}], {
              duration: 150,
            }),
          ).play();

          const state = evidences.value[evidenceID];
          const newState =
            state == EvidenceState.ABSENT
              ? EvidenceState.INDEFINITE
              : state == EvidenceState.INDEFINITE
                ? EvidenceState.PRESENT
                : EvidenceState.ABSENT;
          setEvidence(evidenceID, newState);

          const stateLabels = {
            [EvidenceState.ABSENT]: "absent",
            [EvidenceState.INDEFINITE]: "indefinite",
            [EvidenceState.PRESENT]: "present",
          };
          setStatus(
            `${EvidenceLabels[evidenceID]} was set to ${stateLabels[newState]}`,
            3000,
          );
        }}
        {...stateToButtonProps(evidences.value[evidenceID])}
      >
        <EvidenceIcon evidence={evidenceID} useCurrentColor></EvidenceIcon>
      </Button>
    </div>
  );
}
