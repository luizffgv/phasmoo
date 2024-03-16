"use client";

import { EvidenceCountContext } from "@/contexts/evidence-count";
import { useContext } from "react";
import Card from "./card";
import Button from "./button";

export default function EvidenceCountPicker() {
  const { count, setCount } = useContext(EvidenceCountContext);

  return (
    <Card className="w-fit">
      <div className="flex flex-row flex-wrap items-baseline justify-center gap-x-8 gap-y-2">
        <strong>Available evidence</strong>
        <div className="flex flex-row gap-2">
          {([1, 2, 3] as const).map((num) => (
            <Button
              key={num}
              onClick={() => setCount(num)}
              {...(num == count ? { primary: true } : { weak: true })}
            >
              {num}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
