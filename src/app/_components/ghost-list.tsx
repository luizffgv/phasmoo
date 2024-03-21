"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { evidenceFilter, speedFilter } from "@/lib/phasmo";
import { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";

import Ghost from "./ghost";
import { EvidenceCountContext } from "@/contexts/evidence-count";
import { GhostsContext } from "@/contexts/ghosts";
import { GhostSpeedsContext } from "@/contexts/ghost-speeds";

export default function GhostList() {
  const { evidences } = useContext(EvidenceContext);
  const { count } = useContext(EvidenceCountContext);
  const { ghosts } = useContext(GhostsContext);
  const { speeds } = useContext(GhostSpeedsContext);

  const listRef = useRef<HTMLDivElement>(null);

  const memoEvidenceFilter = useMemo(
    () => evidenceFilter(evidences.value, count),
    [count, evidences],
  );

  const memoSpeedFilter = useMemo(() => speedFilter(speeds), [speeds]);

  useLayoutEffect(() => {
    if (listRef.current == null) {
      console.error("listRef.current is null");
      return;
    }

    new Animation(
      new KeyframeEffect(listRef.current, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 250,
        fill: "forwards",
      }),
    ).play();
  }, [count, evidences, speeds]);

  const filteredGhosts = ghosts
    .filter(memoEvidenceFilter)
    .filter(memoSpeedFilter);

  return (
    <div
      ref={listRef}
      className="flex-column flex flex-wrap justify-center gap-4 rounded-2xl opacity-0"
    >
      {filteredGhosts.map((ghost) => (
        <Ghost key={ghost.name} ghost={ghost}></Ghost>
      ))}
      {filteredGhosts.length === 0 ? (
        <strong className="text-xl">No matching ghosts</strong>
      ) : (
        <></>
      )}
    </div>
  );
}
