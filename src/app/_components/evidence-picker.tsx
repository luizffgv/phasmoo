"use client";

import { EvidenceID } from "@/lib/phasmo";
import EvidenceButton from "./evidence-button";
import Card from "./card";
import { useLayoutEffect, useRef, useState } from "react";

export default function EvidencePicker() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setReady(true);
  }, []);

  return (
    <Card
      className={`max-w-full transition-opacity ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <div className="tall:flex-wrap flex max-h-[256px] w-full flex-row gap-x-4 gap-y-2 overflow-x-auto rounded-xl sm:max-h-fit sm:max-w-[512px] sm:flex-wrap">
        {EvidenceID.map((id) => (
          <EvidenceButton key={id} evidenceID={id}></EvidenceButton>
        ))}
      </div>
    </Card>
  );
}
