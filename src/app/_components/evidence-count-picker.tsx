"use client";

import { EvidenceCountContext } from "@/contexts/evidence-count";
import { useContext, useLayoutEffect, useRef } from "react";
import Card from "./card";
import RadioButton from "./radio-button";

export default function EvidenceCountPicker() {
  const { count, setCount } = useContext(EvidenceCountContext);

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    new Animation(
      new KeyframeEffect(containerRef.current, [{}, { opacity: 1 }], {
        duration: 250,
        fill: "forwards",
      }),
    ).play();
  }, []);

  return (
    // We use opacity-0 because in smaller screens the picker's position is
    // affected by the settings, so we wait until settings are applied before
    // showing it.
    <div ref={containerRef} className="opacity-0 sm:opacity-100">
      <Card className="w-fit">
        <div className="flex flex-row flex-wrap items-baseline justify-center gap-x-8 gap-y-2">
          <strong>Available evidence</strong>
          <div className="flex flex-row flex-wrap gap-2" role="radiogroup">
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
    </div>
  );
}
