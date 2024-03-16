"use client";

import { EvidenceCountContext } from "@/contexts/evidence-count";
import { useState } from "react";

export default function EvidenceCountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(3);

  return (
    <EvidenceCountContext.Provider
      value={{
        setCount,
        count,
      }}
    >
      {children}
    </EvidenceCountContext.Provider>
  );
}
