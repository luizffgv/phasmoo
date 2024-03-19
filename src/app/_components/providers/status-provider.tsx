"use client";

import { StatusContext } from "@/contexts/status-context";
import { useRef, useState } from "react";

export interface Props {
  children: React.ReactNode;
}

/** Povides a {@link StatusContext}. */
export default function StatusProvider({ children }: Props) {
  const [status, setStatus] = useState<string | null>(null);
  const timeoutID = useRef<number | null>(null);

  return (
    <StatusContext.Provider
      value={{
        status,
        setStatus: (status, durationMs) => {
          if (timeoutID.current != null) window.clearTimeout(timeoutID.current);
          timeoutID.current = null;

          setStatus(status);

          if (durationMs != null)
            timeoutID.current = window.setTimeout(
              setStatus.bind(null, null),
              durationMs,
            );
        },
      }}
    >
      {children}
    </StatusContext.Provider>
  );
}
