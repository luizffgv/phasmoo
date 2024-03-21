"use client";

import { GhostSpeedsContext } from "@/contexts/ghost-speeds";
import { speedFilter } from "@/lib/phasmo";
import { useMemo, useState } from "react";

export interface Props {
  children: React.ReactNode;
}

/** Correctly provides a {@link GhostSpeedsContext}. */
export default function GhostSpeedsProvider({ children }: Props) {
  const [speedBitField, setSpeedBitField] = useState<number>(0);

  const speedsFilter = useMemo(
    () => speedFilter(speedBitField),
    [speedBitField],
  );

  return (
    <GhostSpeedsContext.Provider
      value={{
        speeds: speedBitField,
        speedFilter: speedsFilter,
        setSpeed: (speed, presence) => {
          setSpeedBitField(
            presence ? speedBitField | speed : speedBitField & ~speed,
          );
        },
      }}
    >
      {children}
    </GhostSpeedsContext.Provider>
  );
}
