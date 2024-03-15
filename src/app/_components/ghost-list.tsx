"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { GHOSTS, filter } from "@/lib/phasmo";
import { useContext, useLayoutEffect, useMemo, useRef } from "react";
import Ghost from "./ghost";

export default function GhostList() {
  const { evidences } = useContext(EvidenceContext);
  const listRef = useRef<HTMLDivElement>(null);

  const ghostFilter = useMemo(() => filter(evidences.value, 3), [evidences]);

  useLayoutEffect(() => {
    if (listRef.current == null) {
      console.error("listRef.current is null");
      return;
    }

    new Animation(
      new KeyframeEffect(listRef.current, [{ opacity: 0 }, {}], {
        duration: 250,
      }),
    ).play();
  }, [evidences]);

  return (
    <div
      ref={listRef}
      className="flex-column flex flex-wrap justify-center gap-4 overflow-y-auto"
    >
      {GHOSTS.filter(ghostFilter).map((ghost) => (
        <Ghost key={ghost.name} ghost={ghost}></Ghost>
      ))}
    </div>
  );
}
