"use client";

import { EvidenceCountContext } from "@/contexts/evidence-count";
import { useContext } from "react";
import Card from "./card";
import RadioButton from "./radio-button";

export default function EvidenceCountPicker() {
  const { count, setCount } = useContext(EvidenceCountContext);

  return (
    <Card className="w-fit">
      <div className="flex flex-row flex-wrap items-baseline justify-center gap-x-8 gap-y-2">
        <strong>Available evidence</strong>
        <div className="flex flex-row gap-2" role="radiogroup">
          {([1, 2, 3] as const).map((num) => (
            <RadioButton
              key={num}
              onClick={() => setCount(num)}
              checked={num == count}
              aria-label={`${num} evidence`}
              aria-labelledby="y"
            >
              {num}
            </RadioButton>
          ))}
        </div>
      </div>
    </Card>
  );
}
