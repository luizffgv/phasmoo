"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { GHOSTS, filter } from "@/lib/phasmo";
import { useContext, useMemo } from "react";
import Ghost from "./ghost";

export default function GhostList() {
  const { evidences } = useContext(EvidenceContext);

  const ghostFilter = useMemo(() => filter(evidences.value, 3), [evidences]);

  return (
    <div className="flex flex-column flex-wrap gap-4">
      {GHOSTS.filter(ghostFilter).map((ghost) => (
        <Ghost key={ghost.name} ghost={ghost}></Ghost>
      ))}
    </div>
  );
}
