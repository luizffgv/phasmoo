"use client";

import { StatusContext } from "@/contexts/status-context";
import { useContext, useLayoutEffect, useRef } from "react";

/** Displays the current status set in {@link StatusContext}. */
export default function Status() {
  const { status } = useContext(StatusContext);
  const statusRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (statusRef.current == null) console.error("statusRef.current is null");

    new Animation(
      new KeyframeEffect(statusRef.current, [{ opacity: 0 }, {}], {
        duration: 250,
      }),
    ).play();
  }, [status]);

  return <span ref={statusRef}>{status}</span>;
}
