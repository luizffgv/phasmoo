"use client";

import { EvidenceCountContext } from "@/contexts/evidence-count";
import { useContext } from "react";
import Card from "./card";
import RadioButton from "./radio-button";
import { StatusContext } from "@/contexts/status-context";

export default function EvidenceCountPicker() {
  const { count, setCount } = useContext(EvidenceCountContext);
  const { setStatus } = useContext(StatusContext);

  return (
    <Card className="flex items-center justify-center">
      <div className="flex flex-row flex-wrap items-baseline justify-center gap-x-8 gap-y-2">
        <strong>Available evidence</strong>
        <div className="flex flex-row flex-wrap gap-2" role="radiogroup">
          {([1, 2, 3] as const).map((num) => (
            <RadioButton
              key={num}
              onClick={() => {
                if (count == num) return;

                setCount(num);
                setStatus(`Evidence count was set to ${num}`, 3000);
              }}
              checked={num == count}
              aria-label={`${num} evidence`}
            >
              {num}
            </RadioButton>
          ))}
        </div>
      </div>
    </Card>
  );
}
