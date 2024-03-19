"use client";

import { GhostsContext } from "@/contexts/ghosts";
import { Ghost } from "@/lib/phasmo";

export interface Props {
  children: React.ReactNode;
  ghosts: Ghost[];
}

export default function GhostsProvider({ children, ghosts }: Props) {
  return (
    <GhostsContext.Provider value={{ ghosts }}>
      {children}
    </GhostsContext.Provider>
  );
}
