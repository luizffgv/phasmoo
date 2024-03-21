"use client";

import { useContext } from "react";
import Card from "./card";
import { StatusContext } from "@/contexts/status-context";
import { GhostSpeedsContext } from "@/contexts/ghost-speeds";
import ToggleButton from "./toggle-button";
import { SpeedBits } from "@/lib/phasmo";

const SPEED_LABELS = {
  [SpeedBits.SLOW]: "slow",
  [SpeedBits.NORMAL]: "normal",
  [SpeedBits.FAST]: "fast",
};

export default function GhostSpeedsPicker() {
  const { setSpeed, speeds } = useContext(GhostSpeedsContext);
  const { setStatus } = useContext(StatusContext);

  return (
    <Card>
      <div className="flex flex-row flex-wrap items-baseline justify-center gap-x-8 gap-y-2">
        <strong>Ghost walk speeds</strong>
        <div
          className="flex flex-row gap-2 overflow-x-auto rounded-xl"
          role="radiogroup"
        >
          {([SpeedBits.SLOW, SpeedBits.NORMAL, SpeedBits.FAST] as const).map(
            (speed) => (
              <ToggleButton
                key={speed}
                onClick={() => {
                  const nowPresent = !(speeds & speed);
                  setSpeed(speed, nowPresent);
                  setStatus(
                    `Speed "${SPEED_LABELS[speed]}" is now ${nowPresent ? "present" : "indefinite"}`,
                    3000,
                  );
                }}
                pressed={(speeds & speed) != 0}
                aria-label={`${SPEED_LABELS[speed]} speed`}
              >
                {SPEED_LABELS[speed]}
              </ToggleButton>
            ),
          )}
        </div>
      </div>
    </Card>
  );
}
