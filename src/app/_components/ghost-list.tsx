"use client";

import { EvidenceContext } from "@/contexts/evidence";
import { GHOSTS, filter } from "@/lib/phasmo";
import { useContext, useLayoutEffect, useMemo, useRef } from "react";

import Ghost from "./ghost";
import { EvidenceCountContext } from "@/contexts/evidence-count";

export default function GhostList() {
  const { evidences } = useContext(EvidenceContext);
  const { count } = useContext(EvidenceCountContext);

  const listRef = useRef<HTMLDivElement>(null);

  const ghostFilter = useMemo(
    () => filter(evidences.value, count),
    [count, evidences],
  );

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
  }, [count, evidences]);

  const ghosts = GHOSTS.filter(ghostFilter);

  return (
    <div
      ref={listRef}
      className="flex-column flex flex-wrap justify-center gap-4 overflow-y-auto rounded-2xl "
    >
      {ghosts.map((ghost) => (
        <Ghost key={ghost.name} ghost={ghost}></Ghost>
      ))}
      {ghosts.length === 0 ? (
        <strong className="text-xl">Skill issue</strong>
      ) : (
        <></>
      )}
    </div>
  );
}
